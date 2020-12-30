import React, { Component } from "react";
import { View, Text, SafeAreaView } from "react-native";
import {
  MessageCard,
  LoginButton,
  BasicImage,
  styles,
  colors,
} from "../components/Basic/Basic";
export default class ChatScreen extends React.Component {
  state = {};
  SignIn = () => {
    this.props.navigation.replace("SignIn");
  };
  SignUp = () => {
    this.props.navigation.replace("SignUp");
  };
  render() {
    return (
      <SafeAreaView style={styles.containerLI}>
        <View style={{ alignItems: "center" }}>
          <View style={{ marginTop: 32, alignItems: "center" }}>
            <BasicImage icon="false" source={require("../assets/Logo.png")} />
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
