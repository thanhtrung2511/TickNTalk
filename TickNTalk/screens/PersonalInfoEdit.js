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
    Button,
} from 'react-native';
import {
  SafeAreaView,
  NavigationContainer,
} from 'react-native-safe-area-context';
import {EvilIcons} from '@expo/vector-icons';
import styles from '../screens/components/editprofile/Styles';
import firebase from 'firebase';
import {
  ChangeEmailAction,
  ChangeNameAction,
  ChangeBirthdayAction,
  ChangePhoneAction,
} from '../actions/index';
import {connect, Provider} from 'react-redux';
import {UserRef} from '../Fire';
 class PersonalInfoEdit extends React.Component {
     constructor (props) {
    super (props);
    this.unsubscriber = null;
  }
 EditMyInfo = () => {

     var ref = UserRef.orderByChild ('Email').equalTo (this.props.typedEmail);
    var NameTmp=this.props.typedname;
    var PhoneTmp= this.props.typedPhone;

    ref.once("value").then(function(snapshot){
         snapshot.forEach(function(childSnapshot){
             childSnapshot.ref.update({
                 "Name":NameTmp,
                "Phone":PhoneTmp
             })
         })
    })

      this.props.navigation.goBack();    


 };
  componentDidMount () {
    // var nameTmp = '';
    // var birthdayTmp = '';
    // var phoneTmp = '';
    // UserRef.orderByChild ('Email')
    //   .equalTo (this.props.typedEmail)
    //   .on ('value', snap => {
    //     snap.forEach (element => {
    //       nameTmp = element.toJSON ().Name;
    //       birthdayTmp = element.toJSON ().Birthday;
    //       phoneTmp = element.toJSON ().Phone;
    //     });
    //   });

    // this.props.ChangeNameAction (nameTmp);
    // this.props.ChangeBirthdayAction (birthdayTmp);
    // this.props.ChangePhoneAction (phoneTmp);
    // console.log (this.props.ChangeNameAction (nameTmp));
  }

    render() {
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

            {/* <View
              style={{marginLeft: 16, marginTop: 16, flexDirection: 'column'}}
            >
              <Text style={{fontWeight: '800'}}>
                Email: {this.props.typedEmail}
              </Text>
              <Text> Name: {this.props.name}</Text>
              <Text style={{fontWeight: '800'}}>
                ngày sinh: {this.props.typedBirthday}
              </Text>
              <Text style={{fontWeight: '800'}}>
                sdt: {this.props.typedPhone}
              </Text>
            </View>*/}
          </View> 
         <TextInput
                        style={styles.inputText}
                    //    placeholder="Thycute"
                        value={this.props.typedname}
                        onChangeText={(text) => this.props.ChangeNameAction(text)}
                    />
                    <TextInput
                        style={styles.inputText}
                      //  placeholder="Thycute"
                        value={this.props.typedPhone}
                        onChangeText={(text) => this.props.ChangePhoneAction(text)}
                    />
          </View>

          <Button
                 
                   // background={colors.blue}
                  //  style={{ marginHorizontal: sizeFactor }}
                  style={{fontSize: 20, color: 'green'}}
  styleDisabled={{color: 'red'}}
                    onPress={this.EditMyInfo}
                      title="Lưu thay đổi"
                >
                    
                </Button>
      </SafeAreaView>
        )
    }
}

function mapStateToProps (state) {
  return {
    typedEmail: state.emailReducer,
    typedname: state.nameReducer,
    typedBirthday: state.birthdayReducer,
     typedPhone: state.phoneReducer,
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
    // BirthdayAction: birthday => {
    //   dispatch (BirthdayAction (birthday));
    // },
  };
}
export default connect (mapStateToProps, mapDispatchToProps) (PersonalInfoEdit);
