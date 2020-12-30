import React, { Component, useState } from "react";
import {
  Text,
  TextInput,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Button,KeyboardAvoidingView
} from "react-native";
import {
  SafeAreaView,
  NavigationContainer,
} from "react-native-safe-area-context";
import { EvilIcons } from "@expo/vector-icons";
// import styles from '../screens/components/editprofile/Styles';
import firebase from "firebase";

import { connect, Provider } from "react-redux";
import { UserRef } from "../Fire";
import DatePicker from "react-native-datepicker";
import { styles, ButtonIcon, ButtonMod,colors } from "../components/Basic/Basic";
import DropDownPicker from "react-native-dropdown-picker";

class SignUpCont extends React.Component {
  constructor(props) {
    super(props);
    this.unsubscriber = null;
    this.state = {
      typedGender: "",
      typedBirthday: "",
      typedPhone: "",
      typedname: "",
    };
  }
  ResetFields = () => {
    this.setState({});
  };
  UpdateInfo = () => {
    var ref = UserRef.orderByChild("Email").equalTo(this.props.typedEmail);
    var NameTmp = this.state.typedname;
    var PhoneTmp = this.state.typedPhone;
    var BirthdayTmp = this.state.typedBirthday;
    var GenderTmp = this.state.typedGender;
    ref.once("value").then(function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        childSnapshot.ref.update({
          Name: NameTmp,
          Phone: PhoneTmp,
          Birthday: BirthdayTmp,
          Gender: GenderTmp,
        });
      });
    });
    this.props.navigation.replace("Dashboard");
  };
  IgnoreUpdate=()=>{
    this.props.navigation.replace("Dashboard");
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Text style={styles.header}>Thêm thông tin cá nhân</Text>
        <View
          style={{
            marginTop: 16,
            flexDirection: "column",
            justifyContent: "space-around",
          }}
        >
          <View>
            <Text>Họ và tên</Text>
            <TextInput
              header="Họ và tên"
              style={styles.input}
              value={this.state.typedname}
              onChangeText={(text) => this.setState({ typedname: text })}
            />
          </View>
          <View>
            <Text>Số điện thoại</Text>
            <TextInput
              header="Số điện thoại"
              style={styles.input}
              placeholder="012345678"
              keyboardType="phone-pad"
              value={this.props.typedPhone}
              onChangeText={(text) => this.setState({ typedPhone: text })}
            />
          </View>
          <View>
            <Text>Ngày sinh</Text>
            <DatePicker
              date={this.state.typedBirthday}
              backgroundColor={colors.skin}
              mode="date"
              format="DD-MM-YYYY"
              cancelBtnText="Cancel"
              confirmBtnText="Confirm"
              minDate="01-01-1975"
              maxDate="01-01-2020"
              onDateChange={(date) => {
                this.setState({ date });
              }}
            />
          </View>
          <View>
            <Text>Giới tính</Text>
            <DropDownPicker
              items={[
                { label: "Nam", value: "Nam", hidden: true },
                { label: "Nữ", value: "Nữ" },
              ]}
              defaultValue={
                this.state.typedGender === "" ? "Nam" : this.state.typedGender
              }
              containerStyle={{ height: 40 }}
              style={{ backgroundColor: colors.skin }}
              itemStyle={{
                justifyContent: "flex-start",
              }}
              dropDownStyle={{ backgroundColor: colors.skin }}
              onChangeItem={(text) =>
                this.setState({ typedGender: text.value })
              }
            />
          </View>
        </View>
        <ButtonMod onPress={this.UpdateInfo} Text="Hoàn thành" />
        <ButtonMod onPress={this.IgnoreUpdate} Text="Bỏ qua" />
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

export default connect(mapStateToProps)(SignUpCont);
