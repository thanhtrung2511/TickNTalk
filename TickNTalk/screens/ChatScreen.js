import React from 'react';
import { Platform,FlatList, TouchableOpacity, SafeAreaView, View,ScrollView, TextInput} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import Fire from "../Fire";
import {styles,ChatHeader,ChatMessage_Mine,ChatMessage_Orther} from "../components/Basic/Basic"
import {Ionicons} from '@expo/vector-icons'


export default class ChatScreen extends React.Component {
  state ={
    messages:[]
  }
  get user(){
    return {
      _id: Fire.uid,
      name: "Phuong Vy" //this.props.navigation.state.params.name
    }
  }
  ImageSend=() => {

  }
  // componentDidMount(){
  //   Fire.get(message => 
  //     this.setState(previous  =>  ({
  //       messages: GiftedChat.append(previous.messages,message)
  //     }))
  //   );
  // }
  // componentWillUnmount(){
  //   Fire.off();
  // }
  render() {
    
    // const chat=<GiftedChat messages={this.state.messages} onSend={Fire.send} user={this.user}/>;
    
    return ( 
      // <SafeAreaView>
      // <SafeAreaView styles={styles.header}>
      // <Ionicons name="md-arrow-round-backward" size={14} color="#000"/> 
      // <Text fontSize={14}>Chat</Text>
      // </SafeAreaView>
    <SafeAreaView style={styles.container}>
        <ChatHeader ImageSource='https://firebasestorage.googleapis.com/v0/b/chatapp-demo-c52a3.appspot.com/o/Logo.png?alt=media&token=af1ca6b3-9770-445b-b9ef-5f37c305e6b8'
                    Name='Team Vô Duyên'
        ></ChatHeader>
        <ScrollView style={styles.ChatContainer}>
          <ChatMessage_Orther  Content='Chàhttps://firebasestorage.googleapis.com/v0/b/chatapp-demo-c52a3.appspot.com/o/Logo.png?alt=media&token=af1ca6b3-9770-445b-b9ef-5f37c305e6b8'
                              ImageSource='https://firebasestorage.googleapis.com/v0/b/chatapp-demo-c52a3.appspot.com/o/Logo.png?alt=media&token=af1ca6b3-9770-445b-b9ef-5f37c305e6b8'
          ></ChatMessage_Orther>
           <ChatMessage_Mine Content='Chàhttps://firebasestorage.googleapis.com/v0/b/chatapp-demo-c52a3.appspot.com/o/Logo.png?alt=media&token=af1ca6b3-9770-445b-b9ef-5f37c305e6b8'
                              Status={true}
                              ImageSource='https://firebasestorage.googleapis.com/v0/b/chatapp-demo-c52a3.appspot.com/o/Logo.png?alt=media&token=af1ca6b3-9770-445b-b9ef-5f37c305e6b8'
          ></ChatMessage_Mine>
        </ScrollView>
        <View style={styles.ChatScreen_Bottom}>
            <TouchableOpacity onPress={this.ImageSend}>
                <Ionicons name="ios-camera" size={30} color="black" />
            </TouchableOpacity>
            <TextInput style={styles.ChatScreen_input}
                      placeholder="Aa"
                      onChangeText={(typedPassword)=>{
                        this.setState({typedPassword});
                        this.setState({showError:false})
                      }}
                      value={this.state.password}/>
            <TouchableOpacity style={{marginLeft:16}} onPress={this.ImageSend}>
              <Ionicons name="md-send" size={30} color="black" />
            </TouchableOpacity>
        </View>
    </SafeAreaView>
    // </SafeAreaView>
    )
  }
}


