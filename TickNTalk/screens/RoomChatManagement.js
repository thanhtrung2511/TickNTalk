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
import { ChangeRoomIDAction } from "../actions";
import { connect } from "react-redux";
import { UserRef,RoomRef} from "../Fire";
import { SearchBar, CheckBox } from "react-native-elements";

export class RoomChatManagements extends React.Component {
  state = {
    username: "",
    password: "",
    repassword: "",
    Email: "",
    onCreate: false,
    canCreate: false,
    listUsers: [],
  };
  createRoomData() {
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
      RoomName: "Nhóm của " + this.props.curName,
      RoomAva:"",
    };
    //console.log(tempRoom);
   this.PushAndUseNewRoom(tempRoom);
  }
  ChatScreenNav = (id) => {
    //console.log(id);
    this.props.navigation.navigate("ChatScr");
  };

  async PushAndUseNewRoom(newRoom) {
    const newRoomDataRef = await RoomRef.push(newRoom.Data);
    console.log(newRoomDataRef);
    let tempRoom = {
      RoomID: newRoomDataRef.key,
      Data: newRoom.Data,
    };

    await this.props.UpdateRoomID(tempRoom);
    this.ChatScreenNav(tempRoom);
  }
  getUserList() {
    UserRef.on("value", (snapshot) => {
      let users = [];
      let checked = [];
      snapshot.forEach((child) => {
        if (this.props.loggedInEmail!==child.toJSON().Email)
        users.push({ Data: child.toJSON(), Checked: false });
        checked.push(false);
      });

      users.sort(
        (x, y) => x.Data.Name.toUpperCase() > y.Data.Name.toUpperCase()
      );

      this.setState({ listUsers: users });
      // this.MyRefresh();
    });
    this.renderAllUser();
  }
  renderAllUser() {
    return (
      <View>
        <FlatList
          style={styles.ChatBox}
          contentContainerStyle={{ justifyContent: "space-between" }}
          alignItems="center"
          data={this.state.listUsers}
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
          LastestChat={toggle?"Đã chọn vào nhóm":"Thêm vào nhóm"}

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
                      "Bạn có muốn hủy tạo phòng không?",
                      [
                        { text: "Hủy", style: "cancel" },
                        {
                          text: "Đồng ý",
                          onPress: () =>
                            this.setState({
                              onCreate: false,
                              canCreate: false,
                            }),
                        },
                      ],
                      { cancelable: false }
                    )
                  }
                  size={33}
                />
              ) : null}
              <Text style={styles.header}>
                {this.state.onCreate ? "Tạo nhóm mới" : "Nhóm"}{" "}
              </Text>
              {this.state.canCreate ? (
                <ButtonIcon
                  MaterialFamilyIconName="check-circle"
                  color={colors.Darkpink}
                  onPress={() =>
                    Alert.alert(
                      "Thông báo",
                      "Bạn có muốn tạo phòng không?",
                      [
                        { text: "Hủy", style: "cancel" },
                        {
                          text: "Đồng ý",
                          onPress: () => {
                            this.setState({
                              canCreate: false,
                              onCreate: false,
                            });
                            this.createRoomData();
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
                {this.renderAllUser()}
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
    curName: state.nameReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    UpdateRoomID: (curRoomID) => {
      dispatch(ChangeRoomIDAction(curRoomID));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RoomChatManagements);
