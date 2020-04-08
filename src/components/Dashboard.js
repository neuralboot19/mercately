import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { BottomNavigation} from 'react-native-material-ui';
import * as globals from '../util/globals';

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
    this.actionHome = this.actionHome.bind(this);
    this.settings = this.settings.bind(this);
  }

  actionHome() {
    this.setState({ active: 'home' })
  }

  settings = () => {
    this.setState({ active: 'settings' })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <View style={styles.circle} />
          <View style={{marginHorizontal: 25}}>
            <Text style={styles.header}>Hi, {globals.first_name + " " + globals.last_name}</Text>
            <Text style={styles.descriptionText}>No tienes chat por el momento.</Text>
          </View>
        </View>
        <BottomNavigation active={this.state.active} hidden={false} >
          <BottomNavigation.Action
            key="settings"
            icon="settings"
            label="Settings"
            onPress={this.settings}
          />
          <BottomNavigation.Action
            key="home"
            icon="home"
            label="Home"
            onPress={this.actionHome}
          />
        </BottomNavigation>
      </View>
    );
  }
}