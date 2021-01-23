import React from "react";
import {
  Text,
  View,
  FlatList,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  styles,
  MessageCard,
  windowHeight,
  sizeFactor,
  colors,
  ButtonIcon,
} from "../components/Basic/Basic";
import firebase from "firebase";
import { SearchBar } from "react-native-elements";
import { UserRef, RoomRef, MessageRef } from "../Fire";

import { connect } from "react-redux";
import {
  ChangeRoomIDAction,
  ChangeEmailAction,
  ChangeMemberAction,
  ChangeRoomDataAction,
} from "../actions/index";

import {
  GetFriendEmail,
  GetUserByEmail,
  CheckRoomContainUser,
  CheckRoomContainUserFirebase,
  CountNumberOfMembers,
  CreateNullRoom,
  GetRoomFriendEmail,
  LoadLatestMessagesIntoRooms,
  MatchSearchRoomScore,
  MatchSearchStringScore,
  MatchSearchUserScore,
  registerForPushNotificationsAsync,
  CheckRoomSeenByUser,
  AddSeenMemberToRoom,
  AddAndSaveDbSeenMemberToRoom,
} from "../Utilities/ChatRoomUtils";
console.disableYellowBox = true;
import * as Notifications from "expo-notifications";

// this.props.navigation.state.routeName

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});
var notificationListener = {};
var responseListener = {};
export class ChatFeed extends React.Component {
  state = {
    toSearchText: "",
    listUsers: [],
    listRooms: [],
    listMessages: [],

    listGroups: [],
    listFriends: [],
    listStrangers: [],

    filteredGroups: [],
    filteredFriends: [],
    filteredStranger: [],

    addNewFriend: false,
    headerText: "Tin nhắn",
    iconName: "person-add",
    expoPushToken: "",
    notification: false,
  };

  addTokenToDatabase = (token) => {
    var ref = UserRef.orderByChild("Email").equalTo(this.props.loggedInEmail);
    ref.once("value").then(function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        childSnapshot.ref.update({
          Token: token,
        });
      });
    });
  };
  async SubscribeForChatScr(room) {
    await this.SubscribeFriendForChatScr(room);
    // console.log(room.Data);
    var countMember = CountNumberOfMembers(room);
    var RoomToken = { ava: "", name: "" };
    if (countMember > 2) {
      RoomToken.ava = room.Data.RoomAva;
      RoomToken.name = room.Data.RoomName;
    } else {
      var friendArr = this.props.memberList;
      // console.log('friend',friendArr);
      for (var i in friendArr) {
        if (
          friendArr[i].email.toUpperCase() ===
          this.props.loggedInEmail.toUpperCase()
        )
          continue;
        RoomToken.ava = friendArr[i].ava;
        RoomToken.name = friendArr[i].name;
      }
    }
    //console.log(this.props.nextRoomData);
    //console.log(RoomToken);
    this.props.ChangeRoomDataAction(RoomToken);
    //console.log(this.props.nextRoomData);
  }
  getFriendForChatScr = (email) => {
    var nameTmp = "";
    var avaTmp = "";
    var token = "";
    var emailTmp = "";
    var birthdayTmp = "";
    var genderTmp = "";
    var result = { ava: "", name: "", token: "", email: "",birthday:"",gender:"" };
    UserRef.orderByChild("Email")
      .equalTo(email)
      .on("value", (snap) => {
        snap.forEach((element) => {
          nameTmp = element.toJSON().Name;
          avaTmp = element.toJSON().urlAva;
          token = element.toJSON().Token;
          emailTmp = element.toJSON().Email;
          birthdayTmp = element.toJSON().Birthday;
          genderTmp = element.toJSON().Gender;
        });
      });
    result.ava = avaTmp;
    result.name = nameTmp;
    result.email = emailTmp;
    result.token = token;
    result.birthday= birthdayTmp;
    result.gender= genderTmp;
    // console.log('result',result)
    return result;
  };
  async SubscribeFriendForChatScr(room) {
    // var listFriendEmailRoom=GetRoomFriendEmail(this.props.curRoomID,this.props.loggedInEmail);
    var listFriendInfoRoom = [];
    // console.log("room",room);
    Object.values(room.Data.Members).forEach((e) => {
      if (e.toUpperCase() !== this.props.loggedInEmail.toUpperCase()) {
        var tmpUser = this.getFriendForChatScr(e);
        listFriendInfoRoom.push(tmpUser);
      }
    });
    // for(var i in listFriendEmailRoom){
    //   var tmpUser=this.getFriendForChatScr(listFriendEmailRoom[i]);

    //   listFriendInfoRoom.push(tmpUser);
    // }
   // console.log("list", listFriendInfoRoom);
    this.props.ChangeMemberAction(listFriendInfoRoom);
  }
  componentDidMount = () => {
    registerForPushNotificationsAsync().then((token) => {
      //console.log(token);
      this.setState({ expoPushToken: token });
      this.addTokenToDatabase(token);
    });
    //Đăng ký nhận notification ngay cả khi người dùng không dùng máy
    //Diem manh push notification so vơi pull
    notificationListener = Notifications.addNotificationReceivedListener(
      (notification) => {
        //console.log(notification);
        this.props.UpdateRoomID(notification.request.content.data.data);

        this.setState({ notification: notification });
      }
    );
    //Đăng ký sự sự kiện phản hồi khi người dùng tap vào notification
    responseListener = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        //console.log(response);
        this.props.UpdateRoomID(
          response.notification.request.content.data.data
        );
      }
    );

    this.SubscribeDb();
    // this.FilterSearchedRoom();
    this.MyRefresh();
    // this.onChangeSearchText(this.state.toSearchText);
    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  };
  ChatScreenNav = (id) => {
    //console.log(id);
    this.props.UpdateRoomID(id);
    //console.log(this.props.curRoomID);
    this.SubscribeForChatScr(id);
    this.props.navigation.navigate("ChatScr");
  };

  componentDidUpdate = (previousProp, previousState) => {
    if (
      previousState.listMessages !== this.state.listMessages ||
      previousState.listRooms !== this.state.listRooms ||
      previousState.listUsers !== this.state.listUsers ||
      previousState.toSearchText !== this.state.toSearchText
    ) {
      this.MyRefresh();
    }
  };

  SubscribeDb() {
    UserRef.on("value", (snapshot) => {
      let users = [];

      snapshot.forEach((child) => {
        users.push(child.toJSON());
      });

      users.sort((x, y) => x.Name.toUpperCase() > y.Name.toUpperCase());

      this.setState({ listUsers: users });
      // this.MyRefresh();
    });

    RoomRef.on("value", (snapshot) => {
      let rooms = [];

      snapshot.forEach((child) => {
        //console.log(child);
        if (
          CheckRoomContainUserFirebase(child.toJSON(), this.props.loggedInEmail)
        ) {
          const Data = child.toJSON();
          let room = {
            RoomID: child.key,
            Data,
          };

          rooms.push(room);
        }
      });

      this.setState({ listRooms: rooms });
      // this.MyRefresh();
    });

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

        msgs.push(msg);
      });

      this.setState({ listMessages: msgs });
      // this.MyRefresh();
    });
  }

  MyRefresh() {
    let tempRooms = this.state.listRooms;
    const tempMsgs = this.state.listMessages;

    LoadLatestMessagesIntoRooms(tempRooms, tempMsgs, false);
    //console.log(tempRooms);
    this.SortChatRoomsByTime(tempRooms).then((result) => {
      // Object.values(tempRooms).forEach((room) => console.log(room.LatestMessage));
      this.ArrangeChatRooms();
      // this.FilterSearchedRoom(this.state.toSearchText);
    });
  }

  /// CuteTN Note: a huge violation of SRP
  ArrangeChatRooms() {
    let gr = [];
    let fr = [];

    // list of strangers
    let st = this.state.listUsers.filter(
      (user) =>
        user.Email.toUpperCase() !== this.props.loggedInEmail.toUpperCase()
    );

    Object.values(this.state.listRooms).forEach((room) => {
      if (CheckRoomContainUser(room, this.props.loggedInEmail)) {
        let memberCnt = CountNumberOfMembers(room);
        if (memberCnt === 2) {
          // add to friend list
          fr.push(room);
          // remove from stranger
          let email = GetFriendEmail(room, this.props.loggedInEmail);
          st = st.filter(
            (user) => user.Email.toUpperCase() !== email.toUpperCase()
          );
        } else gr.push(room);
      }
    });

    this.setState({ listStrangers: st });
    this.setState({ listGroups: gr });
    this.setState({ listFriends: fr });
  }

  async SortChatRoomsByTime(listRooms) {
    await listRooms.sort((a, b) => {
      if (
        a &&
        b &&
        a.LatestMessage &&
        b.LatestMessage &&
        a.LatestMessage.Data &&
        b.LatestMessage.Data &&
        a.LatestMessage.Data.createdAt &&
        b.LatestMessage.Data.createdAt
      )
        return a.LatestMessage.Data.createdAt < b.LatestMessage.Data.createdAt;
      else return false;
    });
  }

  // Remove from stranger list
  RemoveFromStrangers(strangerList, email) {
    if (strangerList === undefined) return [];

    return strangerList.filter(
      (x) => x.Email.toUpperCase() !== email.toUpperCase()
    );
  }

  RenderRoomMessageCard(room, isFriendRoom) {
    let title = room.Data.RoomName;
    let roomId = room.RoomID;
    let isRead = CheckRoomSeenByUser(room, this.props.loggedInEmail);
    let countMember = CountNumberOfMembers(room);
    let latestMsgText = "";
    let userName = "";

    let SystemAva =
      "https://firebasestorage.googleapis.com/v0/b/chatapp-demo-c52a3.appspot.com/o/Logo.png?alt=media&token=af1ca6b3-9770-445b-b9ef-5f37c305e6b8";

    if (room.LatestMessage) {
      if (countMember > 2) {
        userName = room.LatestMessage.Data.user.name + ": ";
      }
      latestMsgText = userName + room.LatestMessage.Data.text;
    }

    // if title is nothing, then get friend's name
    if (isFriendRoom && !title) {
      const friendEmail = GetFriendEmail(room, this.props.loggedInEmail);
      const friend = GetUserByEmail(this.state.listUsers, friendEmail);

      var userAva;
      if (friend) userAva = friend.urlAva;
      if (!friend) title = "Người dùng TickNTalk";
      else title = friend.Name;
    }

    return (
      <MessageCard
        ImageSource={userAva ? userAva : SystemAva}
        Name={title}
        LastestChat={latestMsgText}
        //isRead={false}
        isRead={isRead}
        onPress={() => {
          this.ChatScreenNav(room);
        }}
      ></MessageCard>
    );
  }

  RenderAllMyRoomsByTime() {
    return (
      <View>
        <FlatList
          style={styles.ChatBox}
          alignItems="center"
          data={this.state.listRooms}
          renderItem={({ item, index }) => {
            return this.RenderRoomMessageCard(item, true);
          }}
        ></FlatList>
      </View>
    );
  }

  RenderAllMyRoomsBySearchedText() {
    return (
      <View>
        <Text style={{ marginLeft: 24, fontWeight: "800", color: "grey" }}>
          BẠN BÈ
        </Text>
        <FlatList
          style={styles.ChatBox}
          alignItems="center"
          data={this.state.filteredFriends}
          renderItem={({ item, index }) => {
            return this.RenderRoomMessageCard(item, true);
          }}
        ></FlatList>

        {
          ///////////////////////////////////////////////////////////////////////////////
        }

        <Text style={{ marginLeft: 24, fontWeight: "800", color: "grey" }}>
          NHÓM
        </Text>
        <FlatList
          style={styles.ChatBox}
          alignItems="center"
          data={this.state.filteredGroups}
          renderItem={({ item, index }) => {
            return this.RenderRoomMessageCard(item, false);
          }}
        ></FlatList>
      </View>
    );
  }

  FilterSearchedRoom(toSearchText) {
    let fr = this.state.listFriends
      .map((friend) => {
        let tempFr = JSON.parse(JSON.stringify(friend));
        tempFr.MatchScore = MatchSearchRoomScore(
          toSearchText,
          friend,
          this.state.listUsers
        );
        return tempFr;
      })
      .filter((friend) => friend.MatchScore !== 0);

    fr.sort((f1, f2) => f1.MatchScore < f2.MatchScore);
    this.setState({ filteredFriends: fr });

    let gr = this.state.listGroups
      .map((group) => {
        let tempGr = JSON.parse(JSON.stringify(group));
        tempGr.MatchScore = MatchSearchRoomScore(
          toSearchText,
          group,
          this.state.listUsers
        );
        return tempGr;
      })
      .filter((group) => group.MatchScore !== 0);

    gr.sort((g1, g2) => g1.MatchScore < g2.MatchScore);
    this.setState({ filteredGroups: gr });

    let str = this.state.listStrangers
      .map((stranger) => {
        let tempStr = JSON.parse(JSON.stringify(stranger));
        tempStr.MatchScore = MatchSearchUserScore(toSearchText, stranger);
        return tempStr;
      })
      .filter((stranger) => stranger.MatchScore !== 0);

    str.sort((s1, s2) => s1.MatchScore < s2.MatchScore);
    this.setState({ filteredStranger: str });
  }

  onChangeSearchText(toSearchText) {
    this.FilterSearchedRoom(toSearchText);
  }

  RenderMyRooms(toSearchText = "") {
    if (toSearchText === "") {
      return this.RenderAllMyRoomsByTime();
    } else {
      return this.RenderAllMyRoomsBySearchedText();
    }
  }
  //comment for new merge
  RenderFindNewFriend(toSearchText = "") {
    return (
      <View>
        <Text style={{ marginLeft: 24, fontWeight: "800", color: "grey" }}>
          TÌM BẠN MỚI
        </Text>
        <FlatList
          style={styles.ChatBox}
          alignItems="center"
          data={this.state.filteredStranger}
          renderItem={({ item, index }) => {
            let title = item.Name;

            if (!title) {
              title = "Người dùng TickNTalk";
            }

            const members = [this.props.loggedInEmail, item.Email];
            const nullRoom = CreateNullRoom(members);

            return (
              <Text>
                <MessageCard
                  ImageSource="https://firebasestorage.googleapis.com/v0/b/chatapp-demo-c52a3.appspot.com/o/Logo.png?alt=media&token=af1ca6b3-9770-445b-b9ef-5f37c305e6b8"
                  Name={title}
                  LastestChat="Nhắn tin để kết bạn!"
                  isRead="true"
                  onPress={() => {
                    this.ChatScreenNav(nullRoom);
                  }}
                ></MessageCard>
              </Text>
            );
          }}
        ></FlatList>
      </View>
    );
  }

  render() {
    return (
      <SafeAreaView style={styles.containerLI}>
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          <View
            style={{
              backgroundColor: colors.lightpink,
              width: "100%",
              alignItems: "center",
            }}
          >
            <View
              style={{ width: "90%" }}
              justifyContent="space-between"
              flexDirection="row"
            >
              <Text style={styles.header}>{this.state.headerText}</Text>
              <ButtonIcon
                MaterialFamilyIconName={this.state.iconName}
                onPress={() => {
                  this.setState({ addNewFriend: !this.state.addNewFriend });
                  if (this.state.addNewFriend) {
                    this.setState({
                      headerText: "Tin nhắn",
                      iconName: "person-add",
                    });
                  } else {
                    this.setState({
                      headerText: "Tìm bạn mới",
                      iconName: "backspace",
                    });
                  }
                }}
                size={30}
                color="whitesmoke"
              />
            </View>
          </View>
          <View
            style={{ flexDirection: "column" }}
            justifyContent="space-between"
          >
            {/* <TextInput style={styles.input}
                      placeholder="Tìm kiếm bạn bè.."
                      // clearButtonMode={Platform.OS === "ios" ? true:false}
                      onChangeText={Text=>{
                        this.onChangeSearchText(Text);
                      }}>
                </TextInput> */}

            <ScrollView style={{ maxHeight: "94%" }}>
              <SearchBar
                platform="ios"
                placeholder="Tìm bạn bè..."
                lightTheme="true"
                containerStyle={{
                  marginHorizontal: 8,
                  backgroundColor: "transparent",
                  width: "95%",
                }}
                inputContainerStyle={{
                  backgroundColor: "whitesmoke",
                  borderRadius: 23,
                }}
                leftIconContainerStyle={{ marginLeft: 16 }}
                inputStyle={{}}
                placeholder="Tìm kiếm bạn bè.."
                onChangeText={(Text) => {
                  this.setState({ toSearchText: Text });
                  this.onChangeSearchText(Text);
                }}
                value={this.state.toSearchText}
              />
              {this.state.addNewFriend
                ? this.RenderFindNewFriend()
                : this.RenderMyRooms(this.state.toSearchText)}
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedInEmail: state.emailReducer,
    memberList: state.memberReducer,
    curRoomID: state.roomReducer,
    nextRoomData: state.roomDataReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    Update: (loggedInEmail) => {
      dispatch(ChangeEmailAction(loggedInEmail));
    },
    UpdateRoomID: (curRoomID) => {
      dispatch(ChangeRoomIDAction(curRoomID));
    },
    ChangeMemberAction: (curMem) => {
      dispatch(ChangeMemberAction(curMem));
    },
    ChangeRoomDataAction: (curRoomData) => {
      dispatch(ChangeRoomDataAction(curRoomData));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ChatFeed);
