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
    primaryColor: "#34aae1",
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
    AsyncStorage.getItem('loginData').then((item, ) =>{
      const dataStorage = JSON.parse(item)
      AsyncStorage.getItem('header').then((header) =>{
        if(dataStorage !== null){
          globals.header = JSON.parse(header) || '';
          globals.id = dataStorage.data.attributes.id || '';
          globals.type = dataStorage.type || '';
          globals.admin = dataStorage.data.attributes.admin || '';
          globals.email = dataStorage.data.attributes.email || '';
          globals.first_name = dataStorage.data.attributes.first_name || '';
          globals.last_name = dataStorage.data.attributes.last_name || '';
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