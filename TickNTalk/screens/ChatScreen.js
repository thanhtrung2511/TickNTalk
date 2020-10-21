import React from 'react';
import { Platform, KeyboardAvoidingView, SafeAreaView, View,Text, StyleSheet} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import Fire from "../Fire";
import {Ionicons} from '@expo/vector-icons'

export default class ChatScreen extends React.Component {
  state ={
    messages:[]
  }
  get user(){
    return {
      _id: Fire.uid,
      name: "Phuong Vy" //this.props.navigation.state.params.name
    }
  }
  componentDidMount(){
    Fire.get(message => 
      this.setState(previous  =>  ({
        messages: GiftedChat.append(previous.messages,message)
      }))
    );
  }
  componentWillUnmount(){
    Fire.off();
  }i
  render() {
    
    const chat=<GiftedChat messages={this.state.messages} onSend={Fire.send} user={this.user}/>;
    
    return ( 
      // <SafeAreaView>
      // <SafeAreaView styles={styles.header}>
      // <Ionicons name="md-arrow-round-backward" size={14} color="#000"/> 
      // <Text fontSize={14}>Chat</Text>
      // </SafeAreaView>
    <SafeAreaView style={{flex:1}}>{chat}</SafeAreaView>
    // </SafeAreaView>
    )
  }
}

const styles= StyleSheet.create({
  header:{ 
      width:600,
      height:50,
      backgroundColor: "#99FFFF",
      position: "absolute",
  },
})


