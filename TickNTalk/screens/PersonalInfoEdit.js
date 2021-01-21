import React from "react";
import {
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  SafeAreaView,
  Alert,
} from "react-native";
import { Picker } from "@react-native-community/picker";
import {
  ChangeEmailAction,
  ChangeNameAction,
  ChangeBirthdayAction,
  ChangePhoneAction,
  ChangeGenderAction,
} from "../actions/index";
import { connect } from "react-redux";
import { UserRef } from "../Fire";
import DatePicker from "react-native-datepicker";
import {
  styles,
  ButtonMod,
  createOneButtonAlert,
} from "../components/Basic/Basic";
//import DropDownPicker from "react-native-dropdown-picker";
import { colors } from "../components/Basic/Basic";
class PersonalInfoEdit extends React.Component {
  constructor(props) {
    super(props);
    this.unsubscriber = null;
    this.state = {
      date: "",
    };
  }

  EditMyInfo = async () => {
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
    Alert.alert(
      "Thông báo",
      "Cập nhật thông tin thành công",
      [
        {
          text: "Đồng ý",
          style: "cancel",
          onPress: () => this.props.navigation.goBack(),
        },
      ],
      { cancelable: false }
    );
  };

  render() {
    return (
      <SafeAreaView style={styles.containerLI}>
        <KeyboardAvoidingView style={styles.container} behavior="padding">
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
              <Text style={styles.header}>Chỉnh sửa thông tin</Text>
            </View>
          </View>
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
              <View alignItems="center">
                <DatePicker
                  date={this.props.typedBirthday}
                  mode="date"
                  format="DD-MM-YYYY"
                  cancelBtnText="Cancel"
                  confirmBtnText="Confirm"
                  minDate="01-01-1975"
                  maxDate="01-01-2020"
                  style={styles.input}
                  customStyles={{
                    dateIcon: {
                      position: "absolute",
                      left: 0,
                      top: 4,
                      marginLeft: 0,
                    },
                    dateInput: [styles.input, { marginLeft: 0 }],
                  }}
                  onDateChange={(date) => {
                    this.props.ChangeBirthdayAction(date);
                  }}
                />
              </View>
            </View>
            <View>
              <Text>Giới tính</Text>
              <Picker
                style={styles.input}
                itemStyle={[styles.input,{marginTop:0}]}
                selectedValue={this.props.typedGender}
                onValueChange={(itemValue, itemIndex) =>
                  this.props.ChangeGenderAction(itemValue)
                }
              >
                <Picker.Item label="Nam" value="Nam" />
                <Picker.Item label="Nữ" value="Nữ" />
                <Picker.Item label="Khác" value="Khác" />
              </Picker>
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
