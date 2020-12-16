import React, {Component} from 'react';
import {Text,
TextInput,
  //Image,
  SafeAreaView,
  View,
//   ScrollView,
//   TouchableOpacity,
} from 'react-native';
import styles from '../components/UpdateAvaScreen/Styles';
// import {AntDesign} from '@expo/vector-icons';


export class UpdateAvaScreen extends React.Component {
  constructor (props) {
    super (props);
    this.unsubscriber = null;

    //   const [profilePhoto, setProfilePhoto] = useState ();
  }

//    getPermissions =  () => {
//     if (Platform.OS !== 'web') {
//        const {status} =  Permissions.askAsync (Permissions.CAMERA_ROLL);
//       return status;
//     }
//   }

//    pickImage =  () => {
//     try {
//       let result =  ImagePicker.launchImageLibraryAsync ({
//         mediaTypes: ImagePicker.MediaTypeOptions.Images,
//         allowsEditing: true,
//         aspect: [1, 1],
//         quality: 0.5,
//       });
//       if (!result.cancelled) {
//         setProfilePhoto (result.uri);
//       }
//     } catch (error) {
//       console.log ('Error when picking image: ' + error);
//     }
//   }

//    addProfilePhoto =  () => {
//     let status =  getPermissions ();

//     if (status !== 'granted') {
//       alert ('We neef permissions to get access to your camera library');
//       return;
//     }

//     pickImage ();
//   }



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
          {/* <ScrollView>
            <View style={{alignItems: 'center'}} justifyContent="center">
              <TouchableOpacity
            //   onPress={addProfilePhoto}
              style={styles.ProfilePhotoContainer}
            >
              <View style={styles.DefaultProfilePhoto}>
                    <AntDesign name="plus" size={24} color="black" />
                  </View>}
            </TouchableOpacity>
            </View>
          </ScrollView> */}
        </View>
         </View>
      </SafeAreaView>
    );
  }
}

export default UpdateAvaScreen;
