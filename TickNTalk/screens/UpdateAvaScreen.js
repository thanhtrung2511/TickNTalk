import React, {useContext, useState} from 'react';
import {
  View,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Text,
  TextInput,
  StatusBar,
  Image,
  Button,
} from 'react-native';
import {AntDesign, Entypo} from '@expo/vector-icons';

// import {Text} from '../Text';
import "firebase/auth";
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import {connect, Provider} from 'react-redux';
// import {FirebaseContext} from '../screens/FirebaseContext';
import {UserContext} from '../screens/UserContext';
import {colors, styles} from '../components/Basic/Basic';
import {
  ChangeEmailAction,
  ChangeNameAction,
  ChangeBirthdayAction,
  ChangePhoneAction,
  ChangeGenderAction,
  ChangeAvaAction,
} from '../actions/index';
import {UserRef, storage,uidR} from '../Fire';

class UpdateAvaScreen extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
    //  profilePhoto: 'file:/data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FTickNTalk-0ee41aaa-0318-4a38-b9da-af589c62c4eb/ImagePicker/2717ec9d-86b8-4ef3-a276-5aa0d9d8d1a7.png',
     profilePhoto: this.props.uriAva,
      loading: null,
    };
  }

  componentDidUpdate()
  {
    console.log('thycute : '+ this.props.uriAva);
  }

  getPermissions = async () => {
    if (Platform.OS !== 'web') {
      const {status} = await Permissions.askAsync (Permissions.CAMERA_ROLL);
      return status;
    }
  };

  pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync ({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });
      if (!result.cancelled) {
        this.props.ChangeAvaAction(result.uri); // not async

      }

    } catch (error) {
      console.log ('Error when picking image: ' + error);
    }
  };

  addProfilePhoto = async () => {
    const status = await this.getPermissions ();

    if (status !== 'granted') {
      alert ('We need permissions to get access to your camera library');
      return;
    }

    this.pickImage ();
  };

  logInWithGoogle = async () => {
    await firebase.logInWithGoogle ();
  };

  uploadProfilePhoto = async (uri) => {
    try {
      const photo = await this.getBlob (uri);

      //const filename = uri.substring(uri.lastIndexOf('/') + 1);
      
      const uploadUri = this.props.typedEmail + "_" + (Platform.OS === 'ios' ? uri.replace('file://', '') : uri).substring(uri.lastIndexOf('/') + 1);

      const imageRef = storage.child(uploadUri);

      await imageRef.put (photo);
      const url = await imageRef.getDownloadURL ();
      this.EditUrlAva();

      return url;
    } catch (error) {
      console.log ('Error when uploading profile photo ', error.message);
    }
   
  };

  EditUrlAva=()=>{
    var ref = UserRef.orderByChild("Email").equalTo(this.props.typedEmail);
    var urlTmp = this.props.uriAva;
    ref.once("value").then(function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        childSnapshot.ref.update({
          urlAva: urlTmp,
        });
      });
    });

    this.props.navigation.goBack();
  };


  getBlob = async (uri) => {
    //console.log("Uri get blob: " + uri);
    return await new Promise ((resolve, reject) => {
      const xhr = new XMLHttpRequest ();

      xhr.onload = () => {
        resolve (xhr.response);
      };
      xhr.onerror = () => {
        reject (new TypeError ('Network request fails'));
      };

      xhr.responseType = 'blob';
      xhr.open ('GET', uri, true);
      xhr.send (null);
    });
  };

//  componentDidMount () {
//     var nameTmp = '';
//     var birthdayTmp = '';
//     var phoneTmp = '';
//     var genderTmp = '';
//     UserRef.orderByChild ('Email')
//       .equalTo (this.props.typedEmail)
//       .on ('value', snap => {
//         snap.forEach (element => {
//           nameTmp = element.toJSON ().Name;
//           this.props.ChangeNameAction (nameTmp);
//           genderTmp = element.toJSON ().Gender;
//           this.props.ChangeGenderAction (genderTmp);
//           birthdayTmp = element.toJSON ().Birthday;
//           this.props.ChangeBirthdayAction (birthdayTmp);
//           phoneTmp = element.toJSON ().Phone;
//           this.props.ChangePhoneAction (phoneTmp);
//           //console.log(element.toJSON ().urlAva);
//           tmpuri= element.toJSON ().urlAva;
//           this.props.ChangeAvaAction (tmpuri);
//         });
//       });
//   }

  render () {

    return (
      <View style={{flex: 1}}>
        <View yle={styles.Auth} behavior="position" keyboardVerticalOffset={10}>
          <View style={{marginTop: 100}}>

            <Text style={styles.header}>Cập nhật ảnh đại diện</Text>
          </View>

          {/* //<ProfilePhotoContainer onPress={addProfilePhoto}> */}
          <TouchableOpacity
            style={styles.ProfilePhotoContainer}
            onPress={this.addProfilePhoto}
          >
            {this.props.uriAva
              ? <Image
                  style={styles.ProfilePhoto}
                  source={{uri: this.props.uriAva}}
                />
              : <View style={styles.DefaultProfilePhoto}>
                  <AntDesign
                    name="plus"
                    size={24}
                    color={`${colors.primaryDark}`}
                  />
                </View>}
          </TouchableOpacity>
        </View>

        <Button
          style={{fontSize: 20, color: 'green', marginTop: 50}}
          styleDisabled={{color: 'red'}}
         // onPress={uploadProfilePhoto(this.state.profilePhoto)}
           onPress={() => { this.uploadProfilePhoto(this.props.uriAva)}}
          title="Thay đổi"
        />
        <StatusBar barStyle="light-content" />
      </View>
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
    uriAva: state.avaReducer,
  };
}

function mapDispatchToProps (dispatch) {
  return {
    ChangeEmailAction: typedEmail => {
      dispatch (ChangeEmailAction (typedEmail));
    },

    ChangeAvaAction: uriAva => {
      dispatch (ChangeAvaAction (uriAva));
    },
  };
}
export default connect (mapStateToProps, mapDispatchToProps) (UpdateAvaScreen);
