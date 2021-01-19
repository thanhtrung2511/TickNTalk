import React, { Component } from "react";
import { View, Text, SafeAreaView } from "react-native";
import {
  MessageCard,
  LoginButton,
  BasicImage,
  styles,
  colors,
} from "../components/Basic/Basic";
import firebase from "firebase";
import {connect} from "react-redux"
import {ChangeEmailAction} from "../actions/index"

export class LoginScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      authenticated: false,
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        
        this.setState({ loading: false, authenticated: true });
        this.props.Update(user.email);
      } else {
        
        this.setState({ loading: false, authenticated: false });
      }
    });
  }
  
  state = {};
  SignIn = () => {
    this.props.navigation.replace("SignIn");
  };
  SignUp = () => {
    this.props.navigation.replace("SignUp");
  };
  Dashboard = () => {
    this.props.navigation.replace("Dashboard");
  }
  componentDidUpdate(){

    if (this.state.authenticated) this.Dashboard();
  }
  render() {
    if (this.state.loading) return null; // Render loading/splash screen etc

    return (
      <SafeAreaView style={[styles.containerLI,{backgroundColor: "whitesmoke"}]}>
        <View style={{ alignItems: "center" }}>
          <View style={{ marginTop: 32, alignItems: "center" }}>
            <BasicImage Icon={200} source={require("../assets/Logo.png")} />
            <Text style={styles.headerLI}>TICKnTALK</Text>
          </View>
          <View style={{ alignItems: "center", paddingTop: 64 }}>
            <LoginButton onPress={this.SignIn} Text="Đăng nhập" />
            <LoginButton
              onPress={this.SignUp}
              style={{ backgroundColor: colors.pink }}
              styleText={{ color: colors.white }}
              Text="Đăng ký"
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
const mapStateToProps = (state) => {
  return{
      typedEmail: state.emailReducer,
  }
};

const mapDispatchToProps = (dispatch) =>{
  return {
      Update: (typedEmail) => {
        dispatch(ChangeEmailAction(typedEmail));
      },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);