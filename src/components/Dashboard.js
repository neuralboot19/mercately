import React, { Component } from 'react';
import { View, Text, Alert, AsyncStorage } from 'react-native';
import { Toolbar } from 'react-native-material-ui';
import { API } from '../util/api';
import * as globals from '../util/globals';

// Style
const styles = require('../../AppStyles');

export default class DashboardAdmin extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      access_token: globals.access_token,
      first_name: globals.first_name,
      spinner: false,
      active: 'home',
    };
    this.signOut = this.signOut.bind(this);
  }

  actionSearch(search) {
    console.log('Aquiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii search',search)
  }

  actionElement(label) {
    if (label.index == 1) {
      this.signOut()
    }
  }
  
  signOut = async() =>{
    let data = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Token ${this.state.access_token}`
    }
    this.setState({ spinner: true });
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
      Alert.alert('Error Cierre su App y intente de nuevo',err.message,[{text:'OK'}]);
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
              labels: ["Settings", "Sign out"]
            }
          }}
          onRightElementPress={ (label) => this.actionElement(label) }
        />
        <View style={styles.container}>
          <View style={styles.circle} />
          <View style={{marginHorizontal: 25}}>
            <Text style={styles.header}>Hi, {globals.first_name + " " + globals.last_name}</Text>
            <Text style={styles.descriptionText}>No tienes chat por el momento.</Text>
          </View>
        </View>
      </View>
    );
  }
}