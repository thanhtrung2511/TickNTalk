import React, { Component } from 'react'
import { Text,TextInput, View, Dimensions,StyleSheet, TouchableOpacity,FlatList, ViewBase } from 'react-native'
import { SafeAreaView,NavigationContainer } from 'react-native-safe-area-context'
import { EvilIcons } from '@expo/vector-icons';
import styles from '../components/ChatFeed/Styles'

export default class ChatFeed extends React.Component {
    
    state={
        username:"",
        password:"",
        repassword:"",
        Email:""
    }
    ChatScreenNav=()=>
    {
      this.props.navigation.navigate("ChatScr")
    }
    render() {
        return (
          <SafeAreaView style={styles.container}>
              <Text style={styles.header}>Tin nhắn</Text>                        
              <View style={{marginLeft:32,marginTop:16,flexDirection:'column'}} justifyContent="center">
                <TextInput style={styles.input}
                      placeholder="Tìm kiếm bạn bè"
                      onChangeText={username=>{
                        this.setState({username});
                      }}
                      value={this.state.username}>
                </TextInput>
                <FlatList style={styles.ChatBox} 
                          renderItem={({item,index})=>{
                            return(
                              <FlatListItem>
                                <Text>press</Text>
                                </FlatListItem>
                            )
                          }}
                >
                </FlatList>
              </View>
          </SafeAreaView>
        );
      }
}
    