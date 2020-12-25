import React, {Component, useState} from 'react';
import {
  Text,
  TextInput,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Button,
} from 'react-native';
import {
  SafeAreaView,
  NavigationContainer,
} from 'react-native-safe-area-context';
import {EvilIcons} from '@expo/vector-icons';
// import styles from '../screens/components/editprofile/Styles';
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
import DatePicker from 'react-native-datepicker';
import {styles, ButtonIcon} from '../components/Basic/Basic';
import DropDownPicker from 'react-native-dropdown-picker';

class PersonalInfoEdit extends React.Component {
  constructor (props) {
    super (props);
    this.unsubscriber = null;
    this.state = {
      date: '',
    };
  }

  EditMyInfo = () => {
    var ref = UserRef.orderByChild ('Email').equalTo (this.props.typedEmail);
    var NameTmp = this.props.typedname;
    var PhoneTmp = this.props.typedPhone;
    var BirthdayTmp = this.props.typedBirthday;
    var GenderTmp = this.props.typedGender;
    ref.once ('value').then (function (snapshot) {
      snapshot.forEach (function (childSnapshot) {
        childSnapshot.ref.update ({
          Name: NameTmp,
          Phone: PhoneTmp,
          Birthday: BirthdayTmp,
          Gender: GenderTmp,
        });
      });
    });

    this.props.navigation.goBack ();
  };

  render () {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}>Thông tin cá nhân</Text>
        <View
          style={{marginLeft: 32, marginTop: 16, flexDirection: 'column'}}
          justifyContent="center"
        >
          <TextInput
            style={styles.inputText}
            //    placeholder="Thycute"
            value={this.props.typedname}
            onChangeText={text => this.props.ChangeNameAction (text)}
          />
          <TextInput
            style={styles.inputText}
            //  placeholder="Thycute"
            value={this.props.typedPhone}
            onChangeText={text => this.props.ChangePhoneAction (text)}
          />
          <View>
            <DropDownPicker
              items={[
                {label: 'Nam', value: 'Nam', hidden: true},
                {label: 'Nữ', value: 'Nữ'},

              ]}
              defaultValue={this.props.typedGender}
              containerStyle={{height: 40}}
              style={{backgroundColor: '#fafafa'}}
              itemStyle={{
                justifyContent: 'flex-start',
              }}
              dropDownStyle={{backgroundColor: '#fafafa'}}
              onChangeItem={typedGender =>
                this.props.ChangeGenderAction (typedGender.value)}
            />
            <DatePicker
              style={{width: 200, marginTop:80}}
              date={this.props.typedBirthday}
              mode="date"
              placeholder="placeholder"
              format="YYYY-MM-DD"
              minDate="1930-05-01"
              maxDate="2020-06-01"
              onDateChange={date => {
                this.props.ChangeBirthdayAction (date);
              }}
            />
          </View>
        </View>
        <Button
          style={{fontSize: 20, color: 'green',marginTop:20}}
          styleDisabled={{color: 'red'}}
          onPress={this.EditMyInfo}
          title="Lưu thay đổi"
        />
      </SafeAreaView>
    );
  }
}

function mapStateToProps (state) {
  return {
    typedEmail: state.emailReducer,
    typedname: state.nameReducer,
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

    ChangeNameAction: typedname => {
      dispatch (ChangeNameAction (typedname));
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
export default connect (mapStateToProps, mapDispatchToProps) (PersonalInfoEdit);
