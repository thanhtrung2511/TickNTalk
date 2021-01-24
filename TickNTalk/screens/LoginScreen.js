import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import {
  LoginButton,
  BasicImage,
  styles,
  colors,
} from "../components/Basic/Basic";
import firebase from "firebase";
import { connect } from "react-redux";
import {
  ChangeEmailAction,
  ChangeNameAction,
  ChangeBirthdayAction,
  ChangePhoneAction,
  ChangeGenderAction,
  ChangeAvaAction,
} from "../actions/index";
import { UserRef } from "../Fire";
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
    this.props.navigation.replace("Dashboard");
  };
  componentDidUpdate() {
    if (this.state.authenticated) this.Dashboard();
  }
  render() {
    if (this.state.loading) return null; // Render loading/splash screen etc

    return (
      <SafeAreaView
        style={[styles.containerLI]}
      >
        <View style={{ alignItems: "center" }}>
          <View style={{ marginTop: 32, alignItems: "center" }}>
            <BasicImage Icon={200} source={require("../assets/images/Logo.png")} />
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
  return {
    typedEmail: state.emailReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    Update: (typedEmail) => {
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
    ChangeAvaAction: (uriAva) => {
      dispatch(ChangeAvaAction(uriAva));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
