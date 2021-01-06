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
import firebase from "firebase";
import {
  ChangeEmailAction,
  ChangeNameAction,
  ChangeBirthdayAction,
  ChangePhoneAction,
  ChangeGenderAction,
} from "../actions/index";
import { DataTable } from "react-native-paper";
import { connect } from "react-redux";
import { UserRef } from "../Fire";

export class PersonalInFo extends React.Component {
  constructor(props) {
    super(props);
    this.unsubscriber = null;
  }

  ChangePass = () => {
    this.props.navigation.navigate("ChangePass");
  };

  ChangeAva = () => {
    this.props.navigation.navigate("Avatar");
  };

  LogOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
        this.props.navigation.replace("Login");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  ChangeInfo = () => {
    this.props.navigation.navigate("EditMyInfo");
  };

  componentDidMount() {
    var nameTmp = "";
    var birthdayTmp = "";
    var phoneTmp = "";
    var genderTmp = "";
    UserRef.orderByChild("Email")
      .equalTo(this.props.typedEmail)
      .on("value", (snap) => {
        snap.forEach((element) => {
          nameTmp = element.toJSON().Name;
          this.props.ChangeNameAction(nameTmp);
          genderTmp = element.toJSON().Gender;
          this.props.ChangeGenderAction(genderTmp);
          birthdayTmp = element.toJSON().Birthday;
          this.props.ChangeBirthdayAction(birthdayTmp);
          phoneTmp = element.toJSON().Phone;
          this.props.ChangePhoneAction(phoneTmp);
        });
      });
  }

  render() {
    return (
      <SafeAreaView style={[styles.containerLI]}>
        <View style={styles.container}>
          <View style={{ backgroundColor: colors.lightpink,width:"100%",alignItems:"center" }}>
          <View
            style={{ width: "90%" }}
            justifyContent="space-between"
            flexDirection="row"
          >
            <Text style={styles.header}>Thông tin cá nhân</Text>
          </View>
          </View>
          <View
            style={{ flexDirection: "column", width: "100%" ,paddingVertical:16}}
            justifyContent="space-around"
            alignItems="center"
            backgroundColor={colors.lightpink}
            
          >
            
            <View
              style={{
                flexDirection: "column",
                padding: 8,
                justifyContent: "flex-start",
                backgroundColor: "whitesmoke",
                borderRadius: 70 / 5,
                width: "90%",
              
              }}
            >
              <View alignItems="center">
              <BasicImage
              source={{
                uri:
                  "https://instagram.fsgn3-1.fna.fbcdn.net/v/t51.2885-19/s150x150/123146532_711576649507850_6303894487975334088_n.jpg?_nc_ht=instagram.fsgn3-1.fna.fbcdn.net&_nc_ohc=RNr9jnrIEykAX9kLF7D&tp=1&oh=916b52756169c6965cd3f764de1f273b&oe=60171A44",
              }}
              Icon={150}
              Round={100}
            ></BasicImage>
            </View>
              <View
                style={{
                  flexDirection: "column",
                  paddingVertical: 8,
                  paddingHorizontal: 16,
                  justifyContent: "space-around",
                }}
              >
                <View justifyContent="space-between" flexDirection="row">
                  <Text style={{fontSize:16, fontWeight: "800" }}>Email:</Text>
                  <Text style={{ fontSize:16, fontWeight: "400" }}>
                    {this.props.typedEmail}
                  </Text>
                </View>
                <View justifyContent="space-between" flexDirection="row">
                  <Text style={{ fontSize:16, fontWeight: "800" }}>Tên:</Text>
                  <Text style={{ fontSize:16, fontWeight: "400" }}>
                    {this.props.typedName}
                  </Text>
                </View>
                <View justifyContent="space-between" flexDirection="row">
                  <Text style={{ fontSize:16, fontWeight: "800" }}>Giới tính:</Text>
                  <Text style={{ fontSize:16, fontWeight: "400" }}>
                    {this.props.typedGender}
                  </Text>
                </View>
                <View justifyContent="space-between" flexDirection="row">
                  <Text style={{ fontSize:16, fontWeight: "800" }}>Ngày sinh:</Text>
                  <Text style={{ fontSize:16, fontWeight: "400" }}>
                    {this.props.typedBirthday}
                  </Text>
                </View>
                <View justifyContent="space-between" flexDirection="row">
                  <Text style={{ fontSize:16, fontWeight: "800" }}>Số điện thoại:</Text>
                  <Text style={{ ffontSize:16, ontWeight: "400" }}>
                    {this.props.typedPhone}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View
              style={{
                alignItems: "center",
                height: "40%",
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
                Text="Cập nhật ảnh đại diện"
                onPress={this.ChangeAva}
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
    typedEmail: state.emailReducer,
    typedName: state.nameReducer,
    typedBirthday: state.birthdayReducer,
    typedPhone: state.phoneReducer,
    typedGender: state.genderReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ChangeEmailAction: (typedEmail) => {
      dispatch(ChangeEmailAction(typedEmail));
    },

    ChangeNameAction: (typedName) => {
      dispatch(ChangeNameAction(typedName));
    },

    ChangeBirthdayAction: (typedBirthday) => {
      dispatch(ChangeBirthdayAction(typedBirthday));
    },

    ChangePhoneAction: (typedPhone) => {
      dispatch(ChangePhoneAction(typedPhone));
    },

    ChangeGenderAction: (typedGender) => {
      dispatch(ChangeGenderAction(typedGender));
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(PersonalInFo);
