import React, { Component, Children } from 'react'
import { Text,TextInput, View, Dimensions,StyleSheet, TouchableOpacity,FlatList, ViewBase } from 'react-native'
import { SafeAreaView,NavigationContainer } from 'react-native-safe-area-context'
import { EvilIcons } from '@expo/vector-icons';
import styles from '../components/ChatFeed/Styles'
import firebase from 'firebase'
import { UserRef, RoomRef } from '../Fire';
import { Card } from 'react-native-paper';

export default class ChatFeed extends React.Component {
    
    state={
        usernameToSearch:"",
        Email:"",
        listRooms:["hihi", "haha", "hoho"],   
    }
    ChatScreenNav=()=>
    {
      this.props.navigation.navigate("ChatScr")
    }
  
    componentDidMount()
    {
      this.FetchListRooms();
    }

    async OnChangeSearchText(usernameToSearch)
    {
      await this.setState({usernameToSearch}) // to do later :)
    }
  
    FetchListRooms()
    {
      RoomRef.on(
        'value',
        (snapshot) => {
          var li = [];     

          snapshot.forEach( (child) => {
            li.push({
              RoomName: child.toJSON().RoomName,
              CreatedDate: child.toJSON().CreatedDate,
              Members: child.toJSON().Members,
            });
          })
          
          // firebase.auth().get
          // dirty code
          li.sort((x,y) => (x.RoomName > y.RoomName)); 
          this.setState({listRooms: li});
        }
      )

    }

    render() {
        return (
          <SafeAreaView style={styles.container}>
              <Text style={styles.header}>Tin nhắn</Text>                        
              <View style={{marginLeft:32,marginTop:16,flexDirection:'column'}} justifyContent="center">
                <TextInput style={styles.input}
                      placeholder="Tìm kiếm bạn bè.."
                      onChangeText={Text=>{
                        this.OnChangeSearchText(Text);
                      }}
                      /*value={this.state.usernameToSearch}*/>
                </TextInput>
                <FlatList style={styles.ChatBox} 
                  data={this.state.listRooms}
                  renderItem={({item,index})=>{
                    return(
                      <SafeAreaView>
                          <Text>{index+1}. {item.RoomName}</Text>
                      </SafeAreaView>
                    )
                  }}
                >
                </FlatList>
              </View>
          </SafeAreaView>
        );
      }
}
    