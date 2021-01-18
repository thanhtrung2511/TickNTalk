import React, { useState } from "react";
import {
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  View,
  ScrollView,
  Text,
  KeyboardAvoidingView,
  ActivityIndicator,
  Platform,
} from "react-native";
import {
  GiftedChat,
  Bubble,
  Send,
  InputToolbar,
  Composer,
  Actions,
} from "react-native-gifted-chat";
import Fire, { RoomRef } from "../Fire";
import {
  styles,
  ChatHeader,
  colors,
  sizeFactor,
  windowWidth,
  windowHeight,
  ButtonIcon,
} from "../components/Basic/Basic";
import { Ionicons } from "@expo/vector-icons";
import { ChangeRoomIDAction, ChangeEmailAction } from "../actions/index";
import { connect } from "react-redux";
import { UserRef, MessageRef } from "../Fire";
import { CreateNullRoom, GetFriendEmail } from "../Utilities/ChatRoomUtils";

export class ChatScreen_GiftedChat extends React.Component {
  state = {
    messages: [],
    room: "",
    member: [],
    friend: { name: "", ava: "" },
  };

  ImageSend = () => {};

  goBack = () => {
    this.props.navigation.goBack();
  };

  componentDidMount() {
    this.FetchMessages();
    this.getFriend();
    // Fire.get(message =>
    //   this.setState(previous  =>  ({
    //     messages: GiftedChat.append(previous.messages,message)
    //   }))
    // );
  }

  componentWillUnmount() {
    // Fire.off();
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log("CuteTN Debug: " + JSON.stringify(this.state.messages));
  }
  getFriend=() =>{
    var nameTmp = "";
    var avaTmp = "";
    UserRef.orderByChild("Email")
      .equalTo(GetFriendEmail(this.props.curRoom, this.props.loggedInEmail))
      .on("value", (snap) => {
        snap.forEach((element) => {
          nameTmp = element.toJSON().Name;

          avaTmp = element.toJSON().urlAva;
          this.setState({ friend: { name: nameTmp, ava: avaTmp } });
        });
      });
  }
  FetchMessages() {
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

        if (msg.Data)
          if (msg.RoomID === this.props.curRoom.RoomID) {
            msgs.push(msg.Data);
          }
      });

      msgs.sort((x, y) => x.createdAt < y.createdAt);

      this.setState({ messages: msgs });
    });
  }

  CreateNewRoom(members) {
    let newRoom = CreateNullRoom(members);
    newRoom.Data.CreatedDate = Date.now();

    return newRoom;
  }

  async PushAndUseNewRoom(newRoom) {
    const newRoomDataRef = await RoomRef.push(newRoom.Data);

    let tempRoom = {
      RoomID: newRoomDataRef.key,
      Data: newRoom.Data,
    };

    this.props.UpdateRoomID(tempRoom);
  }
  goToInfo=()=>{
    this.props.navigation.replace('ChatInf');
  }
  SendMessage(newMessage = []) {
    if (newMessage[0] === undefined) return;

    // CuteTN Note: Add new message to Firebase
    newMessage[0].createdAt = Date.parse(newMessage[0].createdAt); // CuteTN Note: somehow, Firebase cannot understand Giftedchat data :)
    MessageRef.push({
      SenderEmail: this.props.loggedInEmail,
      RoomID: this.props.curRoom.RoomID,
      Data: newMessage[0],
    });

    const msgs = this.state.messages;
    // this.setState({ messages: GiftedChat.append(msgs, newMessage) }); // CuteTN Note: this is BUGGY :)
    GiftedChat.append(msgs, newMessage);
  }

  // helper method that is sends a message
  async HandlePressSend(newMessage = []) {
    if (!this.props.curRoom.RoomID) {
      const members = this.props.curRoom.Data.Members;
      const newRoom = this.CreateNewRoom(members);
      this.PushAndUseNewRoom(newRoom).then((value) => {
        this.state.messages = [];
        this.SendMessage(newMessage);
      });
    } else {
      this.SendMessage(newMessage);
    }
  }
  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: colors.lightpink,
          },
          left: {
            maxWidth: sizeFactor * 14,
            backgroundColor: colors.gray5,
          },
        }}
        textStyle={{
          right: {
            color: "#fff",
          },
        }}
      />
    );
  }
  renderSend(props) {
    return (
      <Send {...props}>
        <View style={styles.sendingContainer}>
          <Ionicons name="md-send" size={32} color={colors.Darkpink} />
        </View>
      </Send>
    );
  }
  renderLoading(props) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6646ee" />
      </View>
    );
  }
  renderComposer(props) {
    return (
      <Composer
        {...props}
        textInputStyle={{ borderRadius: 70 / 3, backgroundColor: "whitesmoke" }}
        placeholder="Aa"
      />
    );
  }
  renderInputToolbar(props) {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          // width: windowWidth,
          // backgroundColor: "black",
          alignItems: "center",
          justifyContent: "center",
          //padding:4,
          height: "auto",
          flexDirection: "row",
        }}
        primaryStyle={{
          // borderRadius: 70 / 3,
          // backgroundColor: colors.white,
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "row",
          // width: sizeFactor * 15,
        }}
      ></InputToolbar>
    );
  }
  renderActions(props) {
    return (
      <View style={styles.customActionsContainer}>
        <ButtonIcon
          MaterialFamilyIconName="camera-alt"
          color={colors.pink}
          size={24}
        />
        <ButtonIcon
          MaterialFamilyIconName="mic"
          color={colors.pink}
          size={24}
        />
      </View>
    );
  }
  renderChatEmpty(props){
    return (
      
        <View></View>
      
    ); 
  }
  render() {
    const chatBody = (
      <GiftedChat
        keyboardShouldPersistTaps="handled"
        renderBubble={this.renderBubble}
        messages={this.state.messages}
        onSend={(newMessage) => this.HandlePressSend(newMessage)}
        user={{
          _id: this.props.loggedInEmail.toUpperCase(),
          avatar: this.props.curAva,
          name:this.props.curName,
        }}
        showUserAvatar
        renderUsernameOnMessage
        alwaysShowSend
        isTyping
         renderComposer={this.renderComposer}
        renderInputToolbar={this.renderInputToolbar}
        renderSend={this.renderSend}
         renderLoading={this.renderLoading}
        renderActions={this.renderActions}
        renderChatEmpty={this.renderChatEmpty}
        onPressActionButton={() => ({
          //code gửi ảnh
        })}
      ></GiftedChat>
    );
    if (Platform.OS === "android") {
      return (
        <SafeAreaView style={[styles.containerLI],{paddingTop:25,height:"99.5%"}}>
          <KeyboardAvoidingView style={[styles.containerLI,{height:"100%"}]} behavior="auto" on>
            <ChatHeader
              ImageSource={
                this.state.friend.ava!==""
                  ? this.state.friend.ava
                  : "https://firebasestorage.googleapis.com/v0/b/chatapp-demo-c52a3.appspot.com/o/Logo.png?alt=media&token=af1ca6b3-9770-445b-b9ef-5f37c305e6b8"
              }
              Name={this.state.friend.name}
              Backward={this.goBack}
              goToInfo={this.goToInfo}
            ></ChatHeader>
            <View style={styles.ChatContainer}>{chatBody}</View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      );
    }
    return (
      <SafeAreaView style={styles.containerLI}>
        <ChatHeader
            ImageSource={
              this.state.friend.ava!==""
                ? this.state.friend.ava
                : "https://firebasestorage.googleapis.com/v0/b/chatapp-demo-c52a3.appspot.com/o/Logo.png?alt=media&token=af1ca6b3-9770-445b-b9ef-5f37c305e6b8"
            }
          Name={this.state.friend.name}
          Backward={this.goBack}
        ></ChatHeader>
        <View style={styles.ChatContainer}>{chatBody}</View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedInEmail: state.emailReducer,
    curRoom: state.roomReducer,
    curAva: state.avaReducer,
    curName:state.nameReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    Update: (loggedInEmail) => {
      dispatch(ChangeEmailAction(loggedInEmail));
    },
    UpdateRoomID: (curRoom) => {
      dispatch(ChangeRoomIDAction(curRoom));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatScreen_GiftedChat);
