import React from "react";
import {
  Text,
  View,
  SafeAreaView,
  Alert,
  TextInput,
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
import { ChangeRoomIDAction,ChangeMemberAction,ChangeMemberStateAction } from "../actions/index";
import { CountNumberOfMembers ,getFriendForChatScr,RemoveUserFromRoom} from "../Utilities/ChatRoomUtils";
import firebase from "firebase";
import { connect } from "react-redux";
import { UserRef, MessageRef, RoomRef, storage } from "../Fire";
import "firebase/auth";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

const safeAndroid=Platform.OS==="android"?25:0
export class ChatInfo extends React.Component {
  constructor(props) {
    super(props);
    this.unsubscriber = null;
    this.state = {
      isPairRoom: false,
      onEdit: false,
      androidName: "",
      androidAva: "",
      listMemberRoom:[],
    };
  }

  ChangeAva = () => {
    this.props.navigation.navigate("Avatar");
  };
  deleteMessage = async () => {
    // var result,index;
    // await RoomRef.on("value", (snapshot) => {
    //   snapshot.forEach((child) => {
    //     let room = {
    //       Id: child.key,
    //       Data:child.toJSON(),
    //     };
    //     if (room.Data)
    //       if (room.Id === this.props.curRoom.RoomID) {
    //         for (var i in room.Data.Members)
    //         if (room.Data.Members[i].toUpperCase()===this.props.loggedInEmail.toUpperCase())
    //         {
    //         result=room;
    //         index=i;
    //         }
    //       }
    //   });
    // });
    // await RoomRef
    //         .child(""+result.Id).child("Members").child(""+index)
    //         .remove();
    RemoveUserFromRoom(this.props.curRoom, this.props.loggedInEmail);
    Alert.alert(
      "Thông báo",
      "Đã rời khỏi nhóm",
      [{ text: "OK", style: "cancel" }],
      { cancelable: false }
    );
    this.props.navigation.replace("Login");
  };
  async confirmDelete() {
    Alert.alert(
      "Thông báo",
      "Bạn có thật sự muốn chặn cuộc trò chuyện này? Thao tác này sẽ không được hoàn tác",
      [
        { text: "Đồng ý", onPress: () => this.deleteMessage() },
        { text: "Hủy", style: "cancel" },
      ],
      { cancelable: false }
    );
  }
  loadGroupMembers(listMem) {
    return (
      <ScrollView style={{ maxHeight: "30%"}} scrollEnabled>
        <Text style={{ fontWeight: "bold", color: "grey" }}>
          DANH SÁCH THÀNH VIÊN
        </Text>
        <FlatList
          data={listMem}
          renderItem={({ item, index }) => {
            return !item.isVirtual? <RenderRoomInfoCard urlAva={item.ava} Name={item.name} />:null;
          }}
        ></FlatList>
      </ScrollView>
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
       // console.log("before a");
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
    //  console.log("a");
      const photo = await this.getBlob(uri);

      //const filename = uri.substring(uri.lastIndexOf('/') + 1);

      const uploadUri =this.props.curRoom.Data.RoomName?this.props.curRoom.Data.RoomName:
        this.props.ListMember[0].name +
        "_" +
        (Platform.OS === "ios" ? uri.replace("file://", "") : uri).substring(
          uri.lastIndexOf("/") + 1
        );

      const imageRef = storage.child(uploadUri);

      await imageRef.put(photo);
      const url = await imageRef.getDownloadURL();
     // console.log(url);
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
    //console.log(url, newRoomData);
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
  componentDidUpdate = (previousProp, previousState) => {
    if (
      (previousProp.curRoom !== this.props.curRoom) ||
      (previousState.androidName !== this.state.androidName )||
      (previousState.androidName !== this.state.androidName )
    ) {
      if (!this.state.onEdit) {
        //("edit", this.state.androidAva);
           this.updateRoomName(this.props.curRoom, this.state.androidName);
         }
    }
  };
  componentDidUpdate(previousProp,previousState){
    
  }
  async onEdit(room) {
    //console.log("xxxxxxxxxxxxxxxxxxx",room);
    var newRoomData = room; //this.props.curRoom;
    if (Platform.OS === "android") {
          var result;
          if (this.state.onEdit)
          result=false;
          else result=true;
        this.setState({ onEdit: result});
    
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
  changeMemberState(){
    this.props.ChangeMemberState(true);
    this.props.navigation.replace("RoomManager");
  }
  componentDidMount() {
    var countMember = CountNumberOfMembers(this.props.curRoom);
    this.setState({
      isPairRoom: countMember == 2,
      androidName: this.props.curRoom.Data.RoomName,
      androidAva: this.props.curRoom.Data.RoomAva,
      listMemberRoom:this.props.listMember,
    });
    var checkVirtual=false;
    for(var i in this.props.listMember)
    {
      if (this.props.listMember[i].isVirtual)
      {
        checkVirtual = true;
        break;
      }
    }
    if ((countMember!==2)&&(!checkVirtual))
    {
    var list=this.props.listMember;
    var thisuser = getFriendForChatScr(this.props.loggedInEmail);
    var virtual1=getFriendForChatScr();
    virtual1.isVirtual=true;
    var virtual2=getFriendForChatScr();
    virtual2.isVirtual=true;
    list.push(virtual1);
    list.push(virtual2);
    list.push(thisuser);
    this.props.ChangeMember(list);
    }
  }
  goBack = () => {
    this.props.navigation.replace("ChatScr");
  };
  render() {
    return (
      <SafeAreaView style={[styles.containerLI,{paddingTop:safeAndroid}]}>
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
                    {this.state.onEdit &&Platform.OS==="android"? "Done" : "Edit"}
                  </Text>
                ) : null}
              </TouchableOpacity>
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
                height: !this.state.isPairRoom ? "60%" : null,
              }}
              scrollEnabled={false}
              contentContainerStyle={{
                justifyContent: "space-around",
                paddingVertical: 8,
              }}
            >
              {!this.state.isPairRoom ? (
                <View>
                  <TouchableOpacity
                    style={{ alignItems: "center" }}
                    onPress={() => {
                      if (this.state.onEdit) {
                        this.addProfilePhoto();
                      }
                    }}
                  >
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
                  </TouchableOpacity>
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
                      style={{ paddingVertical: 8, marginBottom: 8 }}
                      justifyContent="center"
                      flexDirection="row"
                    >
                      {!this.state.onEdit ? (
                        <Text style={{ fontSize: 24, fontWeight: "bold" }}>
                          {this.props.curRoom.Data.RoomName}
                        </Text>
                      ) : (
                        <TextInput
                          enabled={this.state.onEdit}
                          header="Tên nhóm"
                          style={styles.input}
                          value={this.state.androidName}
                          onChangeText={(text) =>{
                            
                            this.setState({ androidName: text })}
                          }
                        />
                      )}
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
              height: "20%",
              flexDirection: "column",
              justifyContent: "space-around",
              width: "100%",
            }}
          >
            <ButtonMod
              styleText={{ color: colors.white }}
              Text={this.state.isPairRoom?"Hủy kết bạn":"Rời khỏi nhóm"}
              onPress={() => {
                this.confirmDelete();
              }}
            ></ButtonMod>
            {this.state.isPairRoom?null:<ButtonMod
              styleText={{ color: colors.white }}
              styleContainer={{ backgroundColor: colors.Darkpink }}
              Text="Chỉnh sửa danh sách thành viên"
              onPress={()=>{
                this.changeMemberState();
              }}
            />}
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
    ChangeMember:(member) => {
      dispatch(ChangeMemberAction(member));
    },
    ChangeMemberState:(member)=>{
      dispatch(ChangeMemberStateAction(member));
    }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ChatInfo);
