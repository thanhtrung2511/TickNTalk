import React from "react";
import {
  Text,
  TextInput,
  View,Alert,
  SafeAreaView,
  KeyboardAvoidingView
} from "react-native";
import {Picker} from "@react-native-community/picker"

import { connect } from "react-redux";
import { UserRef } from "../Fire";
import DatePicker from "react-native-datepicker";
import { styles, ButtonIcon, ButtonMod,colors } from "../components/Basic/Basic";
//import DropDownPicker from "react-native-dropdown-picker";

class SignUpCont extends React.Component {
  constructor(props) {
    super(props);
    this.unsubscriber = null;
    this.state = {
      typedGender: "",
      listGender:[
        {label: "Nam", value: "Nam"},
        {label:"Nữ", value: "Nữ"},
        {label:"Khác", value: "Khác"}
      ],
      typedBirthday: "",
      typedPhone: "",
      typedname: "",
    };
  }
  ResetFields = () => {
    this.setState({});
  };
  UpdateInfo = async() => {
    //console.log(this.props.typedEmail);
    
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
    Alert.alert(
      'Thông báo',
      'Cập nhật thông tin thành công',
      [
        
        {text: this.props.typedEmail, style: 'cancel',onPress:()=> this.props.navigation.replace("Dashboard")},
      ],
      { cancelable: false }
    );
   
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
                value={this.state.typedname}
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
                value={this.state.typedPhone}
                onChangeText={(text) => this.setState({typedPhone: text})}
              />
            </View>

            <View>
              <Text>Ngày sinh</Text>
              <View alignItems= "center" >
              <DatePicker
                date={this.state.typedBirthday}
                mode="date"
                format="DD-MM-YYYY"
                cancelBtnText="Cancel"
                confirmBtnText="Confirm"
                defaultValue="01-01-1975"
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
              <Picker
                style={styles.input}
                itemStyle={[styles.input,{marginTop:0}]}
                selectedValue={this.state.typedGender}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({typedGender:itemValue})
                }
              >
                <Picker.Item label="Nam" value="Nam" />
                <Picker.Item label="Nữ" value="Nữ" />
                <Picker.Item label="Khác" value="Khác" />
              </Picker>
            </View>
          </View>
          <View style={{ marginTop:104, height:"20%",justifyContent:'space-around',flexDirection:"column",alignItems:"center" }}>
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
