import React, { Component } from "react";
import {
  Text,
  TextInput,
  View,
  FlatList,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { EvilIcons } from "@expo/vector-icons";
import {
  styles,
  MessageCard,
  windowHeight,
  sizeFactor,
  colors,
} from "../components/Basic/Basic";
import firebase from "firebase";
import { SearchBar } from "react-native-elements";
import { UserRef, RoomRef, MessageRef } from "../Fire";

import { Card } from "react-native-paper";
import { connect } from "react-redux";
import { ChangeRoomIDAction, ChangeEmailAction } from "../actions/index";

import {
  GetFriendEmail, 
  GetUserByEmail,
  CheckRoomContainUser,
  CountNumberOfMembers,
  CreateNullRoom,
  LoadLatestMessagesIntoRooms,
} from "../Utilities/ChatRoomUtils";

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
  };

  componentDidMount=()=>
  {
    this.SubscribeDb();
    // this.onChangeSearchText(this.state.toSearchText);
  }
  ChatScreenNav=(id)=>
  {
    this.props.UpdateRoomID(id);
    this.props.navigation.navigate("ChatScr");
  }

  componentDidUpdate = (previousProp, previousState)=>{
    if(
      previousState.listMessages !== this.state.listMessages ||
      previousState.listRooms !== this.state.listRooms ||
      previousState.listUsers !== this.state.listUsers 
      )
    {
      this.MyRefresh();
    }
  }

  SubscribeDb() {
    UserRef.on("value", (snapshot) => {
      let users = [];

      snapshot.forEach((child) => {
        users.push(child.toJSON())
      });

      users.sort((x, y) => x.Name.toUpperCase() > y.Name.toUpperCase());

      this.setState({ listUsers: users });
      // this.MyRefresh();
    });

    RoomRef.on("value", (snapshot) => {
      let rooms = [];

      snapshot.forEach((child) => {
        const Data = child.toJSON();
        let room = {
          RoomID: child.key,
          Data,
        };

        rooms.push(room);
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
    LoadLatestMessagesIntoRooms(tempRooms, tempMsgs);

    this.ArrangeChatRooms();
    this.FilterSearchedRoom();
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

    Object.values(this.state.listRooms).forEach((room)=>{
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
    })

    this.setState({ listStrangers: st });
    this.setState({ listGroups: gr });
    this.setState({ listFriends: fr });
  }

  // Remove from stranger list
  RemoveFromStrangers(strangerList, email) {
    if (strangerList === undefined) return [];

    return strangerList.filter(
      (x) => x.Email.toUpperCase() !== email.toUpperCase()
    );
  }

  /*
    FetchListRooms()
    {
      RoomRef.on(
        'value',
        (snapshot) => {
          var li = [];     
          var fr = [];

          snapshot.forEach( (child) => {
            li.push({
              RoomName: child.toJSON().RoomName,
              CreatedDate: child.toJSON().CreatedDate,
              Members: child.toJSON().Members,
            });
          })
          
          this.setState({listRooms: li});
        }
      )
    }

    FetchListUsers()
    {
      UserRef.on(
        (snapshot) => {
          var li = [];     

          snapshot.forEach( (child) => {
            li.push({
              Email: child.toJSON().Email,
              Phone: child.toJSON().Phone,
              fullName: child.toJSON().fullName,
            });
          })
          
          li.sort((x,y) => (x.fullName.toUpperCase() > y.fullName.toUpperCase())); 

          this.setState({listUsers: li});
        }
      )
    }

    isMatchedRoom(room, toSearchText)
    {
      // if this room does not contain the logged in user
      if(Object.values(room.Members).find(x => x === this.props.loggedInEmail) === undefined)
        return false;

      // check by roomname first
      if(room.RoomName.toUpperCase().includes(toSearchText.toUpperCase()) === true)
        return true;

      var result = false;

      // check if the room has the searched username or email
      Object.values(room.Members).forEach((email) => {
        if(email != this.props.loggedInEmail)
        {
          // foreach user ref, find the ones that matched the email or username
          if(email.toUpperCase().includes(toSearchText.toUpperCase()))
            result = true;

          // CuteTN todo: check user name later maybe
        }
      });
      
      return result;
    }
*/

  FilterSearchedRoom(toSearchText = "")
  {
    this.setState({
      filteredFriends: this.state.listFriends,
      filteredGroups: this.state.listGroups,
      filteredStranger: this.state.listStrangers,
    });
  }

  onChangeSearchText(toSearchText) {
    // // this.state.filteredRooms =  this.state.listRooms.filter(this.isMatchedRoom);
    // let li = [];

    // this.state.listRooms.forEach((room) => {
    //   let matched = this.isMatchedRoom(room, toSearchText);

    //   if(matched)
    //   {
    //     li.push(room);
    //   }
    // });

    // li.sort((x,y) => (x.RoomName.toUpperCase() > y.RoomName.toUpperCase()));

    // this.setState({filteredRooms: li});
    this.FilterSearchedRoom(toSearchText);
  }

  render() {
    return (
      <SafeAreaView style={styles.containerLI}>
        <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={{ backgroundColor: colors.lightpink,width:"100%",alignItems:"center" }}>
          <View
            style={{ width: "90%" }}
            justifyContent="space-between"
            flexDirection="row"
          >
            <Text style={styles.header}>Tin nhắn</Text>
          </View>
          </View>
          <View
            style={{flexDirection: "column" }}
            justifyContent="space-between"
          >
            {/* <TextInput style={styles.input}
                      placeholder="Tìm kiếm bạn bè.."
                      // clearButtonMode={Platform.OS === "ios" ? true:false}
                      onChangeText={Text=>{
                        this.onChangeSearchText(Text);
                      }}>
                </TextInput> */}
            

            <ScrollView style={{maxHeight:"92%"}}>
            <SearchBar
              platform={Platform.OS}
              placeholder="Tìm bạn bè..."
              lightTheme="true"
              containerStyle={{
                marginHorizontal: 8,
                backgroundColor: "transparent",
                width: "100%"
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
              <Text
                style={{ marginLeft: 24, fontWeight: "800", color: "grey" }}
              >
                BẠN BÈ
              </Text>
              <FlatList
                style={styles.ChatBox}
                alignItems="center"
                data={this.state.filteredFriends}
                renderItem={({ item, index }) => {
                  let title = item.Data.RoomName;
                  let roomId = item.RoomID;
                  
                  let latestMsgText = "";
                  if(item.LatestMessage)
                    latestMsgText = item.LatestMessage.Data.text;

                  // if title is nothing, then get friend's name
                  if (!title) {
                    const friendEmail = GetFriendEmail(item, this.props.loggedInEmail);
                    const friend = GetUserByEmail(this.state.listUsers, friendEmail);

                    if (!friend) title = "Người dùng TickNTalk";
                    else title = friend.Name;
                  }

                  return (
                    <Text>
                      <MessageCard
                        ImageSource="https://firebasestorage.googleapis.com/v0/b/chatapp-demo-c52a3.appspot.com/o/Logo.png?alt=media&token=af1ca6b3-9770-445b-b9ef-5f37c305e6b8"
                        Name={title}
                        LastestChat={latestMsgText}
                        isRead="true"
                        onPress={() => { this.ChatScreenNav(item); }}
                      ></MessageCard>
                    </Text>
                  );
                }}
              ></FlatList>

              {
                ///////////////////////////////////////////////////////////////////////////////
              }

              <Text
                style={{ marginLeft: 24, fontWeight: "800", color: "grey" }}
              >
                NHÓM
              </Text>
              <FlatList
                style={styles.ChatBox}
                alignItems="center"
                data={this.state.filteredGroups}
                renderItem={({ item, index }) => {
                  const title = item.Data.RoomName;
                  const roomId = item.RoomID;

                  return (
                    <Text>
                      <MessageCard
                        ImageSource="https://firebasestorage.googleapis.com/v0/b/chatapp-demo-c52a3.appspot.com/o/Logo.png?alt=media&token=af1ca6b3-9770-445b-b9ef-5f37c305e6b8"
                        Name={title}
                        LastestChat="chibi so ciu"
                        isRead="true"
                        onPress={() => {
                          this.ChatScreenNav(item);
                        }}
                      ></MessageCard>
                    </Text>
                  );
                }}
              ></FlatList>

              {
                ///////////////////////////////////////////////////////////////////////////////
              }

              <Text
                style={{ marginLeft: 24, fontWeight: "800", color: "grey" }}
              >
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
    curRoomID: state.roomReducer,
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
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ChatFeed);
