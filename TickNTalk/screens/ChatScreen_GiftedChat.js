import React, {useState} from 'react';
import { Platform,FlatList, TouchableOpacity, SafeAreaView, View,ScrollView, TextInput,KeyboardAvoidingView} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import Fire, { RoomRef } from "../Fire";
import {styles,ChatHeader,ChatMessage_Mine,ChatMessage_Orther} from "../components/Basic/Basic"
import {Ionicons} from '@expo/vector-icons'
import {ChangeRoomIDAction,ChangeEmailAction} from "../actions/index"
import {connect} from "react-redux"
import {UserRef, MessageRef} from "../Fire"
import { CreateNullRoom } from '../Utilities/ChatRoomUtils';


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
          SenderEmail: child.toJSON().SenderEmail,
          RoomID: child.toJSON().RoomID,
          Data: child.toJSON().Data,
        };

        if(msg.Data)
          if(msg.RoomID === this.props.curRoom.RoomID)
          {
            msgs.push(msg.Data);
          };
      });

      msgs.sort((x, y) => x.createdAt < y.createdAt);

      this.setState({ messages: msgs });
    });
  }

  CreateNewRoom(members){
    let newRoom = CreateNullRoom(members);
    newRoom.Data.CreatedDate = Date.now();

    return newRoom;
  }

  async PushAndUseNewRoom(newRoom)
  {
    const newRoomDataRef = await RoomRef.push(newRoom.Data);

    let tempRoom = { 
      RoomID: newRoomDataRef.key,
      Data: newRoom.Data,
    }

    this.props.UpdateRoomID(tempRoom);
    // this.forceUpdate();
  }

  SendMessage(newMessage = []) {
    if(newMessage[0] === undefined)
      return;

    // CuteTN Note: Add new message to Firebase
    newMessage[0].createdAt = Date.parse(newMessage[0].createdAt); // CuteTN Note: somehow, Firebase cannot understand Giftedchat data :)
    MessageRef.push({
      SenderEmail: this.props.loggedInEmail,
      RoomID: this.props.curRoom.RoomID,
      Data: newMessage[0],
    })

    const msgs = this.state.messages;
    // this.setState({ messages: GiftedChat.append(msgs, newMessage) }); // CuteTN Note: this is BUGGY :)
    GiftedChat.append(msgs, newMessage);
  }

  // helper method that is sends a message
  async HandlePressSend(newMessage = []) {
    if(!this.props.curRoom.RoomID) {
      const members = this.props.curRoom.Data.Members
      const newRoom = this.CreateNewRoom(members);
      this.PushAndUseNewRoom(newRoom).then(
        (value) => {
          this.state.messages = [];
          this.SendMessage(newMessage)
        }
      );
    }
    else {
      this.SendMessage(newMessage);
    }
  }

  render() {
    return ( 
    <KeyboardAvoidingView style={styles.ChatContainer}> 
        <GiftedChat
          messages={this.state.messages}
          onSend={newMessage => this.HandlePressSend(newMessage) }
          user={{ _id: this.props.loggedInEmail }}
        >
        </GiftedChat>

        
      </KeyboardAvoidingView>
    )
  }
}


const mapStateToProps = (state) => {
  return{
      loggedInEmail: state.emailReducer,
      curRoom: state.roomReducer,
  }
};

const mapDispatchToProps = (dispatch) =>{
  return {
      Update: (loggedInEmail) => {
        dispatch(ChangeEmailAction(loggedInEmail));
      },
      UpdateRoomID: (curRoom) => {
        dispatch(ChangeRoomIDAction(curRoom));
      },
  };
}
export default connect(mapStateToProps,mapDispatchToProps)(ChatScreen_GiftedChat)

