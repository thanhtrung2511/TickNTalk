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
} from "../components/Basic/Basic";
import firebase from "firebase";
import {
  ChangeEmailAction,
  ChangeNameAction,
  ChangeBirthdayAction,
  ChangePhoneAction,
  ChangeGenderAction,
} from "../actions/index";
import {DataTable} from 'react-native-paper'
import { connect, Provider } from "react-redux";
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
    this.props.navigation.replace("Login");
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
      <SafeAreaView style={styles.containerLI}>
        <View
          style={{ width: "90%" }}
          justifyContent="space-between"
          flexDirection="row"
        >
          <Text style={styles.header}>Thông tin cá nhân</Text>
        </View>

        <View style={{ flexDirection: "column" ,marginTop: 32}} justifyContent="flex-start">
          <View
            style={{
              flexDirection: "row",
              padding: 16,
              justifyContent: "space-between",
              alignItems: "center",
              width: "78%",
              backgroundColor: "whitesmoke",
              borderRadius: 70 / 5,
            }}
          >
            <BasicImage
              source={{
                uri:
                  "https://instagram.fsgn3-1.fna.fbcdn.net/v/t51.2885-19/s150x150/123146532_711576649507850_6303894487975334088_n.jpg?_nc_ht=instagram.fsgn3-1.fna.fbcdn.net&_nc_ohc=RNr9jnrIEykAX9kLF7D&tp=1&oh=916b52756169c6965cd3f764de1f273b&oe=60171A44",
              }}
              icon="true"
            ></BasicImage>
            <View style={{ marginTop: 16, flexDirection: "column" }}>
              <Text style={{ fontWeight: "800" }}>
                Email: {this.props.typedEmail}
              </Text>
              <Text style={{ fontWeight: "800" }}>
                Tên: {this.props.typedName}
              </Text>
              <Text style={{ fontWeight: "800" }}>
                Giới tính: {this.props.typedGender}
              </Text>
              <Text style={{ fontWeight: "800" }}>
                Ngày sinh: {this.props.typedBirthday}
              </Text>
              <Text style={{ fontWeight: "800" }}>
                Số điện thoại: {this.props.typedPhone}
              </Text>
            </View>
          </View>
          <View style={{ alignItems:"center",marginTop:16,height:'50%',flexDirection: "column",justifyContent:"space-around" }}>
          <ButtonMod
            Text="Cập nhật ảnh đại diện"
            onPress={this.ChangeAva}
          ></ButtonMod>
          <ButtonMod Text="Đổi mật khẩu" onPress={this.ChangePass}
          ></ButtonMod>
          <ButtonMod
            Text="Chỉnh sửa thông tin cá nhân"
            onPress={this.ChangeInfo}
          ></ButtonMod>
          <ButtonMod Text="Đăng xuất" onPress={this.LogOut}
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
