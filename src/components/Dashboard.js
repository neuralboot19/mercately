import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, DrawerLayoutAndroid, Alert, AsyncStorage, ActivityIndicator } from 'react-native';
import { Toolbar, Badge, Avatar, Icon, Button } from 'react-native-material-ui';
import * as globals from '../util/globals';

// Api
import { API } from '../util/api';

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
      listUserMessage: data,
      leftElementIcon: 'menu',
      spinner: false,
    };
    this.signOut = this.signOut.bind(this);
    this.onPressChat = this.onPressChat.bind(this);
  }

  actionSearch(search) {
    this.drawer.closeDrawer();
  }

  signOut = async() =>{
    this.setState({ spinner: true });
    API.signOut(this.signOutResponse,{},true)
  }

  signOutResponse = {
    success: (response) => {
      try {
        AsyncStorage.clear();
        this.drawer.closeDrawer();
        this.setState({leftElementIcon: 'menu', spinner: false})
        this.props.navigation.navigate('Login');
      } catch (error) {
        this.setState({spinner: false});
        Alert.alert('Error',error.message,[{text:'OK'}]);
      }
    },
    error: (err) => {
      this.setState({spinner: false});
      Alert.alert('Error Cierre su App y inicie de nuevo',err.message,[{text:'OK', onPress: () => this.props.navigation.navigate('Login')}]);
    }
  }

  actionElementLeft() {
    if (this.state.leftElementIcon == 'menu') {
      this.drawer.openDrawer();
      this.setState({leftElementIcon: 'close'})
    } else {
      this.drawer.closeDrawer();
      this.setState({leftElementIcon: 'menu'})
    }
  }

  onPressChat = (user) => {
    this.props.navigation.navigate('Chat',{user})
  }

  renderItem = (item) =>{
    let user = item.item
    if (user.messageCount > 0) {
      return(
        <TouchableOpacity style={styles.cardChatSelect} onPress={() => this.onPressChat(user)}>
          <Badge
            size={24}
            text={user.messageCount}
            style={{ container: { top: -8, left: -10 } }}
          >
            <Avatar text={user.initial} />
            <Text style={{marginTop:12}}>{user.name}</Text>
            <Icon name="keyboard-arrow-right" style={{marginTop:12}}/>
          </Badge>
        </TouchableOpacity>
      )
    } else {
      return(
        <TouchableOpacity style={styles.cardChatSelect} onPress={() => this.onPressChat(user)}>
          <Avatar text={user.initial} />
          <Text>{user.name}</Text>
          <Icon name="keyboard-arrow-right"/>
        </TouchableOpacity>
      )
    }
  }

  render() {
    let DrawerContent = (
      <View style={styles.containerContent}>
        <View style={{alignItems:'center'}}>
          <Text style={{fontWeight:'bold'}}>{globals.first_name + " " + globals.last_name}</Text>
          <Text style={{color:'#514E5A'}}>{globals.email}</Text>
        </View>
        {this.state.spinner ? (
          <ActivityIndicator size="small" color="#34aae1" />
        ) : (
          <Button
            text="Cerrar Sesión"
            icon="settings"
            upperCase={false}
            style={{container:{justifyContent:'flex-start'}}}
            onPress={() => this.signOut()}
          />
        )}
      </View>
    );
    return (
      <View style={styles.container}>
        <Toolbar
          leftElement={this.state.leftElementIcon}
          centerElement="Mercately"
          searchable={{
            autoFocus: true,
            placeholder: 'Search',
            onChangeText: (search) => this.actionSearch(search)
          }}
          style={{
            container: {backgroundColor:'#fff'},
            leftElement: {color:'#34aae1'},
            titleText: {color:'#34aae1'},
            rightElement: {color:'#34aae1'}
          }}
          onLeftElementPress={() => this.actionElementLeft()}
        />
        <DrawerLayoutAndroid
          ref={_drawer => (this.drawer = _drawer)}
          drawerWidth={250}
          renderNavigationView={() => DrawerContent }
        >
          {this.state.listUserMessage.length != 0 ?
            <View>
              <FlatList 
                data = {this.state.listUserMessage}
                renderItem = {this.renderItem}
                keyExtractor={(item)=>item.id.toString()}
                ListEmptyComponent={this.ListEmptyComponent}
              />
            </View>
          :
            <View style={styles.container}>
              <View style={{marginHorizontal: 25}}>
                <Text style={styles.header}>Hi, {globals.first_name + " " + globals.last_name}</Text>
                <Text style={styles.descriptionText}>No tienes chat por el momento.</Text>
              </View>
            </View>
          }
        </DrawerLayoutAndroid>
      </View>
    );
  }
}