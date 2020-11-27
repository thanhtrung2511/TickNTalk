
import React, { Component } from 'react'
import { Text,TextInput, View,FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { EvilIcons } from '@expo/vector-icons';
import {styles,MessageCard} from '../components/Basic/Basic'
import firebase from 'firebase'

import { UserRef, RoomRef } from '../Fire';

import { Card } from 'react-native-paper';
import { connect } from 'react-redux'

export class ChatFeed extends React.Component {
    
    state={
      toSearchText:"",
      listRooms: [],
      filteredRooms: [],
    }
    componentDidMount=()=>
    {
      this.FetchListRooms();
    }
    ChatScreenNav=()=>
    {
      this.props.navigation.navigate("ChatScr")
    }
  
    componentDidMount()
    {
      this.FetchListRooms();
    }

    isMatchedRoom(room, toSearchText)
    {
      // check by roomname first
      if(room.RoomName.includes(toSearchText) === true)
        return true;

      var result = false;

      // check if the room has the searched username or email
      Object.values(room.Members).forEach((email) => {
        if(email != this.props.loggedInEmail)
        {
          // foreach user ref, find the ones that matched the email or username
          if(email.includes(toSearchText))
            result = true;
        }
      });
      
      return result;
    }

    onChangeSearchText(toSearchText)
    {
      // this.state.filteredRooms =  this.state.listRooms.filter(this.isMatchedRoom);
      var li = [];
      
      this.state.listRooms.forEach((room) => {
        var matched = this.isMatchedRoom(room, toSearchText);
        
        if(matched)
        {
          li.push(room);
        }
      });
      
      this.setState({filteredRooms: li});
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
              <View style={{marginTop:16,flexDirection:'column'}} justifyContent="center">
                <View style={{flexDirection:'row',alignItems:"flex-start"}}>
                <TextInput style={styles.input}
                      placeholder="Tìm kiếm bạn bè.."
                      onChangeText={Text=>{
                        this.onChangeSearchText(Text);
                      }}>
                </TextInput>
                
                </View>
                <MessageCard 
                            ImageSource='https://firebasestorage.googleapis.com/v0/b/chatapp-demo-c52a3.appspot.com/o/Logo.png?alt=media&token=af1ca6b3-9770-445b-b9ef-5f37c305e6b8'
                            Name='Trung'
                            LastestChat='aaaaaaaaaaasjdhasjdhasdaaaaaaaaaaaaaaa'
                            isRead='false'
                            >
                          </MessageCard>
                          <MessageCard 
                            ImageSource='https://firebasestorage.googleapis.com/v0/b/chatapp-demo-c52a3.appspot.com/o/Logo.png?alt=media&token=af1ca6b3-9770-445b-b9ef-5f37c305e6b8'
                            Name='Trung'
                            LastestChat='aaaaaaaaaaasjdhasjdhasdaaaaaaaaaaaaaaa'
                            isRead='false'
                            >
                          </MessageCard>
                <FlatList style={styles.ChatBox} 
                  data={this.state.filteredRooms}
                  renderItem={({item,index})=>{
                    return(
                      <SafeAreaView>
                          <View>{index+1}. {item.RoomName}</View>
                          <MessageCard 
                            ImageSource='https://firebasestorage.googleapis.com/v0/b/chatapp-demo-c52a3.appspot.com/o/Logo.png?alt=media&token=af1ca6b3-9770-445b-b9ef-5f37c305e6b8'
                            Name='Trung'
                            LastestChat='aaaaaaaaaaasjdhasjdhasdaaaaaaaaaaaaaaa'
                            isRead='false'
                            >
                          </MessageCard>
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
    

const mapStateToProps = (state) => {
  return{
      loggedInEmail: state.emailReducer,
  }
};

const mapDispatchToProps = (dispatch) =>{
  return {
      Update: (loggedInEmail) => {
        dispatch(ChangeEmailAction(loggedInEmail));
      }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ChatFeed);