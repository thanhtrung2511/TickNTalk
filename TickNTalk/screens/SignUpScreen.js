import React from "react";
import {

  SafeAreaView,
  Text,
  TextInput,
  View,

  KeyboardAvoidingView,
 
} from "react-native";
import firebase from "firebase";
import { UserRef } from "../Fire";
import {
  styles,
  BasicImage,
  LoginBottom,
  createOneButtonAlert,
  sizeFactor,
} from "../components/Basic/Basic";
import { connect } from "react-redux";
import {ChangeEmailAction} from "../actions/index"

export class SignUpScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      typedPassword: "",
      typedRepassword: "",
      typedPhone: "",
      typedName: "",
      user: null,
      showError: " ",
      canCreateAccount: false,
      SignUpColor: "red",
    };
  }

  SignUpCont = () => {
    this.ResetFields();
    this.props.navigation.replace("SignUpCont");
  };
  SignIn = () => {
    //this.ResetFields ();
    this.props.navigation.replace("SignIn");
  };
  ResetFields = () => {
    this.setState({
      typedPassword: "",
      typedRepassword: "",

      user: null,
      showError: " ",
      canCreateAccount: false,
      SignUpColor: "red",
      //typedBirthday:'09/01/1997',
    });
    this.props.Update("");
  };

  AddUserToDatabase = () => {
    UserRef.push({
      Name: "",
      Phone: "",
      Email: this.props.typedEmail,
      Gender: "",
      Birthday: "",
      urlAva: "",
    });
    this.SignUpCont();
  };

  SignUpWithEmailAndPassword = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(
        this.props.typedEmail,
        this.state.typedPassword
      )
      .then((resp) => {
        createOneButtonAlert({
          Text: "Đã tạo tài khoản thành công",
          onPress: this.AddUserToDatabase(),
          TextAction:"Xác nhận"
        });
      })
      .catch((error) => {
        if (error != null) createOneButtonAlert({ Text: "Email này đã được sử dụng", TextAction:"Thử lại" });
      });
  };
  CheckAccount = () => {
    if (
      this.state.typedEmail != "" &&
      this.state.typedPassword != "" &&
      this.state.typedRepassword != ""
    ) {
      this.state.typedPassword.toString() !==
      this.state.typedRepassword.toString()
        ? createOneButtonAlert({ Text: "Mật khẩu nhập lại không đúng" ,TextAction:"Thử lại" ,onPress:this.ResetFields()})
        : this.setState({ canCreateAccount: true });
    } else createOneButtonAlert({ Text: "Chưa điền đầy đủ thông tin" , TextAction:"Thử lại"});
    if (this.state.canCreateAccount) {
      this.SignUpWithEmailAndPassword();
    }
  };
  render() {
    return (
      <SafeAreaView style={styles.containerLI}>
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          <View style={{ alignItems: "center" }}>
            <View style={{ alignItems: "center" }} justifyContent="center">
              <BasicImage Icon={200} source={require("../assets/Logo.png")} />
              <Text style={styles.hello}>Đăng ký tài khoản mới</Text>
              <TextInput
                style={styles.input}
                secureTextEntry={false}
                keyboardType="email-address"
                placeholder="Email"
                onChangeText={(typedEmail) => {
                  this.props.Update(typedEmail);
                }}
                value={this.props.typedEmail}
              />
              <TextInput
                style={styles.input}
                secureTextEntry={true}
                placeholder="Mật khẩu"
                onChangeText={(typedPassword) => {
                  this.setState({ typedPassword });
                  this.setState({ showError: " " });
                }}
                value={this.state.typedPassword}
              />

              <TextInput
                style={styles.input}
                secureTextEntry={true}
                placeholder="Nhập lại mật khẩu"
                onChangeText={(typedRepassword) => {
                  this.setState({ typedRepassword });
                  this.setState({ showError: " " });
                }}
                value={this.state.typedRepassword}
              />

              <Text style={{ color: this.state.SignUpColor }}>
                {this.state.showError}
              </Text>
            </View>
            <View style={{ marginTop:sizeFactor*1.7}}>
            <LoginBottom
              OnPressNormal={this.CheckAccount}
              OnPressGoogle={this.SignUpWithGoogle}
              TextNormal="Tiếp tục"
              TextGoogle="Đăng ký với Google"
              TextStatic="Bạn đã có tài khoản?"
              TextNav="Đăng nhập tại đây"
              Sign={this.SignIn}
            />
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    typedEmail: state.emailReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    Update: (typedEmail) => {
      dispatch(ChangeEmailAction(typedEmail));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen);
