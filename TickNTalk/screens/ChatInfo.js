import React, { Component } from "react";
import {
  Text,
  TextInput,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import {
  SafeAreaView,
  NavigationContainer,
} from "react-native-safe-area-context";
import { EvilIcons } from "@expo/vector-icons";
// import styles from '../screens/components/profile/Styles';
import {
  styles,
  ButtonIcon,
  BasicImage,
  ButtonMod,
  colors,
  sizeFactor,
  windowWidth,
} from "../components/Basic/Basic";
import {GetFriendEmail} from "../Utilities/ChatRoomUtils"
import firebase from "firebase";
import {
  ChangeEmailAction,
  ChangeNameAction,
  ChangeBirthdayAction,
  ChangePhoneAction,
  ChangeGenderAction,
  ChangeAvaAction,
} from "../actions/index";
import { connect, Provider } from "react-redux";
import { UserRef } from "../Fire";

export class ChatInfo extends React.Component {
  constructor(props) {
    super(props);
    this.unsubscriber = null;
    this.state={
        friend: { name: "", ava: "" ,age:"",gender:"",},
    };
  }

  ChangePass = () => {
    this.props.navigation.navigate("ChangePass");
  };

  ChangeAva = () => {
    this.props.navigation.navigate("Avatar");
  };
  ResetRedux=()=>{
    this.props.ChangeNameAction (""); 
    this.props.ChangeBirthdayAction ("");
    this.props.ChangePhoneAction("");
    this.props.ChangeGenderAction("");
    this.props.ChangeAvaAction("");
  }
  LogOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
        this.ResetRedux();
        this.props.navigation.replace("Login");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  ChangeInfo = () => {
    this.props.navigation.navigate("EditMyInfo");
  };
  getFriend=() =>{
    var nameTmp = "";
    var avaTmp = "";
    var genderTmp = "";
    var ageTmp="";
    UserRef.orderByChild("Email")
      .equalTo(GetFriendEmail(this.props.curRoom, this.props.loggedInEmail))
      .on("value", (snap) => {
        snap.forEach((element) => {
          nameTmp = element.toJSON().Name;
          genderTmp = element.toJSON().Gender;
          ageTmp = element.toJSON().Birthday;
          avaTmp = element.toJSON().urlAva;
          this.setState({ friend: { name: nameTmp, ava: avaTmp ,age:ageTmp,gender:genderTmp,} });
        });
      });
  }

  componentDidMount() {
    this.getFriend();
  }
  goBack=()=>{
    this.props.navigation.goBack();
  }
  render() {
    return (
      <SafeAreaView style={[styles.containerLI]}>
        <View style={styles.container}>
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
                <ButtonIcon MaterialFamilyIconName="arrow-back" size={33} color={colors.black} onPress={this.goBack}/>
            </View>
          </View>
          <View
            style={{
              flexDirection: "column",
              width: "100%",
              paddingVertical: 8,
            }}
            justifyContent="space-between"
            alignItems="center"
            backgroundColor={colors.lightpink}
          >
            <View
              style={{
                flexDirection: "column",
                padding: 8,
                justifyContent: "space-around",
                backgroundColor: colors.white,
                borderRadius: 70 / 5,
                width: "90%",
              }}
            >
              <View alignItems="center">
                
                  <BasicImage
                    //style={{ borderColor: "whitesmoke", borderWidth: 5 }}
                    source={{ uri: this.state.friend.ava?this.state.friend.ava: "https://firebasestorage.googleapis.com/v0/b/chatapp-demo-c52a3.appspot.com/o/Logo.png?alt=media&token=af1ca6b3-9770-445b-b9ef-5f37c305e6b8"}}
                    Icon={150}
                    Round={100}
                  ></BasicImage>
                
              </View>
              <View
                style={{
                  borderColor: colors.lightpink,
                  borderWidth: 2,
                  borderRadius:70/5,
                  flexDirection: "column",
                  paddingVertical: 8,
                  paddingHorizontal: 16,
                  justifyContent: "space-around",
                  shadowOffset:{ width:1, height:1},
                  shadowOpacity: 0.2,
                  borderStyle:"solid",
                }}
              >
                
                <View
                  style={{ paddingVertical: 8 }}
                  justifyContent="space-between"
                  flexDirection="row"
                >
                  <Text style={{ fontSize: 16, fontWeight: "800" }}>Họ tên:</Text>
                  <Text style={{ fontSize: 16, fontWeight: "600" }}>
                    {this.state.friend.name}
                  </Text>
                </View>
                <View
                  style={{ paddingVertical: 8 }}
                  justifyContent="space-between"
                  flexDirection="row"
                >
                  <Text style={{ fontSize: 16, fontWeight: "800" }}>
                    Giới tính:
                  </Text>
                  <Text style={{ fontSize: 16, fontWeight: "600" }}>
                    {this.state.friend.gender}
                  </Text>
                </View>
                <View
                  style={{ paddingVertical: 8 }}
                  justifyContent="space-between"
                  flexDirection="row"
                >
                  <Text style={{ fontSize: 16, fontWeight: "800" }}>
                    Ngày sinh:
                  </Text>
                  <Text style={{ fontSize: 16, fontWeight: "600" }}>
                    {this.state.friend.age}
                  </Text>
                </View>
                
              </View>
            </View>
          </View>
          <View
            style={{
              alignItems: "center",
              height: "30%",
              flexDirection: "column",
              justifyContent: "space-around",
              width: "100%",
            }}
          >
            <ButtonMod
              styleText={{ color: colors.white }}
              Text="Chỉnh sửa thông tin cá nhân"
              onPress={this.ChangeInfo}
            ></ButtonMod>
            <ButtonMod
              styleText={{ color: colors.white }}
              Text="Đổi mật khẩu"
              onPress={this.ChangePass}
            ></ButtonMod>
            <ButtonMod
              styleText={{ color: colors.white }}
              styleContainer={{ backgroundColor: colors.Darkpink }}
              Text="Đăng xuất"
              onPress={this.LogOut}
            ></ButtonMod>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
function mapStateToProps(state) {
  return {
    loggedInEmail: state.emailReducer,
    curRoom: state.roomReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ChangeEmailAction: (typedEmail) => {
      dispatch(ChangeEmailAction(typedEmail));
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ChatInfo);
