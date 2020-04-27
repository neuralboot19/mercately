import React, { Component } from 'react';
import { Platform, KeyboardAvoidingView, SafeAreaView } from 'react-native';
import { Toolbar, Icon } from 'react-native-material-ui';
import { GiftedChat } from 'react-native-gifted-chat';

// Style
const styles = require('../../AppStyles');

export default class Chat extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      messages: [{
        _id: this.props.route.params.user.id,
        text: this.props.route.params.user.name + " This is a quick reply. Do you love Gifted Chat? (radio) KEEP IT",
        createdAt: new Date(),
        quickReplies: {
          type: "radio",
          keepIt: true,
          values: [
            {
              title: "😋 Yes",
              value: "yes"
            },
            {
              title: "📷 Yes, let me show you with a picture!",
              value: "yes_picture"
            },
            {
              title: "😞 Nope. What?",
              value: "no"
            }
          ]
        },
        user: {
          _id: this.props.route.params.user.id,
          name: this.props.route.params.user.name
        }
      }]
    };
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }

  actionBack = () => {
    this.props.navigation.navigate('Dashboard')
  }

  render() {
    const chat =
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{_id: this.state.messages._id,}} />;
    if (Platform.OS === 'android') {
      return (
        <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
          <Toolbar
            centerElement={<Icon name="keyboard-arrow-left" color="#FFF" />}
            onPress={() => this.actionBack()}
          />
          {chat}
        </KeyboardAvoidingView>
      )
    }
    return (
      <View>
        <Toolbar
          centerElement={<Icon name="keyboard-arrow-left" color="#FFF" />}
          onPress={() => this.actionBack()}
        />
        <SafeAreaView style={{flex:1}}>{chat}</SafeAreaView>
      </View>
    )
  }
}