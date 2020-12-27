import React, {Component} from 'react';
import {
  Text,
  TextInput,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,KeyboardAvoidingView
} from 'react-native';
import {
  SafeAreaView,
  NavigationContainer,
} from 'react-native-safe-area-context';
import {EvilIcons} from '@expo/vector-icons';
// import styles from '../screens/components/profile/Styles';
import {styles, ButtonIcon} from '../components/Basic/Basic';
import firebase from 'firebase';
import {
  ChangeEmailAction,
  ChangeNameAction,
  ChangeBirthdayAction,
  ChangePhoneAction,
  ChangeGenderAction,
} from '../actions/index';
import {connect, Provider} from 'react-redux';
import {UserRef} from '../Fire';

export class PersonalInFo extends React.Component {
  constructor (props) {
    super (props);
    this.unsubscriber = null;
  }

  ChangePass = () => {
    this.props.navigation.navigate ('ChangePass');
  };

  ChangeAva = () => {
    this.props.navigation.navigate ('Avatar');
  };

  LogOut = () => {
    this.props.navigation.replace('Login');
  };

  ChangeInfo = () => {
    this.props.navigation.navigate ('EditMyInfo');
  };

  componentDidMount () {
    var nameTmp = '';
    var birthdayTmp = '';
    var phoneTmp = '';
    var genderTmp = '';
    UserRef.orderByChild ('Email')
      .equalTo (this.props.typedEmail)
      .on ('value', snap => {
        snap.forEach (element => {
          nameTmp = element.toJSON ().Name;
          this.props.ChangeNameAction (nameTmp);
          genderTmp = element.toJSON ().Gender;
          this.props.ChangeGenderAction (genderTmp);
          birthdayTmp = element.toJSON ().Birthday;
          this.props.ChangeBirthdayAction (birthdayTmp);
          phoneTmp = element.toJSON ().Phone;
          this.props.ChangePhoneAction (phoneTmp);
        });
      });
  }

  render () {
    return (
      <SafeAreaView>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Text style={styles.header}>Thông tin cá nhân</Text>
        <View
          style={{marginLeft: 32, marginTop: 16, flexDirection: 'column'}}
          justifyContent="center"
        >
          <View
            style={{
              flexDirection: 'row',
              marginLeft: -32,
              padding: 64,
              backgroundColor: 'white',
              borderRadius: 70 / 5,
            }}
          >

            <View
              style={{marginLeft: 16, marginTop: 16, flexDirection: 'column'}}
            >
              <Text style={{fontWeight: '800'}}>
                Email: {this.props.typedEmail}
              </Text>
              <Text style={{fontWeight: '800'}}>
                Tên: {this.props.typedName}
              </Text>
              <Text style={{fontWeight: '800'}}>
                Giới tính: {this.props.typedGender}
              </Text>
              <Text style={{fontWeight: '800'}}>
                Ngày sinh: {this.props.typedBirthday}
              </Text>
              <Text style={{fontWeight: '800'}}>
                Số điện thoại: {this.props.typedPhone}
              </Text>
            </View>
          </View>
          <TouchableOpacity style={styles.input} onPress={this.ChangeAva}>
            <Text style={{marginLeft: 16, fontWeight: '700'}}>
              Cập nhật ảnh đại diện
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.input} onPress={this.ChangePass}>
            <Text style={{marginLeft: 16, fontWeight: '700'}}>
              Đổi mật khẩu
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.input} onPress={this.ChangeInfo}>
            <Text style={{marginLeft: 16, fontWeight: '700'}}>
              Chỉnh sửa thông tin cá nhân
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.input} onPress={this.LogOut}>
            <Text style={{marginLeft: 16, fontWeight: '700'}}>Đăng xuất</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}
function mapStateToProps (state) {
  return {
    typedEmail: state.emailReducer,
    typedName: state.nameReducer,
    typedBirthday: state.birthdayReducer,
    typedPhone: state.phoneReducer,
    typedGender: state.genderReducer,
  };
}

function mapDispatchToProps (dispatch) {
  return {
    ChangeEmailAction: typedEmail => {
      dispatch (ChangeEmailAction (typedEmail));
    },

    ChangeNameAction: typedName => {
      dispatch (ChangeNameAction (typedName));
    },

    ChangeBirthdayAction: typedBirthday => {
      dispatch (ChangeBirthdayAction (typedBirthday));
    },

    ChangePhoneAction: typedPhone => {
      dispatch (ChangePhoneAction (typedPhone));
    },

    ChangeGenderAction: typedGender => {
      dispatch (ChangeGenderAction (typedGender));
    },
  };
}
export default connect (mapStateToProps, mapDispatchToProps) (PersonalInFo);
