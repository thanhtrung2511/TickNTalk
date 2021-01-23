import React from "react";
import {
  SafeAreaView,
  View,
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
  MessageImage,
  AccessoryBar,
} from "react-native-gifted-chat";
import { Video } from "expo-av";
import Fire, { RoomRef, storage, uidR } from "../Fire";
import {
  styles,
  ChatHeader,
  colors,
  sizeFactor,
  windowWidth,
  windowHeight,
  ButtonIcon,
  createOneButtonAlert,
} from "../components/Basic/Basic";
import { Ionicons } from "@expo/vector-icons";
import { ChangeRoomIDAction, ChangeEmailAction } from "../actions/index";
import { connect } from "react-redux";
import { UserRef, MessageRef } from "../Fire";
import { CreateNullRoom, GetFriendEmail,sendPushNotification,GetRoomriendEmail, ResetDbSeenMembersOfRoom, AddAndSaveDbSeenMemberToRoom } from "../Utilities/ChatRoomUtils";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

export class ChatScreen_GiftedChat extends React.Component {
  state = {
    messages: [],
    room: "",
    member: [],
    friend: { name: "", ava: "" },
    currentMessage: "",
    currentVideo: "",
    text: "",
    tokenList:"",
    isTyping: false,
  };

  getPermissions = async () => {
    if (Platform.OS !== "web") {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      return status;
    }
  };
  uploadPhoto = async (uri) => {
    try {
      //console.log ('1');
      const photo = await this.getBlob(uri);
      //console.log ('2');
      const uploadUri =
        this.props.typedEmail +
        "_" +
        (Platform.OS === "ios" ? uri.replace("file://", "") : uri).substring(
          uri.lastIndexOf("/") + 1
        );

      const imageRef = storage.child(uploadUri);
      await imageRef.put(photo);
      const url = await imageRef.getDownloadURL();
      //console.log (url);
      this.setState({ currentMessage: url });
      this.setState({ currentVideo: "" });
      this.setState({ text: "Đã đính kèm một ảnh" });
      return url;
    } catch (error) {
      createOneButtonAlert({ Text: "Đã có lỗi ", TextAction: "Đồng ý" });
    }
  };

  getBlob = async (uri) => {
    //console.log("Uri get blob: " + uri);
    return await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.onload = () => {
        resolve(xhr.response);
      };
      xhr.onerror = () => {
        reject(new TypeError("Network request fails"));
      };

      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });
  };

  pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.5,
      });
      if (!result.cancelled) {
        this.uploadPhoto(result.uri);
      }
    } catch (error) {
      createOneButtonAlert({
        Text: "Đã có lỗi xảy ra trong lúc chọn ảnh",
        TextAction: "Đồng ý",
      });
    }
  };

  ImageSend = async () => {
    const status = await this.getPermissions();

    if (status !== "granted") {
      alert("We need permissions to get access to your camera library");
      return;
    }

    this.pickImage();
  };

  uploadVideo = async (uri) => {
    try {
      //console.log ('1');
      const photo = await this.getBlob(uri);
      //console.log ('2');
      const uploadUri =
        this.props.typedEmail +
        "_" +
        (Platform.OS === "ios" ? uri.replace("file://", "") : uri).substring(
          uri.lastIndexOf("/") + 1
        );

      const imageRef = storage.child(uploadUri);
      await imageRef.put(photo);
      const url = await imageRef.getDownloadURL();
      this.setState({ currentVideo: url });
      this.setState({ currentMessage: "" });
      this.setState({ text: "Đã đính kèm một video" });
      return url;
    } catch (error) {
      createOneButtonAlert({ Text: "Đã có lỗi ", TextAction: "Đồng ý" });
    }
  };

  pickVideo = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true,
        quality: 0.5,
      });
      if (!result.cancelled) {
        this.uploadVideo(result.uri);
      }
    } catch (error) {
      createOneButtonAlert({
        Text: "Đã có lỗi xảy ra trong lúc chọn ảnh",
        TextAction: "Đồng ý",
      });
    }
  };

  VideoSend = async () => {
    const status = await this.getPermissions();

    if (status !== "granted") {
      alert("We need permissions to get access to your camera library");
      return;
    }

    this.pickVideo();
  };

  goBack = () => {
    this.props.navigation.goBack();
  };

  componentWillMount() {
    this.FetchMessages();
    this.getFriend();
    //console.log(GetRoomriendEmail(this.props.curRoom,this.props.loggedInEmail));
    // Fire.get(message =>
    //   this.setState(previous  =>  ({
    //     messages: GiftedChat.append(previous.messages,message)
    //   }))
    // );
  }
  componentDidMount() {
    this.setState({isTyping: false,});
    // Fire.get(message =>
    //   this.setState(previous  =>  ({
    //     messages: GiftedChat.append(previous.messages,message)
    //   }))
    // );
  }

  componentDidUpdate(){
    AddAndSaveDbSeenMemberToRoom(this.props.curRoom, this.props.loggedInEmail);
  }

  getFriend = () => {
    var nameTmp = "";
    var avaTmp = "";
    var token="";
    UserRef.orderByChild("Email")
      .equalTo(GetFriendEmail(this.props.curRoom, this.props.loggedInEmail))
      .on("value", (snap) => {
        snap.forEach((element) => {
          nameTmp = element.toJSON().Name;
          avaTmp = element.toJSON().urlAva;
          token=element.toJSON().Token;
          this.setState({ friend: { name: nameTmp, ava: avaTmp },tokenList:token});
        });
      });
  };
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


  ChatInfoNav = () => {
    this.props.navigation.navigate("ChatInf");
  };


  SendMessage(newMessage = []) {
    if (newMessage[0] === undefined) return;

    // CuteTN Note: Add new message to Firebase
    //console.log("aaa",this.state.currentVideo)
    if (this.state.currentVideo) newMessage[0].video = this.state.currentVideo;
    if (this.state.currentMessage)
      newMessage[0].image = this.state.currentMessage;

    newMessage[0].createdAt = Date.parse(newMessage[0].createdAt); // CuteTN Note: somehow, Firebase cannot understand Giftedchat data :)
    MessageRef.push({
      SenderEmail: this.props.loggedInEmail,
      RoomID: this.props.curRoom.RoomID,
      Data: newMessage[0],
    });

    ResetDbSeenMembersOfRoom(this.props.curRoom);

    const msgs = this.state.messages;
    const pushContent={ message:newMessage[0].text,data:this.props.curRoom,sender:this.props.curName}
    // this.setState({ messages: GiftedChat.append(msgs, newMessage) }); // CuteTN Note: this is BUGGY :)
    sendPushNotification(this.state.tokenList,pushContent);
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
    this.setState({ currentMessage: "", currentVideo: "" });
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
  setIsTyping = () => {
    this.setState({
      isTyping: !this.state.isTyping,
    })
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
      />
    );
  }
  renderActions(props) {
    return (
      <View style={styles.customActionsContainer}>
        <ButtonIcon
          MaterialFamilyIconName="image"
          color={colors.pink}
          size={24}
          onPress={props.onPressCamera}
        />
        <ButtonIcon
          MaterialFamilyIconName="videocam"
          color={colors.pink}
          size={24}
          onPress={props.onPressVideo}
        />
      </View>
    );
  }
  renderChatEmpty(props) {
    return <View />;
  }

  renderMessageImage(props) {
    return (
      <MessageImage
        {...props}
        source={props.currentMessage.image}
        imageStyle={{ width: 200, height: 200 }}
      />
    );
  }

  renderMessageVideo(props) {
    return (
      <Video
        resizeMode="contain"
        useNativeControls
        shouldPlay={false}
        source={{ uri: props.currentMessage.video }}
        style={{ width: 200, height: 300 }}
      />
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
          name: this.props.curName,
        }}
        onInputTextChanged={(text) => {this.setState({ text: text });this.setIsTyping();}}
        text={this.state.text}
        //showUserAvatar
        showAvatarForEveryMessage
        //renderUsernameOnMessage
        alwaysShowSend={
          this.state.text
            ? true
            : false || this.state.currentVideo
            ? true
            : false || this.state.currentMessage
            ? true
            : false
        }
        isTyping={this.state.isTyping}
        //renderFooter
        renderComposer={this.renderComposer}
        renderInputToolbar={this.renderInputToolbar}
        renderSend={this.renderSend}
        renderLoading={this.renderLoading}
        renderActions={this.renderActions}
        renderChatEmpty={this.renderChatEmpty}
        renderMessageVideo={this.renderMessageVideo}
        renderMessageImage={this.renderMessageImage}
        onPressVideo={this.VideoSend}
        onPressCamera={this.ImageSend}
      />
    );
    if (Platform.OS === "android") {
      return (
        <SafeAreaView
          style={([styles.containerLI], { paddingTop: 25, height: "99.5%" })}
        >
          <KeyboardAvoidingView
            style={[styles.containerLI, { height: "100%" }]}
            behavior="auto"
            on
          >
            <ChatHeader
              ImageSource={
                this.state.friend.ava !== ""
                  ? this.state.friend.ava
                  : "https://firebasestorage.googleapis.com/v0/b/chatapp-demo-c52a3.appspot.com/o/Logo.png?alt=media&token=af1ca6b3-9770-445b-b9ef-5f37c305e6b8"
              }
              Name={this.state.friend.name}
              goBack={this.goBack}
              goToInfo={this.ChatInfoNav}
            />
            <View style={styles.ChatContainer}>{chatBody}</View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      );
    }
    return (
      <SafeAreaView style={styles.containerLI}>
        <ChatHeader
          ImageSource={
            this.state.friend.ava !== ""
              ? this.state.friend.ava
              : "https://firebasestorage.googleapis.com/v0/b/chatapp-demo-c52a3.appspot.com/o/Logo.png?alt=media&token=af1ca6b3-9770-445b-b9ef-5f37c305e6b8"
          }
          Name={this.state.friend.name}
          goBack={this.goBack}
          goToInfo={this.ChatInfoNav}
        />
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
    curName: state.nameReducer,
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
