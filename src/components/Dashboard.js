import React, { Component } from 'react';
import { View, Text, Alert, AsyncStorage, FlatList, TouchableOpacity } from 'react-native';
import { Toolbar, Badge, Avatar, Icon } from 'react-native-material-ui';
import { API } from '../util/api';
import * as globals from '../util/globals';

// Style
const styles = require('../../AppStyles');

// Data Json static
const data = require('../util/data.json') 

export default class DashboardAdmin extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      access_token: globals.access_token,
      first_name: globals.first_name,
      active: 'home',
      listUserMessage: data
    };
    this.signOut = this.signOut.bind(this);
  }

  actionSearch(search) {
    console.log('Aquiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii search',search)
  }

  actionElement(label) {
    if (label.index == 0) {
      this.signOut()
    }
  }
  
  signOut = async() =>{
    let data = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Token ${this.state.access_token}`
    }
    API.signOut(this.signOutResponse,{},data)
  }

  signOutResponse = {
    success: (response) => {
      try {
        AsyncStorage.clear();
        this.props.navigation.navigate('Login');
      } catch (error) {
        Alert.alert('Error',error.message,[{text:'OK'}]);
      }
    },
    error: (err) => {
      Alert.alert('Error Cierre su App y inicie de nuevo',err.message,[{text:'OK'}]);
    }
  }

  renderItem = (item) =>{
    let data = item.item
    if (data.messageCount > 0) {
      return(
        <TouchableOpacity style={styles.cardChatSelect} onPress={() => this.onPressChat(data)}>
          <Badge
            size={24}
            text={data.messageCount}
            style={{ container: { top: -8, left: -10 } }}
          >
            <Avatar text={data.initial} />
            <Text style={{marginTop:12}}>{data.name}</Text>
            <Icon name="keyboard-arrow-right" style={{marginTop:12}}/>
          </Badge>
        </TouchableOpacity>
      )
    } else {
      return(
        <TouchableOpacity style={styles.cardChatSelect} onPress={(data) => this.onPressChat(data)}>
          <Avatar text={data.initial} />
          <Text>{data.name}</Text>
          <Icon name="keyboard-arrow-right"/>
        </TouchableOpacity>
      )
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Toolbar
          // leftElement="menu"
          centerElement="Mercately"
          searchable={{
            autoFocus: true,
            placeholder: 'Search',
            onChangeText: (search) => this.actionSearch(search)
          }}
          rightElement={{
            menu: {
              icon: "more-vert",
              labels: ["Sign out"]
            }
          }}
          onRightElementPress={ (label) => this.actionElement(label) }
        />
        {this.state.listUserMessage.length != 0 ?
          <FlatList 
            data = {this.state.listUserMessage}
            renderItem = {this.renderItem}
            keyExtractor={(item)=>item.id.toString()}
            ListEmptyComponent={this.ListEmptyComponent}
          />
        :
          <View style={styles.container}>
            <View style={styles.circle} />
            <View style={{marginHorizontal: 25}}>
              <Text style={styles.header}>Hi, {globals.first_name + " " + globals.last_name}</Text>
              <Text style={styles.descriptionText}>No tienes chat por el momento.</Text>
            </View>
          </View>
        }
      </View>
    );
  }
}