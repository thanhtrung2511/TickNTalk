import React from 'react';
import { Platform,FlatList, TouchableOpacity, SafeAreaView, View,ScrollView, TextInput,KeyboardAvoidingView} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import Fire from "../Fire";
import {styles,ChatHeader,ChatMessage_Mine,ChatMessage_Orther,colors} from "../components/Basic/Basic"
import {Ionicons} from '@expo/vector-icons'
import {ChangeRoomIDAction,ChangeEmailAction} from "../actions/index"
import {connect} from "react-redux"
export class ChatScreen extends React.Component {
  state ={
    messages:[],
    roomName:"",
    member:[],
  }
  get user(){
    return {
      _id: Fire.uid,
      name: "Phuong Vy" //this.props.navigation.state.params.name
    }
  }
  ImageSend=() => {

  }
  goBack=()=>{
    this.props.navigation.goBack();
  }
  componentDidMount(){
  //   Fire.get(message => 
  //     this.setState(previous  =>  ({
  //       messages: GiftedChat.append(previous.messages,message)
  //     }))
  //   );
  // }


  }



  render() {
    
    // const chat=<GiftedChat messages={this.state.messages} onSend={Fire.send} user={this.user}/>;
    
    return ( 
      <SafeAreaView style={styles.containerLI}> 
      <KeyboardAvoidingView style={styles.container} behavior="padding">

        <ChatHeader ImageSource='https://firebasestorage.googleapis.com/v0/b/chatapp-demo-c52a3.appspot.com/o/Logo.png?alt=media&token=af1ca6b3-9770-445b-b9ef-5f37c305e6b8'
                    Name={this.props.curRoomID}
                    Backward={this.goBack}
        ></ChatHeader>
        
        <ScrollView style={styles.ChatContainer}>
          <ChatMessage_Orther  Content="Chao ong"
                              ImageSource='https://firebasestorage.googleapis.com/v0/b/chatapp-demo-c52a3.appspot.com/o/Logo.png?alt=media&token=af1ca6b3-9770-445b-b9ef-5f37c305e6b8'>
          </ChatMessage_Orther>
          <ChatMessage_Mine Content='Chao ba'
                              Status={true}
                              ImageSource='https://firebasestorage.googleapis.com/v0/b/chatapp-demo-c52a3.appspot.com/o/Logo.png?alt=media&token=af1ca6b3-9770-445b-b9ef-5f37c305e6b8'
          ></ChatMessage_Mine>
        </ScrollView>
        <View style={styles.ChatScreen_Bottom}>
            <TouchableOpacity onPress={this.ImageSend}>
                <Ionicons name="ios-camera" size={30} color="black" />
            </TouchableOpacity>
            <TextInput style={[styles.input,{justifyContent:"flex-start"}]}
                      placeholder="Aa"
                      multiline
                      editable
                      maxLength={40}
                      numberOfLines={4}
                      onChangeText={(typedPassword)=>{
                        // this.setState({typedPassword});
                        
                      }}
                    
                      value={this.state.password}/>
            <TouchableOpacity style={{marginLeft:16}} onPress={this.ImageSend}>
              <Ionicons name="md-send" size={30} color="black" />
            </TouchableOpacity>
        </View>
    </KeyboardAvoidingView>
    </SafeAreaView>
    )
  }
}


const mapStateToProps = (state) => {
  return{
      loggedInEmail: state.emailReducer,
      curRoomID: state.roomReducer,
  }
};

const mapDispatchToProps = (dispatch) =>{
  return {
      Update: (loggedInEmail) => {
        dispatch(ChangeEmailAction(loggedInEmail));
      },
      updateRoomID: (curID) => {
        dispatch(ChangeRoomIDAction(curID));
      },
  };
}
export default connect(mapStateToProps,mapDispatchToProps)(ChatScreen)

