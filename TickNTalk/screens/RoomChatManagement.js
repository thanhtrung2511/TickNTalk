import React from "react";
import {
  Text,
  SafeAreaView,
  View,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";

import {
  styles,
  ButtonIcon,
  colors,
  ButtonMod,
} from "../components/Basic/Basic";
import { SearchBar } from "react-native-elements";

export default class RoomChatManagements extends React.Component {
  state = {
    username: "",
    password: "",
    repassword: "",
    Email: "",
    onCreate: false,
  };
  ChatScreenNav = () => {
    this.props.navigation.navigate("Chat");
  };
  render() {
    return (
      <SafeAreaView style={styles.containerLI}>
        <KeyboardAvoidingView style={[styles.container,!this.state.onCreate?{justifyContent:"space-between"}:null]} behavior="padding">
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
              <Text style={styles.header}>Nhóm</Text>
              {this.state.onCreate?<ButtonIcon MaterialFamilyIconName="done-all" color={"whitesmoke"} onPress={()=>this.setState({onCreate:false})} size={33} />:null}
            </View>
          </View>
          {this.state.onCreate ? (
            <View
              style={{ flexDirection: "column" }}
              justifyContent="space-between"
            >
              {/* <TextInput style={styles.input}
                      placeholder="Tìm kiếm bạn bè.."
                      // clearButtonMode={Platform.OS === "ios" ? true:false}
                      onChangeText={Text=>{
                        this.onChangeSearchText(Text);
                      }}>
                </TextInput> */}

              <ScrollView style={{ maxHeight: "94%" }}>
                <SearchBar
                  platform={Platform.OS}
                  placeholder="Tìm bạn bè..."
                  lightTheme="true"
                  containerStyle={{
                    marginHorizontal: 8,
                    backgroundColor: "transparent",
                    width: "95%",
                  }}
                  inputContainerStyle={{
                    backgroundColor: "whitesmoke",
                    borderRadius: 23,
                  }}
                  leftIconContainerStyle={{ marginLeft: 16 }}
                  inputStyle={{}}
                  placeholder="Tìm kiếm nhóm.."
                  onChangeText={(Text) => {
                    this.setState({ toSearchText: Text });
                    this.onChangeSearchText(Text);
                  }}
                  value={this.state.toSearchText}
                />
              </ScrollView>
            </View>
          ) : (
            <View
              style={{ flexDirection: "column",height:100 }}
              alignItems="center"
              justifyContent="space-around"
            >
              <Text>Tạo nhóm mới</Text>
              <Text>Để có thêm nhiều điều thú vị</Text>
              <ButtonMod Text="Tạo nhóm mới" onPress={()=>this.setState({onCreate:true})}></ButtonMod>
            </View>
          )}
          <View></View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}
