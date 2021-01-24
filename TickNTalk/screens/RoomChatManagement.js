import React from "react";
import {
  Text,
  SafeAreaView,
  View,
  FlatList,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import {
  styles,
  ButtonIcon,
  colors,
  ButtonMod,
  MessageCard,
} from "../components/Basic/Basic";
import { ChangeRoomIDAction, ChangeMemberStateAction } from "../actions";
import { connect } from "react-redux";
import { UserRef, RoomRef } from "../Fire";
import { SearchBar, CheckBox } from "react-native-elements";
import { MatchSearchUserScore } from "../Utilities/ChatRoomUtils";

export class RoomChatManagements extends React.Component {
  state = {
    username: "",
    password: "",
    repassword: "",
    Email: "",
    onCreate: false,
    canCreate: false,
    toSearchText: "",
    listUsers: [],
    filteredUsers: [],
  };

  componentDidMount() {
    this.setState({
      onCreate: this.props.curState,
      canCreate: this.props.curState,
    });
    //console.log(this.props.memberList);
    //console.log(this.props.curState);
    if (this.props.curState) this.getUserList(this.props.memberList);
  }
  UpdateMember() {}
  Done() {
    this.props.ChangeMemberState(false);
    this.props.navigation.goBack();
  }
  componentDidUpdate = (previousProp, previousState) => {
    if (
      (previousState.listUsers !== this.state.listUsers) ||
      (previousState.toSearchText !== this.state.toSearchText)|| 
      (previousProp.curRoomID!==this.props.curRoomID)||
       ((previousState.canCreate)&& (!this.state.canCreate)) 
    ) {
      if ((previousState.canCreate)&& (!this.state.canCreate)) {this.ChatScreenNav()}
      this.FilterSearchedUsers(this.state.toSearchText);
    }
  };

  onChangeSearchText(toSearchText) {
    this.FilterSearchedUsers(toSearchText);
  }

  GetSelectedMembersEmail(){
    return this.state.listUsers.filter(user => user.Checked).map(user => user.Data.Email);
  }

  

  // CuteTN
  FilterSearchedUsers(toSearchText) {
    //console.log(JSON.stringify(this.state.listUsers));
    let users = this.state.listUsers
      .map((user) => {
        // let tempUser = JSON.parse(JSON.stringify(user));
        let tempUser = user;
        tempUser.MatchScore = MatchSearchUserScore(toSearchText, user.Data);
        return tempUser;
      })
      .filter((user) => !toSearchText || user.MatchScore !== 0 || user.Checked);

    users.sort((u1, u2) => {
      if (u1.Checked === u2.Checked) return u1.MatchScore < u2.MatchScore;
      else return u1.Checked === false;
    });
    this.setState({ filteredUsers: users });
  }

  createRoomData() {
    this.setState({
      canCreate: false,
      onCreate: false,
    });
    let getCheckedUser = [];
    let tmpList = this.state.listUsers;

    for (var i in tmpList) {
      if (tmpList[i].Checked) {
        getCheckedUser.push(tmpList[i].Data.Email);
      }
    }
    getCheckedUser.push(this.props.loggedInEmail);
    //console.log(getCheckedUser);
    let tempRoom = {};
    tempRoom.Data = {
      CreatedDate: Date.now(),
      Members: getCheckedUser,
      RoomName: this.props.curState?this.props.curRoomID.Data.RoomName: "Nhóm của " + this.props.curName,
      RoomAva: this.props.curState?this.props.curRoomID.Data.RoomAva:"",
    };
    //console.log(tempRoom);
    this.PushAndUseNewRoom(tempRoom);
  }

  ChatScreenNav = (id) => {
    this.props.navigation.replace("ChatScr");
  };

  UpdateRoomMember(){
   
      // 
      //console.log(this.props.curRoomID);
      let members=this.GetSelectedMembersEmail();
      members.push(this.props.loggedInEmail);
      // RoomRef.child(this.props.curRoomID.RoomID).once("value").then(function (snapshot) {
      //   snapshot.forEach(function (childSnapshot) {
      //     childSnapshot.update({
      //       Members:members ,
      //     });
      //   });
      // }).then(result => { this.Done(); });
      RoomRef.child(this.props.curRoomID.RoomID).update({ "Members" : members}).then(result => {this.Done()});
  }
  async PushAndUseNewRoom(newRoom) {
    
      const newRoomDataRef = await RoomRef.push(newRoom.Data);
      //console.log(newRoomDataRef);
      let tempRoom = {
        RoomID: newRoomDataRef.key,
        Data: newRoom.Data,
      };
      await this.props.UpdateRoomID(tempRoom);
      
    
  }

  getUserList(memberList) {
    let userList = [];
    UserRef.on("value", (snapshot) => {
      let users = [];
      let checked = [];
      snapshot.forEach((child) => {
        if (
          this.props.loggedInEmail.toUpperCase() !==
          child.toJSON().Email.toUpperCase()
        )
          users.push({ Data: child.toJSON(), Checked: false });
        checked.push(false);
      });

      users.sort(
        (x, y) => x.Data.Name.toUpperCase() > y.Data.Name.toUpperCase()
      );
      userList = users;
      // this.MyRefresh();
    });
    if (this.props.curState) {
      var tmpList = memberList;
     // console.log(tmpList);
      var tmpArr = userList;
      for (var i in tmpArr)
        for (var j in tmpList)
          if (
            tmpArr[i].Data.Email.toUpperCase() ===
            tmpList[j].email.toUpperCase()
          )
            tmpArr[i].Checked = true;
      userList=tmpArr;
    }
    this.setState({ listUsers: userList });
    // this.renderAllUser();
  }

  renderFilteredUsers() {
    return (
      <View>
        <FlatList
          style={styles.ChatBox}
          contentContainerStyle={{ justifyContent: "space-between" }}
          alignItems="center"
          data={this.state.filteredUsers}
          renderItem={({ item, index }) => {
            return this.renderMessageCard(item);
          }}
        ></FlatList>
      </View>
    );
  }

  checkCanCreate() {
    let tmpArr = this.state.listUsers;
    let checkedCount = 0;
    for (var i in tmpArr) {
      if (tmpArr[i].Checked) {
        checkedCount++;
      }
    }
    this.setState({ canCreate: checkedCount >= 2 });
  }

  changeToggleValue(value, desc) {
    let tmpArr = this.state.listUsers;
    for (var i in tmpArr) {
      if (tmpArr[i].Data.Email === value) {
        tmpArr[i].Checked = desc;
        break; //Stop this loop, we found it!
      }
    }
    this.setState({ listUsers: tmpArr });

    // CuteTN: auto reorder user to the top after ticking...
    this.FilterSearchedUsers(this.state.toSearchText);
  }

  renderMessageCard(user) {
    let userTmp = user.Data;
    let toggle = user.Checked;
    let SystemAva =
      "https://firebasestorage.googleapis.com/v0/b/chatapp-demo-c52a3.appspot.com/o/Logo.png?alt=media&token=af1ca6b3-9770-445b-b9ef-5f37c305e6b8";
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          marginBottom: 8,
        }}
      >
        <CheckBox
          iconRight
          checkedIcon="check-circle"
          uncheckedIcon="circle"
          checked={toggle}
          uncheckedColor={colors.lightpink}
          checkedColor={colors.Darkpink}
          onPress={() => {
            toggle = !toggle;
            this.changeToggleValue(userTmp.Email, toggle);
            this.checkCanCreate();
          }}
        />
        <MessageCard
          containerStyle={{ width: "80%" }}
          LastestChat={toggle ? "Đã chọn vào nhóm" : "Thêm vào nhóm"}
          ImageSource={userTmp.urlAva ? userTmp.urlAva : SystemAva}
          Name={userTmp.Name}
          isRead="true"
          ImageSize={50}
        ></MessageCard>
      </View>
    );
  }

  render() {
    return (
      <SafeAreaView style={styles.containerLI}>
        <KeyboardAvoidingView
          style={[
            styles.container,
            !this.state.onCreate ? { justifyContent: "space-between" } : null,
          ]}
          behavior="auto"
        >
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
              alignItems="center"
            >
              {this.state.onCreate ? (
                <ButtonIcon
                  MaterialFamilyIconName="cancel"
                  color={colors.white}
                  onPress={() =>
                    Alert.alert(
                      "Thông báo",
                      "Bạn có muốn hủy không?",
                      [
                        { text: "Hủy", style: "cancel" },
                        {
                          text: "Đồng ý",
                          onPress: () => {
                            this.setState({
                              onCreate: false,
                              canCreate: false,
                            });
                            if (this.props.curState) {
                              this.Done();
                            }
                          },
                        },
                      ],
                      { cancelable: false }
                    )
                  }
                  size={33}
                />
              ) : null}
              <Text style={styles.header}>
                {!this.props.curState
                  ? this.state.onCreate
                    ? "Tạo nhóm mới"
                    : "Nhóm"
                  : "Cập nhật nhóm"}
              </Text>
              {this.state.canCreate ? (
                <ButtonIcon
                  MaterialFamilyIconName="check-circle"
                  color={colors.Darkpink}
                  onPress={() =>
                    Alert.alert(
                      "Thông báo",
                      "Bạn có muốn cập nhật nhóm không?",
                      [
                        { text: "Hủy", style: "cancel" },
                        {
                          text: "Đồng ý",
                          onPress: () => {
                            
                            (!this.props.curState)?this.createRoomData():this.UpdateRoomMember()
                          },
                        },
                      ],
                      { cancelable: false }
                    )
                  }
                  size={33}
                />
              ) : null}
            </View>
          </View>
          {this.state.onCreate ? (
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
                  placeholder="Tìm kiếm nhóm.."
                  onChangeText={(Text) => {
                    this.setState({ toSearchText: Text });
                    this.onChangeSearchText(Text);
                  }}
                  value={this.state.toSearchText}
                />
                {this.renderFilteredUsers()}
              </ScrollView>
            </View>
          ) : (
            <View
              style={{ flexDirection: "column", height: 100 }}
              alignItems="center"
              justifyContent="space-around"
            >
              <Text>Tạo nhóm mới</Text>
              <Text>Để có thêm nhiều điều thú vị</Text>
              <ButtonMod
                Text="Tạo nhóm mới"
                onPress={() => {
                  this.setState({ onCreate: true }), this.getUserList();
                }}
              ></ButtonMod>
            </View>
          )}
          <View></View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedInEmail: state.emailReducer,
    curRoomID: state.roomReducer,
    memberList: state.memberReducer,
    curName: state.nameReducer,
    curState: state.memberStateReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    UpdateRoomID: (curRoomID) => {
      dispatch(ChangeRoomIDAction(curRoomID));
    },
    ChangeMemberState: (member) => {
      dispatch(ChangeMemberStateAction(member));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RoomChatManagements);
