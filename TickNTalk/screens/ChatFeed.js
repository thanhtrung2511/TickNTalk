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
} from "../components/Basic/Basic";
import firebase from "firebase";
import { SearchBar } from "react-native-elements";
import { UserRef, RoomRef } from "../Fire";

import { Card } from "react-native-paper";
import { connect } from "react-redux";
import { ChangeRoomIDAction, ChangeEmailAction } from "../actions/index";

export class ChatFeed extends React.Component {
  state = {
    toSearchText: "",
    listUsers: [],

    listGroups: [],
    listFriends: [],
    listStrangers: [],

    filteredGroups: [],
    filteredFriends: [],
    filteredStranger: [],
  };

  componentDidMount=()=>
  {
    this.FetchChatRooms();
    // this.onChangeSearchText(this.state.toSearchText);
  }
  ChatScreenNav=(id)=>
  {
    // this.props.updateRoomID(id);
    this.props.navigation.navigate("ChatScr");
  };

  Refresh() {
    this.FetchListUsers();
    this.FetchListRooms();
  }

  /// CuteTN Note: a huge violation of SRP
  FetchChatRooms() {
    UserRef.on("value", (snapshot) => {
      // temp list of strangers
      let users = [];

      snapshot.forEach((child) => {
        users.push({
          Email: child.toJSON().Email,
          Phone: child.toJSON().Phone,
          Name: child.toJSON().Name,
        });
      });

      users.sort((x, y) => x.Name.toUpperCase() > y.Name.toUpperCase());

      this.setState({ listUsers: users });
    });

    RoomRef.on("value", (snapshot) => {
      let gr = [];
      let fr = [];

      // list of strangers
      let st = this.state.listUsers.filter(
        (user) =>
          user.Email.toUpperCase() !== this.props.loggedInEmail.toUpperCase()
      );

      snapshot.forEach((child) => {
        let room = {
          RoomID: child.key,
          RoomName: child.toJSON().RoomName,
          CreatedDate: child.toJSON().CreatedDate,
          Members: child.toJSON().Members,
        };

        if (this.CheckRoomContainUser(room, this.props.loggedInEmail)) {
          let memberCnt = this.CountNumberOfMember(room);
          if (memberCnt === 2) {
            // add to friend list
            fr.push(room);
            // remove from stranger
            let email = this.GetFriendEmail(room);
            st = st.filter(
              (user) => user.Email.toUpperCase() !== email.toUpperCase()
            );
          } else gr.push(room);
        }
      });

      this.setState({ listStrangers: st });
      this.setState({ listGroups: gr });
      this.setState({ listFriends: fr });
    });
  }

  GetFriendEmail(friendRoom) {
    let result = friendRoom.Members[0];
    if (result === this.props.loggedInEmail) result = friendRoom.Members[1];

    return result;
  }

  // Remove from stranger list
  RemoveFromStrangers(strangerList, email) {
    if (strangerList === undefined) return [];

    return strangerList.filter(
      (x) => x.Email.toUpperCase() !== email.toUpperCase()
    );
  }

  /// return undefined if not found
  GetUserByEmail(email) {
    return this.state.listUsers.find((user) => user.Email === email);
  }

  CheckRoomContainUser(room, email) {
    let flagFound = false;
    Object.values(room.Members).forEach((e) => {
      if (e === email) {
        flagFound = true;
        return;
      }
    });

    return flagFound;
  }

  CountNumberOfMember(room) {
    return Object.values(room.Members).length;
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
    this.setState({
      filteredFriends: this.state.listFriends,
      filteredGroups: this.state.listGroups,
      filteredStranger: this.state.listStrangers,
    });
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          <View
            style={{ width: "90%" }}
            justifyContent="space-between"
            flexDirection="row"
          >
            <Text style={styles.header}>Tin nhắn</Text>
          </View>
          <View
            style={{ marginTop: 16, flexDirection: "column" }}
            justifyContent="space-between"
          >
            {/* <TextInput style={styles.input}
                      placeholder="Tìm kiếm bạn bè.."
                      // clearButtonMode={Platform.OS === "ios" ? true:false}
                      onChangeText={Text=>{
                        this.onChangeSearchText(Text);
                      }}>
                </TextInput> */}
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

            <ScrollView>
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
                  let title = item.RoomName;
                  let roomId = item.RoomId;

                  // if title is nothing, then get friend's name
                  if (title === "" || title === undefined) {
                    const friendEmail = this.GetFriendEmail(item);
                    const friend = this.GetUserByEmail(friendEmail);

                    if (friend === undefined) title = "Người dùng TickNTalk";
                    else title = friend.Name;
                  }

                  return (
                    <Text>
                      <MessageCard
                        ImageSource="https://firebasestorage.googleapis.com/v0/b/chatapp-demo-c52a3.appspot.com/o/Logo.png?alt=media&token=af1ca6b3-9770-445b-b9ef-5f37c305e6b8"
                        Name={title}
                        LastestChat="chibi so ciu"
                        isRead="true"
                        onPress={() => { this.ChatScreenNav(roomId); }}
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
                  const title = item.RoomName;
                  const roomId = item.RoomID;

                  return (
                    <Text>
                      <MessageCard
                        ImageSource="https://firebasestorage.googleapis.com/v0/b/chatapp-demo-c52a3.appspot.com/o/Logo.png?alt=media&token=af1ca6b3-9770-445b-b9ef-5f37c305e6b8"
                        Name={title}
                        LastestChat="chibi so ciu"
                        isRead="true"
                        onPress={() => {
                          this.ChatScreenNav(roomId);
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

                  if (title === undefined || title === "") {
                    title = "Người dùng TickNTalk";
                  }

                  return (
                    <Text>
                      <MessageCard
                        ImageSource="https://firebasestorage.googleapis.com/v0/b/chatapp-demo-c52a3.appspot.com/o/Logo.png?alt=media&token=af1ca6b3-9770-445b-b9ef-5f37c305e6b8"
                        Name={title}
                        LastestChat="Nhắn tin để kết bạn!"
                        isRead="true"
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
    updateRoomID: (curID) => {
      dispatch(ChangeRoomIDAction(curID));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ChatFeed);
