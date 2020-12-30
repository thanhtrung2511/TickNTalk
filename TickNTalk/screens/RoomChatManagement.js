import React, { Component } from 'react'
import { Button,Text,TextInput, View, Dimensions,StyleSheet, TouchableOpacity,FlatList,KeyboardAvoidingView } from 'react-native'
import { SafeAreaView,NavigationContainer } from 'react-native-safe-area-context'
import { EvilIcons } from '@expo/vector-icons';
import {styles,ButtonIcon} from '../components/Basic/Basic'

export default class RoomChatManagements extends React.Component {
    
    state={
        username:"",
        password:"",
        repassword:"",
        Email:""
    }
    ChatScreenNav=()=>
    {
      this.props.navigation.navigate("Chat")
    }
    render() {
        return (
          <SafeAreaView style={styles.container}>
          <KeyboardAvoidingView style={styles.container} behavior="padding">
              <Text style={styles.header}>Nhóm</Text>                        
              <View style={{marginTop:16,flexDirection:'column'}} justifyContent="center">
                <View style={{flexDirection:'row'}}>
                <TextInput style={styles.inputGroup}
                      placeholder="Tìm kiếm nhóm"
                      onChangeText={username=>{
                        this.setState({username});
                      }}
                      value={this.state.username}>
                </TextInput>
                <ButtonIcon MaterialFamilyIconName="group-add" size={33}/>
                </View>
                <FlatList style={styles.ChatBox} onPress={this.ChatScreenNav}>
                </FlatList>
              </View>
          </KeyboardAvoidingView>
          </SafeAreaView>
        );
      }
}
        