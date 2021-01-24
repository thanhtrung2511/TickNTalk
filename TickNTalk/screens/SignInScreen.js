import React, { Component } from "react";
import {
  Text,
  TextInput,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import {
  styles,
  BasicImage,
  LoginBottom,
  sizeFactor,
  createOneButtonAlert,
} from "../components/Basic/Basic";
import {UserRef} from "../Fire";
//import { GoogleSignin } from "react-native-google-signin";
import firebase from "firebase";
import GoogleSignin from 'expo';

import {
  ChangeEmailAction,
  ChangeNameAction,
  ChangeBirthdayAction,
  ChangePhoneAction,
  ChangeGenderAction,
  ChangeAvaAction,
} from "../actions/index";
import { connect } from "react-redux";

export class SignInScreen extends React.Component {
  constructor(props) {
    super(props);
    this.unsubscriber = null;
    this.state = {
      //isAuthenticated:false,
      typedPassword: "",
      //user:null,
      showError: false,
    };
  }
  SignInWithEmailAndPassword = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(
        this.props.typedEmail,
        this.state.typedPassword
      )
      .then((loggedInUser) => {
        this.SignInContinue();
      })
      .catch((error) => {
        console.error(error);
        createOneButtonAlert({
          Text: "Tên đăng nhập hoặc mật khẩu không đúng",
          TextAction: "Thử lại",
        });
      });
  };
  SignInWithGoogle = async () => {
    try {
      const result = await GoogleSignin.logInAsync({
        androidClientId:
          "940541027502-t7ea2uq69ckasdjbh7e86ev4roac5ajq.apps.googleusercontent.com",
        behavior: "web",
        iosClientId:
          "940541027502-aferp9bdbjs01ln667sn6jk163vddnh8.apps.googleusercontent.com",
        scopes: ["profile", "email"],
      });

      if (result.type === "success") {
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  };
  getRedux(){
    var nameTmp = "";
    var birthdayTmp = "";
    var phoneTmp = "";
    var genderTmp = "";
    var tmpuri = "";
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
          //console.log(element.toJSON ().urlAva);
          tmpuri = element.toJSON().urlAva;
          this.props.ChangeAvaAction(tmpuri);
        });
      });
  }
  SignInContinue = () => {
    this.getRedux();
    this.props.navigation.replace("Dashboard");
  };
  SignUp = () => {
    this.props.navigation.replace("SignUp");
  };
  componentDidMount = () => {
  };
  render() {
    return (
      <SafeAreaView style={styles.containerLI}>
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          <View style={{ alignItems: "center" }}>
            <BasicImage Icon={200} source={require("../assets/images/Logo.png")} />
            <Text style={styles.hello}>Đăng nhập tài khoản của bạn</Text>
            <View style={{ alignItems: "center" }} justifyContent="center">
              <TextInput
                style={styles.input}
                placeholder="Tên tài khoản"
                keyboardType="email-address"
                onChangeText={(Email) => {
                  this.props.Update(Email);
                  this.setState({ showError: false, typedPassword: "" });
                }}
                value={this.props.typedEmail}
              />
              <TextInput
                style={styles.input}
                secureTextEntry={true}
                placeholder="Mật khẩu"
                onChangeText={(typedPassword) => {
                  this.setState({ typedPassword });
                  this.setState({ showError: false });
                }}
                value={this.state.password}
              />
<TouchableOpacity onPress={()=>{this.props.navigation.navigate('ResetPass')}}>
              <Text style={styles.FogetPassword}>Quên mật khẩu?</Text>
              </TouchableOpacity>
            </View>
            <View style={{ marginTop: sizeFactor * 2.1 }}>
              <LoginBottom
                OnPressNormal={this.SignInWithEmailAndPassword}
                OnPressGoogle={async ()=>{this.SignInWithGoogle();}}
                TextNormal="Đăng nhập"
                TextGoogle="Đăng nhập với Google"
                TextStatic="Bạn chưa có tài khoản?"
                TextNav="Đăng ký tại đây"
                Sign={this.SignUp}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}
function mapStateToProps(state) {
  return {
    typedEmail: state.emailReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    Update: (typedEmail) => {
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

    ChangeAvaAction: (uriAva) => {
      dispatch(ChangeAvaAction(uriAva));
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(SignInScreen);
