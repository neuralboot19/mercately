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
          this.setState({isLogin : true})
        }else{
          console.log("ALERTA ALERTA ========= AsyncStorage.getItem is NULL ========= ALERTA ALERTA")
          this.setState({isLogin : false})
        }
      })
    })
    AsyncStorage.multiGet(['password', 'access_token', 'first_name', 'last_name', 'email', 'avatar', 'status'],(error,value) =>{
      if(value[4][1] != null && value[4][1] != undefined){
        globals.password = value[0][1] || ""
        globals.access_token = value[1][1] || ""
        globals.first_name = value[2][1] || ""
        globals.last_name = value[3][1] || ""
        globals.email = value[4][1] || ""
        globals.avatar = value[5][1] || ""
        globals.status = value[6][1] || ""
      }
      this.setState({isLogin: value[4][1] != null})
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