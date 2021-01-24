import React from "react";
import {
  SafeAreaView,
  View,
  KeyboardAvoidingView,
  ActivityIndicator,
  Platform,
  Linking,
  Alert,FlatList,
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
import Fire, { UserRef, RoomRef, MessageRef, storage, uidR } from "../Fire";
import {
  styles,
  ChatHeader,
  colors,
  sizeFactor,
  windowWidth,
  windowHeight,
  ButtonIcon,BasicImage,
  createOneButtonAlert,
} from "../components/Basic/Basic";
import { Ionicons } from "@expo/vector-icons";
import {
  ChangeRoomIDAction,
  ChangeEmailAction,
  ChangeMemberAction,
  ChangeRoomDataAction,
} from "../actions/index";
import { connect } from "react-redux";
import {
  CreateNullRoom,
  GetFriendEmail,
  sendPushNotification,
  GetRoomFriendEmail,
  CountNumberOfMembers,
  ResetDbSeenMembersOfRoom,
  AddAndSaveDbSeenMemberToRoom,getFriendAvaChatScr,
} from "../Utilities/ChatRoomUtils";

import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import { RECORDING_OPTION_IOS_BIT_RATE_STRATEGY_VARIABLE } from "expo-av/build/Audio";

export class ChatScreen_GiftedChat extends React.Component {
  state = {
    messages: [],
    currentMessage: "",
    currentVideo: "",
    text: "",
    isTyping: false,
    isPairRoom: false,
    listAvaSeen:[],
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
    this.props.navigation.replace("Dashboard");
  };

  componentWillMount() {
    this.FetchMessages();
    var check = CountNumberOfMembers(this.props.curRoom) === 2;
    this.setState({ isPairRoom: check });
    // Fire.get(message =>
    //   this.setState(previous  =>  ({
    //     messages: GiftedChat.append(previous.messages,message)
    //   }))
    // );

    this.subscribeOnRoomUpdate();
  }

  componentDidUpdate = (previousProp, previousState) => {
    AddAndSaveDbSeenMemberToRoom(this.props.curRoom, this.props.loggedInEmail);

    if ((previousState.messages !== this.state.messages) ||
        (previousProp.curRoom !== this.props.curRoom)
      )
    {
      this.updateListSeenAva();
    }
  }

  subscribeOnRoomUpdate(){
    RoomRef.on("value", (snapshot) => {
      snapshot.forEach(child => {
        let room = child.toJSON();

        if(child.key === this.props.curRoom.RoomID) {
          this.updateListSeenAva(child.toJSON().SeenMembers);
        }
      })
    })
  }

  updateListSeenAva(seenMembers) {
    if(!seenMembers)
      return [];

    let listAva=[];
    //console.log(this.props.curRoom.Data.SeenMembers);

    Object.values(seenMembers).forEach((e) => {
      if (e.toUpperCase() !== this.props.loggedInEmail.toUpperCase()) {
      // console.log(e);
        listAva.push(getFriendAvaChatScr(e));
      }
    })

    this.setState({ listAvaSeen: listAva });
  }

  getFriend = () => {
    var nameTmp = "";
    var avaTmp = "";
    var token = "";
    UserRef.orderByChild("Email")
      .equalTo(GetFriendEmail(this.props.curRoom, this.props.loggedInEmail))
      .on("value", (snap) => {
        snap.forEach((element) => {
          nameTmp = element.toJSON().Name;
          avaTmp = element.toJSON().urlAva;
          token = element.toJSON().Token;
          this.setState({
            friend: { name: nameTmp, ava: avaTmp },
            tokenList: token,
          });
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
    this.props.navigation.replace("ChatInf");
  };

  SendMessage(newMessage = []) {
    if (newMessage[0] === undefined) return;

    // CuteTN Note: Add new message to Firebase
    //console.log("aaa",this.state.currentVideo)
    if (this.state.currentVideo) newMessage[0].video = this.state.currentVideo;
    if (this.state.currentMessage)
      newMessage[0].image = this.state.currentMessage;

    ResetDbSeenMembersOfRoom(this.props.curRoom).then(value => {
      newMessage[0].createdAt = Date.parse(newMessage[0].createdAt); // CuteTN Note: somehow, Firebase cannot understand Giftedchat data :)
      MessageRef.push({
        SenderEmail: this.props.loggedInEmail,
        RoomID: this.props.curRoom.RoomID,
        Data: newMessage[0],
      });

      const msgs = this.state.messages;
      var pushContent = {
        message: newMessage[0].text,
        data: this.props.curRoom,
        sender: this.props.curName,
      };
      if (CountNumberOfMembers(this.props.curRoom) > 2)
        pushContent.sender +=" tới " + this.props.roomData.name;
      //console.log(this.props.roomData);
      // this.setState({ messages: GiftedChat.append(msgs, newMessage) }); // CuteTN Note: this is BUGGY :)
      var tokenList = [];
      tokenList=this.props.friendList;
      //console.log(this.props.friendList);
      for (var i in tokenList) {
        if (tokenList[i].email.toUpperCase()!== this.props.loggedInEmail.toUpperCase())
        sendPushNotification(tokenList[i].token, pushContent);
      }
      GiftedChat.append(msgs, newMessage);
    });
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
    });
  };
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
  CallAction(number, isFriend) {
    if (isFriend) {
      var phoneNumber;
      if (Platform.OS === "android") {
        phoneNumber = `tel:${number}`;
      } else {
        phoneNumber = `telprompt:${number}`;
      }
      Linking.canOpenURL(phoneNumber)
        .then((supported) => {
          if (!supported) {
            Alert.alert("Thông báo", "Số điện thoại này không tồn tại", [
              { text: "Đồng ý", style: "cancel" },
            ]);
          } else {
            return Linking.openURL(phoneNumber);
          }
        })
        .catch((err) => console.log(err));
    } else {
      Alert.alert("Thông báo", "Chức năng này chưa được hỗ trợ", [
        { text: "Đồng ý", style: "cancel" },
      ]);
    }
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
  renderFooter(listAvaSeen){
    return(
      <FlatList
      style={{
        width: "auto",
        borderRadius: 15,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",height:32,
        marginRight:8,
        }
      }
      data={listAvaSeen}
      renderItem={({ item, index }) => {
        return(
      <BasicImage Icon={20} source={{ uri:item.ava}} Round={100} ></BasicImage>)}}>

    </FlatList>
    )
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
        onInputTextChanged={(text) => {
          this.setState({ text: text });
          this.setIsTyping();
        }}
        text={this.state.text}
        //showUserAvatar
        //showAvatarForEveryMessage
        renderUsernameOnMessage
        alwaysShowSend={
          this.state.text
            ? true
            : false || this.state.currentVideo
            ? true
            : false || this.state.currentMessage
            ? true
            : false
        }
        //isTyping={this.state.isTyping}
        renderFooter={()=>this.renderFooter(this.state.listAvaSeen)}
        renderComposer={this.renderComposer}
        renderInputToolbar={this.renderInputToolbar}
        renderSend={this.renderSend}
        renderLoading={this.renderLoading}
        renderActions={this.renderActions}
        renderMessageVideo={this.renderMessageVideo}
        renderMessageImage={this.renderMessageImage}
        onPressVideo={this.VideoSend}
        onPressCamera={this.ImageSend}
      />
    );
    if (Platform.OS === "android") {
      return (
        <SafeAreaView
          style={[styles.containerLI,{paddingTop:0,height:"auto"}]}
        >
          <KeyboardAvoidingView
            style={[styles.containerLI, { height: "100%" }]}
            behavior="auto"
            on
          >
            <ChatHeader
              ImageSource={
                this.props.roomData.ava
                  ? this.props.roomData.ava
                  : "https://firebasestorage.googleapis.com/v0/b/chatapp-demo-c52a3.appspot.com/o/Logo.png?alt=media&token=af1ca6b3-9770-445b-b9ef-5f37c305e6b8"
              }
              Name={this.props.roomData.name}
              goBack={this.goBack}
              goToInfo={this.ChatInfoNav}
              Call={() =>
                this.CallAction(
                  this.props.friendList[0].phone,
                  this.state.isPairRoom
                )
              }
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
            this.props.roomData.ava
              ? this.props.roomData.ava
              : "https://firebasestorage.googleapis.com/v0/b/chatapp-demo-c52a3.appspot.com/o/Logo.png?alt=media&token=af1ca6b3-9770-445b-b9ef-5f37c305e6b8"
          }
          Name={this.props.roomData.name}
          goBack={this.goBack}
          goToInfo={this.ChatInfoNav}
          Call={() =>
            this.CallAction(
              this.props.friendList[0].phone,
              this.state.isPairRoom
            )
          }
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
    friendList: state.memberReducer,
    roomData: state.roomDataReducer,
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
    ChangeMemberAction: (curMem) => {
      dispatch(ChangeMemberAction(curMem));
    },
    ChangeRoomDataAction: (curRoomData) => {
      dispatch(ChangeRoomDataAction(curRoomData));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatScreen_GiftedChat);
