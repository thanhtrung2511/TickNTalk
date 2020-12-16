import React, {Component} from 'react';
import {
  Text,
  TextInput,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import {
  SafeAreaView,
  NavigationContainer,
} from 'react-native-safe-area-context';
import {EvilIcons} from '@expo/vector-icons';
import styles from '../components/PersonalInfo/Styles';
import firebase from 'firebase';
import {
  ChangeEmailAction,
  ChangeNameAction,
  BirthdayAction,
  ChangePhoneAction,
} from '../actions/index';
import {connect, Provider} from 'react-redux';
import {UserRef} from '../Fire';

export class PersonalInFo extends React.Component {
  constructor (props) {
    super (props);
    this.unsubscriber = null;
  }

Update_ava=() => {
  this.props.navigation.navigate("Avatar");
}

  Change_pass = () => {
    this.props.navigation.navigate ('ChangePass');
  };
  LogOut = () => {
    this.props.navigation.navigate ('Login');
  };
  componentDidMount () {
    var nameTmp = '';
    var birthday = '';
    var phone = '';
    UserRef.orderByChild ('Email')
      .equalTo (this.props.typedEmail)
      .on ('value', snap => {
        snap.forEach (element => {
          nameTmp = element.toJSON ().Name;
          birthday = element.toJSON ().Birthday;
          phone = element.toJSON ().Phone;
        });
      });

    this.props.ChangeNameAction (nameTmp);
    this.props.BirthdayAction (birthday);
    this.props.ChangePhoneAction (phone);
  }

  render () {
    return (
      <SafeAreaView style={styles.container}>
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
              <Text> Name: {this.props.typedName}</Text>
              <Text style={{fontWeight: '800'}}>
                ngày sinh: {this.props.Birthday}
              </Text>
              <Text style={{fontWeight: '800'}}>
                sdt: {this.props.Phone}
              </Text>
            </View>
          </View>
          <TouchableOpacity style={styles.input} onPress={this.Update_ava} >
            <Text style={{marginLeft: 16, fontWeight: '700'}}>
              Cập nhật ảnh đại diện
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.input} onPress={this.Change_pass} >
            <Text style={{marginLeft: 16, fontWeight: '700'}}>
              Đổi mật khẩu
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.input}>
            <Text style={{marginLeft: 16, fontWeight: '700'}}>
              Chỉnh sửa thông tin cá nhân
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.input} onPress={this.LogOut}>
            <Text style={{marginLeft: 16, fontWeight: '700'}}>Đăng xuất</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}
function mapStateToProps (state) {
  return {
    typedEmail: state.emailReducer,
    typedName: state.nameReducer,
    Birthday: state.birthdayReducer,
    Phone: state.phoneReducer,
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
    ChangePhoneAction: phone => {
      dispatch (ChangePhoneAction (phone));
    },
    BirthdayAction: birthday => {
      dispatch (BirthdayAction (birthday));
    },
  };
}
export default connect (mapStateToProps, mapDispatchToProps) (PersonalInFo);