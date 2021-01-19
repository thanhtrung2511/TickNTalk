import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  Alert,
} from "react-native";
import React, { Component } from "react";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { color } from "react-native-reanimated";
export const windowWidth = Dimensions.get("window").width;
export const windowHeight = Dimensions.get("window").height;

//UNIVERSAL SIZE UNIT
export const sizeFactor = windowWidth / 25.7;

export const colors = {
  red: "#ff3b30",
  darkgrey: "#424242",
  orange: "#ff9500",
  yellow: "#ffcc00",
  green: "#34c759",
  blue: "#007aff",
  indigo: "#5856d6",
  purple: "#af52de",
  pink: "#ff94c2",
  lightpink: "#ffc1e3",
  gray: "#8e8e93",
  dark: "#48484a",
  redDark: "#d70015",
  greenDark: "#32a852",
  gray2: "#aeaeb2",
  gray3: "#c7c7cc",
  gray5: "#e5e5ea",
  gray6: "#f2f2f7",
  white: "#ffffff",
  black: "#000000",
  skin: "#FFF5D8",
  fushia: "#FF00FF",
  cyan: "lightblue",
  Darkpink: "#f06292",
  // red: "#ff3b30",
  // orange: "#ff9500",
  // yellow: "#ffcc00",
  // green: "#34c759",
  // blue: "#007aff",
  // indigo: "#5856d6",
  // purple: "#af52de",
  // pink: "#f29bd4",
  // lightpink: "#f7e0f4",
  // gray: "#8e8e93",
  // dark: "#48484a",
  // redDark: "#d70015",
  // greenDark: "#32a852",
  // gray2: "#aeaeb2",
  // gray3: "#c7c7cc",
  // gray5: "#e5e5ea",
  // gray6: "#f2f2f7",
  // white: "#ffffff",
  // black: "#000000",
  // skin:"#FFF5D8",
  // fushia:"#FF00FF",
  // cyan: "lightblue",
  // primary: '#283593',
  //   primaryLight: '#5f5fc4',
  //   primaryDark: '#001064',
  //   secondary: '#d32f2f',
  //   secondaryLight: '#ff6659',
  //   secondaryDark: '#9a0007',
  //   red: '#f20544',
  //   blue: '#85b4f2',
  //   green: '#43a047',
  //   lightGreen: '#76d275',
  //   greenPastel: '#04d9b2',
  //   darkGreen: '#00701a',
  //   blueGreen: '#03a688',
  //   purpleBlue: '#5550f2',
  //   yellow: '#fdd835',
  //   pink: '#d773d9',
  //   darkPink: '#e91e63',
  //   purple: '#7b1fa2',
  //   skin: '#f29991',
  //   orange: '#e64a19',
  //   lightBlack: "#2d3436",
  //   paleWhite: "#dfe6e9",
  //   white: "#fff",
  //   black: "#000",
};
export const styles = StyleSheet.create({
  containerLI: {
    height: windowHeight,
    width: windowWidth,
    alignItems: "center",
    backgroundColor: colors.lightpink,
  },
  container: {
    height: windowHeight * 0.97,
    width: windowWidth,
    alignItems: "center",
    backgroundColor: colors.white,
  },
  ProfilePhotoContainer: {
    backgroundColor: "#dfe6e9",
    width: 250,
    height: 250,
    borderRadius: 150,
    alignSelf: "center",
    marginTop: 16,
    overflow: "hidden",
  },
  sendingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    color: colors.gray6,
  },
  DefaultProfilePhoto: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    backgroundColor: colors.whitesmoke,
  },

  ProfilePhoto: {
    flex: 1,
  },

  text: {
    fontSize: sizeFactor,
    marginBottom: sizeFactor * 0.75,
  },
  inputText: {
    fontSize: sizeFactor * 1.5,
    marginBottom: sizeFactor * 0.75,
  },
  headerLI: {
    fontWeight: "800",
    fontSize: sizeFactor * 2,
    color: colors.Darkpink,
    marginTop: -20,
  },
  header: {
    fontWeight: "800",
    fontSize: sizeFactor * 2,
    marginTop: 0,
    color: "whitesmoke",
    paddingVertical: 8,
  },
  mini_header: {
    fontWeight: "800",
    width: "80%",
    fontSize: sizeFactor * 2,
    color: colors.darkgrey,
  },
  hello: {
    marginTop: 32,
    fontWeight: "800",
    fontSize: 16,
    color: colors.Darkpink,
    marginBottom: 16,
  },
  background: {
    flex: 1,
    backgroundColor: colors.gray6,
  },
  title: {
    fontSize: sizeFactor * 1.75,
    fontWeight: "bold",
    marginVertical: sizeFactor,
    marginHorizontal: sizeFactor * 1.25,
    color: "black",
  },

  input: {
    marginTop: sizeFactor * 0.75,
    height: sizeFactor * 3,
    width: sizeFactor * 21.7,
    borderRadius: 70 / 3,
    backgroundColor: "whitesmoke",
    fontWeight: "600",
    textAlign: "center",
    marginBottom: sizeFactor * 0.5,
  },
  inputGroup: {
    marginTop: sizeFactor,
    marginBottom: sizeFactor,
    height: sizeFactor * 3,
    width: sizeFactor * 19,
    borderRadius: 70 / 3,
    backgroundColor: colors.skin,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: sizeFactor * 0.5,
  },
  FogetPassword: {
    marginTop: -sizeFactor * 0.5,
    marginLeft: sizeFactor * 14,
    color: colors.blue,
    marginTop: 16,
    fontWeight:"600"
  },
  Login_button: {
    width: sizeFactor * 15,
    height: sizeFactor * 3.7,
    borderRadius: 99,
    backgroundColor: colors.Darkpink,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
  },
  MessageCard: {
    paddingTop: sizeFactor * 0.25,
    paddingBottom: sizeFactor * 0.25,
    paddingHorizontal: sizeFactor,
    width: windowWidth,
    borderRadius: 15,
    borderColor: colors.pink,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.white,
  },
  Login_text: {
    fontSize: sizeFactor * 1.5,
    fontWeight: "700",
    color: colors.white,
  },
  Simple_button: {
    width: sizeFactor * 17,
    height: sizeFactor * 3,
    borderRadius: 70 / 3,
    backgroundColor: colors.pink,
    alignItems: "center",
    justifyContent: "center",
  },
  Simple_text: {
    fontWeight: "700",
    fontSize: 16,
    color: colors.black,
  },
  SignText: {
    color: colors.blue,
    marginLeft: 10,
    fontWeight:"600",
  },
  Sign: {
    color: colors.black,
  },
  Extra: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  SmallButton: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    //backgroundColor: "red",
    width: 50,
    height: 50,
    borderRadius: 70 / 5,
  },
  ChatBox: {
    padding: sizeFactor * 0.5,
    backgroundColor: colors.white,
    borderRadius: 70 / 5,
  },
  customActionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  ChatScreen_Banner: {
    width: windowWidth,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal:8,paddingVertical: 8,
  },
  ChatScreen_Bottom: {
    width: windowWidth,
    minHeight: sizeFactor * 3,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  ChatScreen_input: {
    height: sizeFactor * 2.3,
    width: sizeFactor * 17,
    borderRadius: 70 / 3,
    backgroundColor: colors.skin,
    fontWeight: "600",
    textAlign: "left",
    marginLeft: sizeFactor * 0.5,
  },
  ChatContainer: {
    flex:1,
    width: windowWidth,
    backgroundColor: "whitesmoke",
  },
  ChatMessage: {
    width: windowWidth * 0.8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },

  profileImgContainer: {
    borderRadius: 75,
    width: 130,
    height: 130,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  profileImg: {
    width: 130,
    height: 130,
    borderRadius: 75,
  },
});
export const MessageCard = (props) => {
  return (
    <TouchableOpacity style={styles.MessageCard} onPress={props.onPress}>
      <BasicImage Icon={50} source={{ uri: props.ImageSource }} Round={100}></BasicImage>
      <View
        style={{
          paddingTop: 5,
          paddingLeft: 5,
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontWeight: "800",
            fontSize: sizeFactor,
            color: colors.black,
          }}
        >
          {props.Name}
        </Text>
        <Text
          style={{
            width: sizeFactor * 19,
            fontWeight: props.isRead == "true" ? "100" : "600",
          }}
          numberOfLines={1}
          ellipsizeMode={"tail"}
        >
          {props.LastestChat}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
export const LoginButton = (props) => {
  return (
    <TouchableOpacity
      style={[styles.Login_button, props.style]}
      onPress={props.onPress}
    >
      <Text style={[styles.Login_text, props.styleText]}>{props.Text}</Text>
    </TouchableOpacity>
  );
};
export const ButtonMod = (props) => {
  return (
    <TouchableOpacity
      style={[styles.Simple_button, props.styleContainer]}
      onPress={props.onPress}
    >
      <Text style={[styles.Simple_text, props.styleText]}>{props.Text}</Text>
    </TouchableOpacity>
  );
};
export const ButtonIcon = (props) => {
  return (
    <TouchableOpacity style={[styles.SmallButton,props.style]} onPress={props.onPress}>
      <MaterialIcons
        name={props.MaterialFamilyIconName}
        size={props.size}
        color={props.color}
      ></MaterialIcons>
    </TouchableOpacity>
  );
};
export const BasicImage = (props) => {
  return (
    <Image
      style={[{
        width: props.Icon,
        height: props.Icon,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: props.Round,

      },props.style]}
      source={props.source}
    />
  );
};
export const ChatMessage_Orther = (props) => {
  return (
    <View style={{ alignItems: "flex-start", marginTop: 16 }}>
      <View style={styles.ChatMessage}>
        <BasicImage Icon={30} source={{ uri: props.ImageSource }}></BasicImage>
        <Text
          style={{
            backgroundColor: colors.lightpink,
            borderRadius: 70 / 4,
            marginLeft: 8,
            maxWidth: sizeFactor * 18,
          }}
          wrapped={true}
        >
          {props.Content}
        </Text>
      </View>
    </View>
  );
};
export const ChatMessage_Mine = (props) => {
  return (
    <View style={{ alignItems: "flex-end", marginTop: 16 }}>
      <Text
        wrapped={true}
        style={{ backgroundColor: colors.lightpink, maxWidth: sizeFactor * 18 }}
      >
        {props.Content}
      </Text>
      <Text style={{ marginTop: 10, fontSize: 12, fontWeight: "100" }}>
        {props.Status === true ? "Đã xem lúc" : "Đã gửi lúc"}
        {props.Time}
      </Text>
    </View>
  );
};
export const ChatHeader = (props) => {
  return (
    <View style={styles.ChatScreen_Banner}>
      <ButtonIcon MaterialFamilyIconName="arrow-back" onPress={props.goBack} size={24} color={colors.black}/>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          width:"auto",
          height:"auto",
        }}
        onPress={props.goToInfo}
      >
        <BasicImage Icon={35} Round={100} source={{ uri: props.ImageSource }}></BasicImage>

        <Text
          style={{
            marginLeft: 16,
            fontWeight: "800",
            width: sizeFactor * 10,
            fontSize: sizeFactor,
            color: colors.black,
          }}
          numberOfLines={1}
          ellipsizeMode={"tail"}
        >
          {props.Name}
        </Text>
      </TouchableOpacity>
      <ButtonIcon MaterialFamilyIconName="call" onPress={props.Call} size={24} color={colors.black}/>
      <ButtonIcon MaterialFamilyIconName="videocam" onPress={props.Video} size={24} color={colors.black}/>
    </View>
  );
};
export const LoginBottom = (props) => {
  return (
    <View style={props.style}>
      <View style={{ alignItems: "center" }}>
        <ButtonMod
          styleText={{ color: colors.white }}
          onPress={props.OnPressNormal}
          Text={props.TextNormal}
        ></ButtonMod>
        <View
          style={{
            flexDirection: "row",
            marginHorizontal: 32,
            marginVertical: 24,
          }}
        >
          <View
            style={{ width: 30, height: 1, backgroundColor: "black" }}
          ></View>
          <Text
            style={{
              marginTop: -10,
              fontWeight: "700",
              fontSize: 15,
              color: "black",
            }}
          >
            Hoặc
          </Text>
          <View
            style={{ width: 30, height: 1, backgroundColor: "black" }}
          ></View>
        </View>
        <ButtonMod
          styleText={{ color: colors.white }}
          OnPress={props.OnPressGoogle}
          Text={props.TextGoogle}
        ></ButtonMod>
      </View>
      <View style={styles.Extra}>
        <Text style={styles.Sign}>{props.TextStatic}</Text>
        <Text style={styles.SignText} onPress={props.Sign}>
          {props.TextNav}
        </Text>
      </View>
    </View>
  );
};
export const createOneButtonAlert = (props) =>
  Alert.alert(
    "Thông báo",
    props.Text,
    [
      {
        text: props.TextAction,
        onPress: () => {
          props.onPress;
        },
      },
    ],
    
  );
export const createTwoButtonAlert = (props) =>
  Alert.alert(
    "Thông báo",
    props.Content,
    [
      {
        text: props.cancelBtnText,
        onPress: () => {
          props.onPressCancel;
        },
        style: "cancel",
      },
      {
        text: props.okBtnText,
        onPress: () => 
          props.onPressOK
        ,
      },
    ],
    { cancelable: false }
  );
