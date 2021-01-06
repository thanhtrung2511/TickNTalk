import React, {useState} from 'react';
import { Platform,FlatList, TouchableOpacity, SafeAreaView, View,ScrollView, TextInput,KeyboardAvoidingView} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import Fire from "../Fire";
import {styles,ChatHeader,ChatMessage_Mine,ChatMessage_Orther} from "../components/Basic/Basic"
import {Ionicons} from '@expo/vector-icons'
import {ChangeRoomIDAction,ChangeEmailAction} from "../actions/index"
import {connect} from "react-redux"
import {UserRef, MessageRef} from "../Fire"


export class ChatScreen_GiftedChat extends React.Component {
  state = {
    messages: [],
    room: "",
    member: [],
  }

  ImageSend=() => {

  }

  goBack=()=>{
    this.props.navigation.goBack();
  }

  componentDidMount(){
    this.FetchMessages();
    // Fire.get(message => 
    //   this.setState(previous  =>  ({
    //     messages: GiftedChat.append(previous.messages,message)
    //   }))
    // );
  }

  componentWillUnmount(){
    // Fire.off();
  }

  componentDidUpdate(prevProps, prevState){
    // console.log("CuteTN Debug: " + JSON.stringify(this.state.messages));
  }

  FetchMessages(){
    MessageRef.on("value", (snapshot) => {
      // temp list of strangers
      let msgs = [];

      snapshot.forEach((child) => {
        let msg = {
          Id: child.key,
          User: child.toJSON().User,
          RoomID: child.toJSON().RoomID,
          CreatedAt: child.toJSON().CreatedAt,
          RawData: child.toJSON().RawData,
        };


        if(msg.RoomID === this.props.curRoomID)
        {
          // if(msg.CreatedAt !== undefined)
          //   msg.RawData.createdAt = Date.parse(msg.CreatedAt.substring(1, msg.CreatedAt.length));

          // console.log(JSON.stringify(msg.RawData));
          msgs.push(msg.RawData);
        };
      });

      // msgs.sort((x, y) => x.createdAt.toUpperCase() > y.createdAt.toUpperCase());

      this.setState({ messages: msgs });
    });
  }


  // helper method that is sends a message
  handleSend(newMessage = []) {
    if(newMessage[0] === undefined)
      return;

    // CuteTN Note: Add new message to Firebase
    MessageRef.push({
      User: this.props.loggedInEmail,
      RoomID: this.props.curRoomID,
      CreatedAt: JSON.stringify(newMessage[0].createdAt),
      RawData: newMessage[0],
    })

    this.setState({ messages: GiftedChat.append(this.state.messages, newMessage) });
  }

  render() {
    
    // const chat=<GiftedChat messages={this.state.messages} onSend={Fire.send} user={this.user}/>;
    
    return ( 
    <KeyboardAvoidingView style={styles.ChatContainer}> 
        <GiftedChat
          messages={this.state.messages}
          onSend={newMessage => this.handleSend(newMessage)}
          user={{ _id: this.props.loggedInEmail }}
        >
        </GiftedChat>
        {/* <FlatList
          data={this.state.messages}
          renderItem={({ item, index }) => {
            <Text>
              item
            </Text>
          }}
        >

        </FlatList> */}
        
      </KeyboardAvoidingView>
    )
  }
}


const mapStateToProps = (state) => {
  return{
      loggedInEmail: state.emailReducer,
      curRoomID: state.roomReducer,
  }
};

const mapDispatchToProps = (dispatch) =>{
  return {
      Update: (loggedInEmail) => {
        dispatch(ChangeEmailAction(loggedInEmail));
      },
      updateRoomID: (curID) => {
        dispatch(ChangeRoomIDAction(curID));
      },
  };
}
export default connect(mapStateToProps,mapDispatchToProps)(ChatScreen_GiftedChat)

