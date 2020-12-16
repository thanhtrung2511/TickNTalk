import React, {Component, useContext, useState} from 'react';
import {
  Image,
  SafeAreaView,
  Text,
  TextInput,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import firebase from 'firebase';
// import {UserRef} from '../Fire';
import styles from '../components/SignUp/Styles';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import {AntDesign} from '@expo/vector-icons';
// import { FirebaseContext } from "../actions/FirebaseContext";
import {UserContext} from '../actions/UserContext';
import 'firebase/auth';
import 'firebase/firestore';
import {usersRef} from '../Fire';
// export default class SignUpScreen extends React.Component {
//   constructor(props)
//   {
//     super(props);
//     this.state = {
//     typedPassword: '',
//     typedRepassword: '',
//     typedEmail: '',
//     typedPhone: '',
//     typedName: '',
//     user: null,
//     showError: ' ',
//     canCreateAccount: false,
//     SignUpColor: 'red',
//   }
//   };

//   SignIn = () => {
//     this.ResetFields ();
//     this.props.navigation.navigate ('SignIn');
//   };
//   ResetFields = () => {
//     this.setState ({
//       typedPassword: '',
//       typedRepassword: '',
//       typedEmail: '',
//       typedPhone: '',
//       typedName: '',
//       user: null,
//       showError: ' ',
//       canCreateAccount: false,
//       SignUpColor: 'red',
//     });
//   };

//   AddUserToDatabase=()=>{
//       UserRef.push({
//         Name:this.state.typedName,
//         Phone: this.state.typedPhone,
//         Email:this.state.typedEmail,
//         Gender:"",
//         Birthday:"10/08/2000",
//         urlAva:"",
//     });
//   }

//   SignUpWithEmailAndPassword = () => {
//     firebase
//       .auth ()
//       .createUserWithEmailAndPassword (
//         this.state.typedEmail,
//         this.state.typedPassword
//       )
//       .then (resp => {

//         this.setState ({
//           showError: 'Đã tạo tài khoản thành công',
//           SignUpColor: 'green',
//           user: resp,
//         });
//         this.AddUserToDatabase();
//       })
//       .catch (error => {
//         if (error != null)
//           this.setState ({showError: `${error}`, SignUpColor: 'red'});
//       });
//   };
//   CheckAccount = () => {
//     if (
//       this.state.typedEmail != '' &&
//       this.state.typedPassword != '' &&
//       this.state.typedRepassword != '' &&
//       this.state.typedPhone != '' &&
//       this.state.typedName != ''
//     ) {
//       this.state.typedPassword.toString () !==
//         this.state.typedRepassword.toString ()
//         ? this.setState ({
//             showError: 'Mật khẩu nhập lại không khớp',
//             SignUpColor: 'red',
//             canCreateAccount: false,
//           })
//         : this.setState ({showError: ' ', canCreateAccount: true});
//       console.log (this.state.typedRepassword, this.state.typedPassword);
//     } else
//       this.setState ({
//         showError: 'Lỗi! Chưa điền thông tin đầy đủ',
//         SignUpColor: 'red',
//       });
//     console.log (this.state.canCreateAccount);
//     if (this.state.canCreateAccount) {
//       this.SignUpWithEmailAndPassword ();
//     }
//   };
// thy cute

const SignUpScreen = ({navigation}) => {
  const [username, setUsername] = useState ();
  const [email, setEmail] = useState ();
  const [password, setPassword] = useState ();
  const [loading, setLoading] = useState (false);
  const [profilePhoto, setProfilePhoto] = useState ();
  // const firebase = useContext(FirebaseContext);
  const [_, setUser] = useContext (UserContext);

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
      alert ('We neef permissions to get access to your camera library');
      return;
    }

    pickImage ();
  };

  const getCurrentUser = () => {
    return firebase.auth ().currentUser;
  };

  const getBlob = async uri => {
    console.log ('vào getblog');
    return new Promise ((resolve, reject) => {
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

  const createUser = async user => {
    try {
      firebase
        .auth ()
        .createUserWithEmailAndPassword (user.email, user.password);
      const uid = getCurrentUser ().uid;
      let profilePhotoUrl = 'default';
      console.log ('vào create user');
      usersRef.doc (uid).set ({
        username: user.username,
        email: user.email,
        profilePhotoUrl,
      });

      if (user.profilePhoto) {
        profilePhotoUrl = uploadProfilePhoto (user.profilePhoto);
      }
      delete user.password;

      return {...user, profilePhotoUrl, uid};
    } catch (error) {
      console.log ('Error when creating user ', error.message);
    }
  };

  const uploadProfilePhoto = async uri => {
    const uid = getCurrentUser ().uid;
    console.log ('vào upload ảnh');
    try {
      // const photo = getBlob (uri);
      // console.log (photo);
      // const imageRef = firebase.storage().ref ('profilePhotos').child (uid);
      // imageRef.put (photo);
      // const url = imageRef.getDownloadURL ();
      // console.log ('Url: ' + url);
      const url='https://firebasestorage.googleapis.com/v0/b/chatapp-demo-c52a3.appspot.com/o/Logo.png?alt=media&token=af1ca6b3-9770-445b-b9ef-5f37c305e6b8';
      usersRef.doc (uid).update ({
        profilePhotoUrl: url,
      });
      return url;
    } catch (error) {
      console.log ('Error when uploading profile photo ', error.message);
    }
  };

  const signUp = async () => {
    const user = {username, email, password, profilePhoto};
    setLoading (true);
    try {
      const createdUser = createUser (user);
      setUser ({...createdUser, isLoggedIn: true});
    } catch (error) {
      console.log ('Error when sign up', error);
    } finally {
      setLoading (false);
    }
  };

  // render () {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{alignItems: 'center'}}>
        <ScrollView>
          <View style={{alignItems: 'center'}} justifyContent="center">
            <Image
              style={styles.tinyLogo}
              source={require ('../assets/Logo.png')}
            />
            <Text style={styles.hello}>Đăng ký tài khoản mới</Text>
            <TouchableOpacity
              onPress={addProfilePhoto}
              style={styles.ProfilePhotoContainer}
            >
              {profilePhoto
                ? <Image
                    style={styles.ProfilePhoto}
                    source={{uri: profilePhoto}}
                  />
                : <View style={styles.DefaultProfilePhoto}>
                    <AntDesign name="plus" size={24} color="black" />
                  </View>}
            </TouchableOpacity>

            <TextInput
              style={styles.input}
              secureTextEntry={false}
              placeholder="Họ và Tên"
              onChangeText={username => setUsername (username.trim ())}
              value={username}
            />
            <TextInput
              style={styles.input}
              secureTextEntry={false}
              keyboardType="email-address"
              placeholder="Email"
              onChangeText={email => setEmail (email.trim ())}
              value={email}
            />
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              autoCompleteType="password"
              placeholder="Họ và Tên"
              autoCorect={false}
              secureTextEntry={true}
              onChangeText={password => setPassword (password.trim ())}
              value={password}
            />

            {/* <TextInput
                style={styles.input}
                secureTextEntry={true}
                placeholder="Nhập lại mật khẩu"
                onChangeText={typedRepassword => {
                  this.setState ({typedRepassword});
                  this.setState ({showError: ' '});
                }}  
                value={this.state.typedRepassword}
              />
              <TextInput
                style={styles.input}
                keyboardType="phone-pad"
                placeholder="Số điện thoại"
                onChangeText={typedPhone => {
                  this.setState ({typedPhone});
                  this.setState ({showError: ' '});
                }}
                value={this.state.typedPhone}
              /> */}
            {/* <Text style={{color: this.state.SignUpColor}}>
                {this.state.showError}
              </Text> */}
          </View>
          <View style={{marginTop: 32, alignItems: 'center'}}>
            <TouchableOpacity
              style={styles.SignUpButton}
              // onPress={this.CheckAccount}
              onPress={signUp}
            >
              <Text style={{fontWeight: '700', fontSize: 20, color: 'white'}}>
                Đăng ký
              </Text>
            </TouchableOpacity>
            <View style={{flexDirection: 'row', marginTop: 32}}>
              <View style={{width: 30, height: 1, backgroundColor: 'black'}} />
              <Text
                style={{
                  marginTop: -10,
                  fontWeight: '700',
                  fontSize: 15,
                  color: 'black',
                }}
              >
                Hoặc
              </Text>
              <View style={{width: 30, height: 1, backgroundColor: 'black'}} />
            </View>
            <TouchableOpacity style={styles.SignUpButton}>
              <Text style={{fontWeight: '700', fontSize: 20, color: 'white'}}>
                Đăng ký với Google
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.Extra}>
            <Text style={styles.SignIn}>Bạn đã có tài khoản?</Text>
            <Text
              style={styles.SignInText}
              onPress={() => navigation.navigate ('SignIn')}
            >
              Đăng nhập tại đây
            </Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default SignUpScreen;
