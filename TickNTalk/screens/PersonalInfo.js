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
import styles from '../screens/components/profile/Styles';
import firebase from 'firebase';
import {
  ChangeEmailAction,
  ChangeNameAction,
  ChangeBirthdayAction,
  ChangePhoneAction,
} from '../actions/index';
import {connect, Provider} from 'react-redux';
import {UserRef} from '../Fire';

export class PersonalInFo extends React.Component {
  constructor (props) {
    super (props);
    this.unsubscriber = null;
  }

  Change_pass = () => {
    this.props.navigation.navigate ('ChangePass');
  };

  LogOut = () => {
    this.props.navigation.navigate ('Login');
  };

  ChangeInfo=()=>{
    this.props.navigation.navigate ('EditMyInfo');
  };

  componentDidMount () {
    var nameTmp = '';
    var birthdayTmp = '';
    var phoneTmp = '';
    UserRef.orderByChild ('Email')
      .equalTo (this.props.typedEmail)
      .on ('value', snap => {
        snap.forEach (element => {
          nameTmp = element.toJSON ().Name;
          console.log (element.toJSON ().Name);

          birthdayTmp = element.toJSON ().Birthday;
          phoneTmp = element.toJSON ().Phone;
           console.log (element.toJSON ().Phone);
        });
      });

    this.props.ChangeNameAction (nameTmp);
    this.props.ChangeBirthdayAction (birthdayTmp);
    this.props.ChangePhoneAction (phoneTmp);
    console.log ("thy");
      console.log (this.props.ChangeNameAction (nameTmp));
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
                ngày sinh: {this.props.typedBirthday}
              </Text>
              <Text style={{fontWeight: '800'}}>
                sdt: {this.props.typedPhone}
              </Text>
            </View>
          </View>
          <TouchableOpacity style={styles.input}>
            <Text style={{marginLeft: 16, fontWeight: '700'}}>
              Cập nhật ảnh đại diện
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.input} onPress={this.Change_pass}>
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
    // BirthdayAction: birthday => {
    //   dispatch (BirthdayAction (birthday));
    // },
  };
}
export default connect (mapStateToProps, mapDispatchToProps) (PersonalInFo);