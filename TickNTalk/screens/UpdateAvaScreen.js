import React from "react";
import {
  View,
  Platform,
  TouchableOpacity,
  Text,
  StatusBar,
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

// import {Text} from '../Text';
import "firebase/auth";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import { connect } from "react-redux";
import {
  colors,
  styles,
  ButtonMod,
  createTwoButtonAlert,
  createOneButtonAlert,
} from "../components/Basic/Basic";
import { ChangeAvaAction } from "../actions/index";
import { UserRef, storage, uidR } from "../Fire";

class UpdateAvaScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //  profilePhoto: 'file:/data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FTickNTalk-0ee41aaa-0318-4a38-b9da-af589c62c4eb/ImagePicker/2717ec9d-86b8-4ef3-a276-5aa0d9d8d1a7.png',
      profilePhoto: this.props.uriAva,
      loading: null,
    };
  }

  componentDidUpdate() {
    //console.log("thycute : " + this.props.uriAva);
  }

  getPermissions = async () => {
    if (Platform.OS !== "web") {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      return status;
    }
  };

  pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });
      if (!result.cancelled) {
        this.props.ChangeAvaAction(result.uri); // not async
      }
    } catch (error) {
      createOneButtonAlert({
        Text: "Đã có lỗi xảy ra trong lúc chọn ảnh",
        TextAction: "Đồng ý",
      });
      //console.log("Error when picking image: " + error);
    }
  };

  addProfilePhoto = async () => {
    const status = await this.getPermissions();

    if (status !== "granted") {
      alert("We need permissions to get access to your camera library");
      return;
    }

    this.pickImage();
  };

  logInWithGoogle = async () => {
    await firebase.logInWithGoogle();
  };

  uploadProfilePhoto = async (uri) => {
    try {
      //console.log("a");
      const photo = await this.getBlob(uri);

      //const filename = uri.substring(uri.lastIndexOf('/') + 1);

      const uploadUri =
        this.props.typedEmail +
        "_" +
        (Platform.OS === "ios" ? uri.replace("file://", "") : uri).substring(
          uri.lastIndexOf("/") + 1
        );

      const imageRef = storage.child(uploadUri);

      await imageRef.put(photo);
      const url = await imageRef.getDownloadURL();
      this.EditUrlAva(url);

      return url;
    } catch (error) {
      createOneButtonAlert({
        Text: "Đã có lỗi xảy ra trong lúc cập nhật ảnh",
        TextAction: "Đồng ý",
      });
      //console.log("Error when uploading profile photo ", error.message);
    }
  };

  EditUrlAva = (url) => {
    var ref = UserRef.orderByChild("Email").equalTo(this.props.typedEmail);
    var urlTmp = url;
    ref.once("value").then(function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        childSnapshot.ref.update({
          urlAva: urlTmp,
        });
      });
    });
    Alert.alert(
      'Thông báo',
      'Cập nhật ảnh đại diện thành công',
      [
        
        {text: "Đồng ý", style: 'cancel',onPress:()=> this.props.navigation.goBack(),},
      ],
      { cancelable: false }
    );
  };

  getBlob = async (uri) => {
    //console.log("Uri get blob: " + uri);
    return await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.onload = () => {
        resolve(xhr.response);
      };
      xhr.onerror = () => {
        reject(new TypeError("Network request fails"));
      };

      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });
  };

  componentDidMount() {
    var tmpuri = "";
    UserRef.orderByChild("Email")
      .equalTo(this.props.typedEmail)
      .on("value", (snap) => {
        snap.forEach((element) => {
          tmpuri = element.toJSON().urlAva;
          this.props.ChangeAvaAction(tmpuri);
        });
      });
  }

  render() {
    return (
      <SafeAreaView style={styles.containerLI}>
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          <View
            style={{
              backgroundColor: colors.lightpink,
              width: "100%",
              alignItems: "center",
            }}
          >
            <View
              style={{ width: "90%" }}
              justifyContent="space-between"
              flexDirection="row"
            >
              <Text style={styles.header}>Cập nhật ảnh đại diện</Text>
            </View>
          </View>

          {/* //<ProfilePhotoContainer onPress={addProfilePhoto}> */}
          <TouchableOpacity
            style={styles.ProfilePhotoContainer}
            onPress={this.addProfilePhoto}
          >
            {this.props.uriAva ? (
              <Image
                style={styles.ProfilePhoto}
                source={{ uri: this.props.uriAva }}
              />
            ) : (
              <View style={styles.DefaultProfilePhoto}>
                <AntDesign
                  name="plus"
                  size={24}
                  color={`${colors.primaryDark}`}
                />
              </View>
            )}
          </TouchableOpacity>

          <ButtonMod
            styleContainer={{ fontSize: 20, color: "green", marginTop: 50 }}
            // onPress={uploadProfilePhoto(this.state.profilePhoto)}
            onPress={() => {
              Alert.alert(
                'Thông báo',
                'Bạn có muốn cập nhật ảnh đại diện',
                [
                  {text: 'Đồng ý', onPress: () => this.uploadProfilePhoto(this.props.uriAva)},
                  {text: 'Hủy', style: 'cancel'},
                ],
                { cancelable: false }
              );
              
            }}
            Text="Thay đổi ảnh"
          />
          <StatusBar barStyle="light-content" />
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}
function mapStateToProps(state) {
  return {
    typedEmail: state.emailReducer,
    typedName: state.nameReducer,
    typedBirthday: state.birthdayReducer,
    typedPhone: state.phoneReducer,
    typedGender: state.genderReducer,
    uriAva: state.avaReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ChangeAvaAction: (uriAva) => {
      dispatch(ChangeAvaAction(uriAva));
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(UpdateAvaScreen);
