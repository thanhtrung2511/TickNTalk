import React, { Component } from 'react'
import { Text,TextInput, View, Dimensions,StyleSheet, TouchableOpacity,FlatList, ViewBase } from 'react-native'
import { SafeAreaView,NavigationContainer } from 'react-native-safe-area-context'
import { EvilIcons } from '@expo/vector-icons';
import styles from '../components/ChatFeed/Styles'
import firebase from 'firebase'
import { UserRef } from '../Fire';
import { Card } from 'react-native-paper';

export default class ChatFeed extends React.Component {
    
    state={
        usernameToSearch:"",
        password:"",
        repassword:"",
        Email:"",
        listUsers:["hihi", "haha", "hoho"],   
    }
    ChatScreenNav=()=>
    {
      this.props.navigation.navigate("ChatScr")
    }

    async OnChangeSearchText(usernameToSearch)
    {
      //console.log(usernameToSearch)
      await this.setState({usernameToSearch}) // to do later :)
      this.FetchListUsers();
    }
  
    FetchListUsers()
    {
      UserRef.on(
        'value',
        (snapshot) => {
          var li = [];     

          snapshot.forEach( (child) => {
            li.push({
              //key: child.key,
              //username: child.val().Identifier,
              // this.state.usernameToSearch
              Email: child.toJSON().Email,
              Phone: child.toJSON().Phone,
              fullName: child.toJSON().fullName,
            });
          })
          
          // firebase.auth().get
          // dirty code
          li.sort((x,y) => (x.fullName > y.fullName)); 
          this.setState({listUsers: li});
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
                  data={this.state.listUsers}
                  renderItem={({item,index})=>{
                    return(
                      <SafeAreaView>
                          <Text>{index+1}. {item.fullName}</Text>
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
    