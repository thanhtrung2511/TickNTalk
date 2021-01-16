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
      typedGender: "Nam",
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
      <SafeAreaView style={styles.containerLI}>
        <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={{ backgroundColor: colors.lightpink,width:"100%",alignItems:"center" }}>
          <View
            style={{ width: "90%" }}
            justifyContent="space-between"
            flexDirection="row"
          >
            <Text style={styles.header}>Thêm thông tin cá nhân</Text>
          </View>
          </View>
          <View style={{ marginTop: 32, flexDirection: "column" }}>
            <View>
              <Text>Họ và tên</Text>
              <TextInput
                header="Họ và tên"
                style={styles.input}
                value={this.props.typedname}
                onChangeText={(text) => this.setState({typedname: text})}
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
                onChangeText={(text) => this.setState({typedPhone: text})}
              />
            </View>

            <View>
              <Text>Ngày sinh</Text>
              <View alignItems= "center" >
              <DatePicker
                date={this.props.typedBirthday}
                mode="date"
                format="DD-MM-YYYY"
                cancelBtnText="Cancel"
                confirmBtnText="Confirm"
                minDate="01-01-1975"
                maxDate="01-01-2020"
                customStyles={{
                  dateIcon: {
                    position: "absolute",
                    left: 0,
                    top: 4,
                    marginLeft: 0,
                  },
                  dateInput: [
                    
                    styles.input,{marginLeft: 0}]
                  ,
                }}
                onDateChange={(date) => {
                  this.setState({typedBirthday:date});
                }}
              />
              </View>
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
                containerStyle={styles.input}
                style={{ backgroundColor: "#fafafa" }}
                itemStyle={{
                  justifyContent: "flex-start",
                }}
                dropDownStyle={{ backgroundColor: "#fafafa" }}
                onChangeItem={(typedGender) =>
                  this.setState({typedGender:typedGender})
                }
              />
            </View>
          </View>
          <View style={{ marginTop:64, height:"20%",justifyContent:'space-around',flexDirection:"column",alignItems:"center" }}>
            <ButtonMod
              
              onPress={this.UpdateInfo}
              Text="Lưu thay đổi"
            />
            <ButtonMod
              styleContainer={{backgroundColor:colors.Darkpink}}
              styleText={{color:colors.white}}
              onPress={this.IgnoreUpdate}
              Text="Bỏ qua và tiếp tục"
            />
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

export default connect(mapStateToProps)(SignUpCont);
