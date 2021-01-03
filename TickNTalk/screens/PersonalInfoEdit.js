import React, { Component, useState } from "react";
import { Text, TextInput, View, KeyboardAvoidingView } from "react-native";
import {
  SafeAreaView,
  NavigationContainer,
} from "react-native-safe-area-context";
import { EvilIcons } from "@expo/vector-icons";
// import styles from '../screens/components/editprofile/Styles';
import firebase from "firebase";
import {
  ChangeEmailAction,
  ChangeNameAction,
  ChangeBirthdayAction,
  ChangePhoneAction,
  ChangeGenderAction,
} from "../actions/index";
import { connect, Provider } from "react-redux";
import { UserRef } from "../Fire";
import DatePicker from "react-native-datepicker";
import { styles, ButtonMod } from "../components/Basic/Basic";
import DropDownPicker from "react-native-dropdown-picker";

class PersonalInfoEdit extends React.Component {
  constructor(props) {
    super(props);
    this.unsubscriber = null;
    this.state = {
      date: "",
    };
  }

  EditMyInfo = () => {
    var ref = UserRef.orderByChild("Email").equalTo(this.props.typedEmail);
    var NameTmp = this.props.typedname;
    var PhoneTmp = this.props.typedPhone;
    var BirthdayTmp = this.props.typedBirthday;
    var GenderTmp = this.props.typedGender;
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

    this.props.navigation.goBack();
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          <Text style={styles.mini_header} wrapped={true} numberOfLines={2}>Chỉnh sửa thông tin cá nhân</Text>
          <View style={{ marginTop: 32, flexDirection: "column" }}>
            <View>
              <Text>Họ và tên</Text>
              <TextInput
                header="Họ và tên"
                style={styles.input}
                value={this.props.typedname}
                onChangeText={(text) => this.props.ChangeNameAction(text)}
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
                onChangeText={(text) => this.props.ChangePhoneAction(text)}
              />
            </View>

            <View>
              <Text>Ngày sinh</Text>
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
                  dateInput: {
                    marginLeft: 40,
                  },
                }}
                onDateChange={(date) => {
                  this.props.ChangeBirthdayAction(date);
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
                  this.props.typedGender === "" ? "Nam" : this.props.typedGender
                }
                containerStyle={{ height: 40 }}
                style={{ backgroundColor: "#fafafa" }}
                itemStyle={{
                  justifyContent: "flex-start",
                }}
                dropDownStyle={{ backgroundColor: "#fafafa" }}
                onChangeItem={(typedGender) =>
                  this.props.ChangeGenderAction(typedGender.value)
                }
              />
            </View>
          </View>
          <View style={{ marginTop: 80 }}>
            <ButtonMod
              styleDisabled={{ color: "red" }}
              onPress={this.EditMyInfo}
              Text="Lưu thay đổi"
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
    typedname: state.nameReducer,
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

    ChangeNameAction: (typedname) => {
      dispatch(ChangeNameAction(typedname));
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
export default connect(mapStateToProps, mapDispatchToProps)(PersonalInfoEdit);
