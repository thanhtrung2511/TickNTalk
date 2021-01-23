import React from "react";
import {
  Text,
  View,
  SafeAreaView,
  Alert,
  AlertIOS,
  Platform,
  ScrollView,
  TouchableOpacity,
  FlatList,
  ActionSheetIOS,
} from "react-native";
// import styles from '../screens/components/profile/Styles';
import {
  styles,
  ButtonIcon,
  BasicImage,
  ButtonMod,
  colors,
  sizeFactor,
  windowWidth,
  createTwoButtonAlert,
  RenderInfoCard,
  RenderRoomInfoCard,
} from "../components/Basic/Basic";
import { ChangeRoomIDAction } from "../actions/index";
import { CountNumberOfMembers } from "../Utilities/ChatRoomUtils";
import firebase from "firebase";
import { connect } from "react-redux";
import { UserRef, MessageRef, RoomRef, storage } from "../Fire";
import "firebase/auth";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

export class ChatInfo extends React.Component {
  constructor(props) {
    super(props);
    this.unsubscriber = null;
    this.state = {
      isPairRoom: false,
      onEdit: false,
      iosRoomEdit: "",
    };
  }

  ChangeAva = () => {
    this.props.navigation.navigate("Avatar");
  };
  deleteMessage = async () => {
    await MessageRef.on("value", (snapshot) => {
      // temp list of strangers
      let msgs = [];

      snapshot.forEach((child) => {
        let msg = {
          Id: child.key,
          SenderEmail: child.toJSON().SenderEmail,
          RoomID: child.toJSON().RoomID,
          Data: child.toJSON().Data,
        };

        if (msg.Data)
          if (msg.RoomID === this.props.curRoom.RoomID) {
            firebase
              .database()
              .ref("message")
              .child("" + msg.Id)
              .remove();
          }
      });
    });
    Alert.alert(
      "Thông báo",
      "Đã xóa toàn bộ tin nhắn",
      [{ text: "OK", style: "cancel" }],
      { cancelable: false }
    );
    this.props.navigation.goBack();
  };
  async confirmDelete() {
    Alert.alert(
      "Thông báo",
      "Bạn có thật sự muốn xóa toàn bộ tin nhắn của cuộc trò chuyện này? Thao tác này sẽ không được hoàn tác",
      [
        { text: "Đồng ý", onPress: () => this.deleteMessage() },
        { text: "Hủy", style: "cancel" },
      ],
      { cancelable: false }
    );
  }
  loadGroupMembers(listMem) {
    return (
      <View>
        <Text style={{ fontWeight: "800", color: "grey" }}>
          DANH SÁCH THÀNH VIÊN
        </Text>
        <FlatList
          data={listMem}
          renderItem={({ item, index }) => {
            return <RenderRoomInfoCard urlAva={item.ava} Name={item.name} />;
          }}
        ></FlatList>
      </View>
    );
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
        console.log("before a");
        await this.uploadProfilePhoto(result.uri); // not async
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

  uploadProfilePhoto = async (uri) => {
    try {
      console.log("a");
      const photo = await this.getBlob(uri);

      //const filename = uri.substring(uri.lastIndexOf('/') + 1);

      const uploadUri =
        this.props.loggedInEmail +
        "_" +
        (Platform.OS === "ios" ? uri.replace("file://", "") : uri).substring(
          uri.lastIndexOf("/") + 1
        );

      const imageRef = storage.child(uploadUri);

      await imageRef.put(photo);
      const url = await imageRef.getDownloadURL();
      console.log(url);
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
    var newRoomData = this.props.curRoom;
    console.log(url, newRoomData);
    newRoomData.Data.RoomAva = url;
    //console.log(newRoomData);
    // console.log(Ava);
    this.props.ChangeRoomAction(newRoomData);
    RoomRef.child(newRoomData.RoomID).update({
      RoomAva: url,
    });
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

  updateRoomName(newRoomData, name) {
    newRoomData.Data.RoomName = name;
    // console.log(newRoomData);
    // console.log(name);
    this.props.ChangeRoomAction(newRoomData);
    RoomRef.child(newRoomData.RoomID).update({
      RoomName: name,
    });
  }
  onEdit(room) {
    //console.log("xxxxxxxxxxxxxxxxxxx",room);
    var newRoomData = room; //this.props.curRoom;
    if (Platform.OS === "android") {
      this.setState({ onEdit: !this.state.onEdit });
    } else if (Platform.OS === "ios") {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ["Cancel", "Đổi ảnh nhóm", "Đổi tên nhóm"],
          cancelButtonIndex: 0,
        },
        (buttonIndex) => {
          if (buttonIndex === 0) {
            // cancel action
          } else if (buttonIndex === 1) {
            this.addProfilePhoto();
          } else if (buttonIndex === 2) {
            //Đổi tên

            Alert.prompt("Đổi tên nhóm", "Nhập tên nhóm mới", [
              {
                text: "Hủy",
                //onPress: () => console.log('Cancel Pressed'),
                style: "cancel",
              },
              {
                text: "OK",
                onPress: (name) => {
                  this.updateRoomName(newRoomData, name);
                },
              },
            ]);
          }
        }
      );
    }
  }
  componentDidMount() {
    var countMember = CountNumberOfMembers(this.props.curRoom);
    this.setState({ isPairRoom: countMember == 2 });
  }
  goBack = () => {
    this.props.navigation.goBack();
  };
  render() {
    return (
      <SafeAreaView style={[styles.containerLI]}>
        <View style={styles.container}>
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
              alignItems="center"
            >
              <ButtonIcon
                MaterialFamilyIconName="arrow-back"
                size={33}
                color={colors.black}
                onPress={this.goBack}
              />
              <TouchableOpacity
                onPress={() => {
                  this.onEdit(this.props.curRoom);
                }}
              >
                {!this.state.isPairRoom ? (
                  <Text style={[styles.header, { fontSize: sizeFactor }]}>
                    {this.state.onEdit && Platform.OS === "android"
                      ? "Done"
                      : "Edit"}
                  </Text>
                ) : null}
              </TouchableOpacity>
              {/* {!this.state.isPairRoom ? (
                <Text style={[styles.header,{fontSize:sizeFactor*1.5}]} number>
                  {this.props.curRoom.Data.RoomName}
                </Text>
              ) : null} */}
            </View>
          </View>
          <View
            style={{
              flexDirection: "column",
              width: "100%",
              paddingVertical: 8,
            }}
            justifyContent="space-between"
            alignItems="center"
            backgroundColor={colors.lightpink}
          >
            <ScrollView
              style={{
                flexDirection: "column",
                padding: 8,
                backgroundColor: colors.white,
                borderRadius: 70 / 5,
                width: "90%",
                height: !this.state.isPairRoom ? "30%" : null,
              }}
              scrollEnabled={!this.state.isPairRoom}
              contentContainerStyle={{ justifyContent: "space-around",paddingVertical:8 }}
            >
              {!this.state.isPairRoom ? (
                <View>
                  <View style={{ alignItems: "center" }}>
                    <BasicImage
                      //style={{ borderColor: "whitesmoke", borderWidth: 5 }}
                      source={{
                        uri: this.props.curRoom.Data.RoomAva
                          ? this.props.curRoom.Data.RoomAva
                          : "https://firebasestorage.googleapis.com/v0/b/chatapp-demo-c52a3.appspot.com/o/Logo.png?alt=media&token=af1ca6b3-9770-445b-b9ef-5f37c305e6b8",
                      }}
                      Icon={150}
                      Round={100}
                    ></BasicImage>
                  </View>
                  <View
                    style={{
                      borderColor: colors.lightpink,
                      borderWidth: 2,
                      borderRadius: 70 / 5,
                      flexDirection: "column",
                      paddingVertical: 8,
                      paddingHorizontal: 16,
                      justifyContent: "space-around",
                      shadowOffset: { width: 1, height: 1 },
                      shadowOpacity: 0.2,
                      borderStyle: "solid",
                    }}
                  >
                    <View
                      style={{ paddingVertical: 8 }}
                      justifyContent="center"
                      flexDirection="row"
                    >
                      <Text style={{ fontSize: 16, fontWeight:"bold" }}>
                        {this.props.curRoom.Data.RoomName}
                      </Text>
                    </View>
                  </View>
                </View>
              ) : null}
              {this.state.isPairRoom ? (
                <RenderInfoCard friend={this.props.listMember[0]} />
              ) : (
                this.loadGroupMembers(this.props.listMember)
              )}
            </ScrollView>
          </View>
          <View
            style={{
              alignItems: "center",
              height: "30%",
              flexDirection: "column",
              justifyContent: "space-around",
              width: "100%",
            }}
          >
            <ButtonMod
              styleText={{ color: colors.white }}
              Text="Xóa tin nhắn"
              onPress={() => {
                this.confirmDelete();
              }}
            ></ButtonMod>
            <ButtonMod
              styleText={{ color: colors.white }}
              styleContainer={{ backgroundColor: colors.Darkpink }}
              Text="Chặn người này"
            ></ButtonMod>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
function mapStateToProps(state) {
  return {
    loggedInEmail: state.emailReducer,
    curRoom: state.roomReducer,
    listMember: state.memberReducer,
    roomData: state.roomDataReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ChangeRoomAction: (curRoom) => {
      dispatch(ChangeRoomIDAction(curRoom));
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ChatInfo);
