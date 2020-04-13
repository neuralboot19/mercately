// React && AsyncStorage
import React from 'react';
import {AsyncStorage} from 'react-native';

// Material UI to React Native
import { COLOR, ThemeContext, getTheme } from 'react-native-material-ui';

// Globals
import * as globals from './src/util/globals';

// Navigator
import Router from './src/navigator/Router';
import RouterAdmin from './src/navigator/Admin';

const uiTheme = {
  palette: {
    primaryColor: "#9075E3",
    accentColor: COLOR.blue500,
  },
  toolbar: {
    container: {
      height: 50,
    },
  },
};

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('loginData').then((item) =>{
      const dataa = JSON.parse(item)
      AsyncStorage.getItem('access_token').then((token) =>{
        if(dataa !== null){
          const data = JSON.parse(item)
          globals.access_token = token || "";
          globals.first_name = data.customer.data.attributes.first_name || "";
          globals.last_name = data.customer.data.attributes.last_name || "";
          globals.email = data.customer.data.attributes.email || "";
          globals.avatar = data.customer.data.attributes.avatar.url || "";
          this.setState({isLogin : true})
        }else{
          console.log("ALERTA ALERTA ========= AsyncStorage.getItem is NULL ========= ALERTA ALERTA")
          this.setState({isLogin : false})
        }
      })
    })
  }

  render() {
    if (this.state.isLogin) {
      return (
        <ThemeContext.Provider value={getTheme(uiTheme)}>
          <RouterAdmin />
        </ThemeContext.Provider>
      )
    } else {
      return (
        <ThemeContext.Provider value={getTheme(uiTheme)}>
          <Router />
        </ThemeContext.Provider>
      );
    }
  }
}