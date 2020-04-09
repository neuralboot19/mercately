import React from 'react';
import {View,Text,Alert,TouchableOpacity,TextInput,Keyboard,ActivityIndicator,AsyncStorage,KeyboardAvoidingView,Image} from 'react-native';
import { Button, Icon } from 'react-native-material-ui';
import { API } from '../util/api';
import * as globals from '../util/globals';

// Style
const styles = require('../../AppStyles');

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      spinner: false,
    };
  }

  login = async() =>{
    if (this.state.email === '') {
      Alert.alert('User o Email','It cant be empty',[{text:'OK'}]);
    } else if (this.state.password === '') {
      Alert.alert('Password','It cant be empty',[{text:'OK'}]);
    } else {
      let data = {
        "customer": {
          "email": this.state.email,
          "password": this.state.password
        }
      }
      this.setState({ spinner: true });
      API.login(this.loginResponse,data,true);
    }
  }

  loginResponse = {
    success: (response) => {
      try {
        AsyncStorage.multiSet([['access_token', JSON.stringify(response.customer.data.attributes.access_token) || ''],['loginData', JSON.stringify(response)]],()=>{
          globals.access_token = JSON.stringify(response.customer.data.attributes.access_token) || '';
          globals.first_name = response.customer.data.attributes.first_name || '';
          globals.last_name = response.customer.data.attributes.last_name || '';
          this.props.navigation.navigate('Dashboard');
        })
      } catch (error) {
        console.log('ERROR LOGIN RESPONSE',error)
      }
      this.setState({ spinner: false });
    },
    error: (err) => {
      Alert.alert('Error de validación',err.message,[{text:'OK'}]);
      this.setState({spinner: false})
    }
  }

  setFocus = (textField) =>{
    this[textField].focus()
  }
  
  render(){
    return (
      <View style={styles.containerLogin}>
        <View style={styles.circle} />
        <KeyboardAvoidingView behavior="padding" enabled>
          <Image source={require('../../assets/logo.png')} style={{width: 350, height: 100, marginHorizontal:25}} />
          <TextInput
            style={styles.input}
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
            placeholder="User / Email"
            keyboardType="email-address"
            returnKeyType={"next"}
            onSubmitEditing={() => this.setFocus("passwordInput")}
          />
          <TextInput
            ref={ref => (this.passwordInput = ref)}
            style={styles.input}
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
            placeholder="Password"
            secureTextEntry={true}
            returnKeyType={"done"}
            onSubmitEditing={() => Keyboard.dismiss()}
          />
          <View style={{marginTop: 20}}>
            {this.state.spinner == true ? (
              <View>
                <ActivityIndicator size="small" color="#9075E3" />
              </View>
            ):(
              <TouchableOpacity style={styles.enter} onPress={this.login}>
                <Icon name="person" color="#FFF"/>
                <Text style={{fontSize:24,color:"#FFF"}}>Log in</Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.buttonActionsLogin}>
            <Button primary text="Recover" />
            <Button primary text="Sign up" />
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}
