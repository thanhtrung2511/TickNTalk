import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
} from "react-native";

import {
  ChangeEmailAction,
  ChangeNameAction,
  ChangeBirthdayAction,
  ChangePhoneAction,
  ChangeGenderAction,
  ChangeAvaAction,
} from "../actions/index";
// import styles from '../screens/components/profile/Styles';
import {
  styles,
  ButtonIcon,
  BasicImage,
  ButtonMod,
  colors,
  sizeFactor,
  windowWidth,
} from "../components/Basic/Basic";
import firebase from "firebase";
import { UserRef} from "../Fire";
import { connect } from "react-redux";

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
  addTokenToDatabase = (token) => {
    var ref = UserRef.orderByChild("Email").equalTo(this.props.typedEmail);
    ref.once("value").then(function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        childSnapshot.ref.update({
          Token: token,
        });
      });
    });
  };
  ResetRedux = () => {
    this.addTokenToDatabase('logout');
    this.props.ChangeNameAction(" ");
    this.props.ChangeBirthdayAction(" ");
    this.props.ChangePhoneAction(" ");
    this.props.ChangeGenderAction(" ");
    this.props.ChangeAvaAction(" ");
  };
  LogOut = () => {
    Alert.alert(
      "Thông báo",
      "Bạn có muốn đăng xuất",
      [
        {
          text: "Đồng ý",
          onPress: () => {
            firebase
              .auth()
              .signOut()
              .then(() => {
                // Sign-out successfull
                Alert.alert("Thông báo", "Đăng xuất thành công", [
                  {
                    text: "Đồng ý",
                    style: "cancel",
                    onPress: () => {
                      this.ResetRedux();
                      this.props.navigation.replace("Login");
                    },
                  },
                ]);
              })
              .catch((error) => {
                //console.log(error);
                // An error happened.
              });
          },
        },
        { text: "Hủy", style: "cancel" },
      ],
      { cancelable: false }
    );
  };

  ChangeInfo = () => {
    this.props.navigation.navigate("EditMyInfo");
  };

  componentDidMount() {
    this.ResetRedux();
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

  render() {
    return (
      <SafeAreaView style={[styles.containerLI]}>
        <ScrollView>
          <View style={styles.container}>
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
                <Text style={styles.header}>Thông tin cá nhân</Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "column",
                width: "100%",
                paddingVertical: 8,
              }}
              justifyContent="space-between"
              alignItems="center"
              backgroundColor={colors.lightpink}
            >
              <View
                style={{
                  flexDirection: "column",
                  padding: 8,
                  justifyContent: "flex-start",
                  backgroundColor: colors.white,
                  borderRadius: 70 / 5,
                  width: "90%",
                }}
              >
                <View alignItems="center">
                  <TouchableOpacity
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      width: 160,
                      height: 160,
                      borderRadius: 100,
                    }}
                    onPress={this.ChangeAva}
                  >
                    <BasicImage
                      //style={{ borderColor: "whitesmoke", borderWidth: 5 }}
                      source={{
                        uri: this.props.uriAva
                          ? this.props.uriAva
                          : "https://firebasestorage.googleapis.com/v0/b/chatapp-demo-c52a3.appspot.com/o/Logo.png?alt=media&token=af1ca6b3-9770-445b-b9ef-5f37c305e6b8",
                      }}
                      Icon={150}
                      Round={100}
                    ></BasicImage>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    borderColor: colors.lightpink,
                    borderWidth: 2,
                    borderRadius: 70 / 5,
                    flexDirection: "column",
                    paddingVertical: 8,
                    paddingHorizontal: 16,
                    justifyContent: "space-around",
                    shadowOffset: { width: 1, height: 1 },
                    shadowOpacity: 0.2,
                    borderStyle: "solid",
                  }}
                >
                  <View
                    style={{ paddingVertical: 8 }}
                    justifyContent="space-between"
                    flexDirection="row"
                  >
                    <Text style={{ fontSize: 16, fontWeight: "800" }}>
                      Email:
                    </Text>
                    <Text style={{ fontSize: 16, fontWeight: "600" }}>
                      {this.props.typedEmail}
                    </Text>
                  </View>
                  <View
                    style={{ paddingVertical: 8 }}
                    justifyContent="space-between"
                    flexDirection="row"
                  >
                    <Text style={{ fontSize: 16, fontWeight: "800" }}>
                      Tên:
                    </Text>
                    <Text style={{ fontSize: 16, fontWeight: "600" }}>
                      {this.props.typedName}
                    </Text>
                  </View>
                  <View
                    style={{ paddingVertical: 8 }}
                    justifyContent="space-between"
                    flexDirection="row"
                  >
                    <Text style={{ fontSize: 16, fontWeight: "800" }}>
                      Giới tính:
                    </Text>
                    <Text style={{ fontSize: 16, fontWeight: "600" }}>
                      {this.props.typedGender}
                    </Text>
                  </View>
                  <View
                    style={{ paddingVertical: 8 }}
                    justifyContent="space-between"
                    flexDirection="row"
                  >
                    <Text style={{ fontSize: 16, fontWeight: "800" }}>
                      Ngày sinh:
                    </Text>
                    <Text style={{ fontSize: 16, fontWeight: "600" }}>
                      {this.props.typedBirthday}
                    </Text>
                  </View>
                  <View
                    style={{ paddingVertical: 8 }}
                    justifyContent="space-between"
                    flexDirection="row"
                  >
                    <Text style={{ fontSize: 16, fontWeight: "800" }}>
                      Số điện thoại:
                    </Text>
                    <Text style={{ fontSize: 16, fontWeight: "600" }}>
                      {this.props.typedPhone}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View
              style={{
                alignItems: "center",
                height: "30%",
                flexDirection: "column",
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              <ButtonMod
                styleText={{ color: colors.white }}
                Text="Chỉnh sửa thông tin cá nhân"
                onPress={this.ChangeInfo}
              ></ButtonMod>
              <ButtonMod
                styleText={{ color: colors.white }}
                Text="Đổi mật khẩu"
                onPress={this.ChangePass}
              ></ButtonMod>
              <ButtonMod
                styleText={{ color: colors.white }}
                styleContainer={{ backgroundColor: colors.Darkpink }}
                Text="Đăng xuất"
                onPress={this.LogOut}
              ></ButtonMod>
            </View>
          </View>
        </ScrollView>
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
    uriAva: state.avaReducer,
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

    ChangeAvaAction: (uriAva) => {
      dispatch(ChangeAvaAction(uriAva));
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(PersonalInFo);
