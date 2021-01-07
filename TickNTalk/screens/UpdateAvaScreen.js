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
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import {connect, Provider} from 'react-redux';
import {FirebaseContext} from '../screens/FirebaseContext';
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
import {UserRef, imageRef} from '../Fire';

const UpdateAvaScreen = ({navigation}) => {
  const [email, setEmail] = useState ();
  const [password, setPassword] = useState ();
  const [passwordShown, setPasswordShown] = useState (true);
  const [loading, setLoading] = useState ();
  const [profilePhoto, setProfilePhoto] = useState ();
  const firebase = useContext (FirebaseContext);
  const [_, setUser] = useContext (UserContext);

  const togglePasswordVisibility = () => {
    setPasswordShown (passwordShown ? false : true);
  };

  const getPermissions = async () => {
    if (Platform.OS !== 'web') {
      const {status} = await Permissions.askAsync (Permissions.CAMERA_ROLL);
      return status;
    }
  };

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync ({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });
      if (!result.cancelled) {
        setProfilePhoto (result.uri);
      }
    } catch (error) {
      console.log ('Error when picking image: ' + error);
    }
  };

  const addProfilePhoto = async () => {
    const status = await getPermissions ();

    if (status !== 'granted') {
      alert ('We need permissions to get access to your camera library');
      return;
    }

    pickImage ();
  };

  const logInWithGoogle = async () => {
    await firebase.logInWithGoogle ();
  };

  const signUp = async () => {
    setLoading (true);
    const user = {email, password, profilePhoto};

    try {
      console.log ('Thycute1' + firebase);
      const createdUser = await firebase.createUser (user); //
      console.log ('Thycute2');
      setUser ({...createdUser, isLoggedIn: true});
    } catch (error) {
      console.log ('Error when sign up', error);
    } finally {
      setLoading (false);
    }
  };

  const uploadProfilePhoto = async uri => {
    //console.log(uid);
    try {
      const photo = await Firebase.getBlob (uri);
      const avaRef = imageRef.child (uid);
      await avaRef.put (photo);
      const url = await avaRef.getDownloadURL ();
      //console.log("Url: " + url);

      // await db.collection("users").doc(uid).update({
      //   profilePhotoUrl: url,
      // });
      return url;
    } catch (error) {
      console.log ('Error when uploading profile photo ', error.message);
    }
  };

  const getBlob = async uri => {
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
  return (
    <View style={{flex: 1}}>
      <View yle={styles.Auth} behavior="position" keyboardVerticalOffset={10}>
        <View style={{marginTop: 100}}>

          <Text style={styles.header}>Thông tin cá nhân</Text>
        </View>

        {/* //<ProfilePhotoContainer onPress={addProfilePhoto}> */}
        <TouchableOpacity
          style={styles.ProfilePhotoContainer}
          onPress={addProfilePhoto}
        >
          {profilePhoto
            ? <Image style={styles.ProfilePhoto} source={{uri: profilePhoto}} />
            : <View style={styles.DefaultProfilePhoto}>
                <AntDesign
                  name="plus"
                  size={24}
                  color={`${colors.primaryDark}`}
                />
              </View>}
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          secureTextEntry={false}
          placeholder="Họ và Tên"
          // value={this.state.typedName}
          onChangeText={text => this.ChangeNameAction (text)}
        />

        <View style={styles.AuthContainer}>
          {/* <AuthTitle medium>Email</AuthTitle> */}
          <TextInput
            style={styles.AuthField}
            placeholder="EMAIL"
            autoCapitalize="none"
            autoCompleteType="email"
            autoCorrect={false}
            keyboardType="email-address"
            onChangeText={email => setEmail (email.trim ())}
            value={email}
          />
        </View>

        <TouchableOpacity
          style={styles.SignUpContainer}
          onPress={signUp}
          disabled={loading}
        >
          {loading
            ? <Loading />
            : <Text>
                Thay đổi ảnh
              </Text>}
        </TouchableOpacity>
      </View>

      <Button
        style={{fontSize: 20, color: 'green', marginTop: 50}}
        styleDisabled={{color: 'red'}}
        // onPress={this.uploadProfilePhoto(profilePhoto)}
        title="Đăng ký"
      />
      <StatusBar barStyle="light-content" />
    </View>
  );
};

function mapStateToProps (state) {
  return {
    typedEmail: state.emailReducer,
    typedName: state.nameReducer,
    typedBirthday: state.birthdayReducer,
    typedPhone: state.phoneReducer,
    typedGender: state.genderReducer,
    urlAva: state.avaReducer,
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

    ChangeAvaAction: urlAva => {
      dispatch (ChangeAvaAction (urlAva));
    },
  };
}
export default connect (mapStateToProps, mapDispatchToProps) (UpdateAvaScreen);
