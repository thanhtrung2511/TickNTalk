import React, { Component } from 'react'
import { Button,Text,TextInput, View, Dimensions,StyleSheet, TouchableOpacity,FlatList } from 'react-native'
import { SafeAreaView,NavigationContainer } from 'react-native-safe-area-context'
import { EvilIcons } from '@expo/vector-icons';
import styles from '../components/RoomChat/Styles'
import { MaterialIcons } from '@expo/vector-icons';
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
              <Text style={styles.header}>Nhóm</Text>                        
              <View style={{marginLeft:32,marginTop:16,flexDirection:'column'}} justifyContent="center">
                <View style={{flexDirection:'row'}}>
                <TextInput style={styles.input}
                      placeholder="Tìm kiếm nhóm"
                      onChangeText={username=>{
                        this.setState({username});
                      }}
                      value={this.state.username}>
                </TextInput>
                <TouchableOpacity style={styles.createRoom}>
                  <MaterialIcons name='group-add' size={33} color={'black'}></MaterialIcons>
                </TouchableOpacity>
                </View>
                <FlatList style={styles.ChatBox} onPress={this.ChatScreenNav}>
                </FlatList>
              </View>
          </SafeAreaView>
        );
      }
}
    