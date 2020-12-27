import {
        Dimensions,StyleSheet,
        View, Text, Image,
        TouchableOpacity
}
from 'react-native';
import React, { Component } from 'react';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { MaterialIcons } from '@expo/vector-icons';
export const windowWidth = Dimensions.get("window").width;
export const windowHeight = Dimensions.get("window").height;

//UNIVERSAL SIZE UNIT
export const sizeFactor = windowWidth / 25.7;

export const colors = {
    red: "#ff3b30",
    orange: "#ff9500",
    yellow: "#ffcc00",
    green: "#34c759",
    blue: "#007aff",
    indigo: "#5856d6",
    purple: "#af52de",
    pink: "#ff2d55",
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
    skin:"#FFE5D8",
};
export const styles=StyleSheet.create({
    container: {
        marginHorizontal: sizeFactor,
        marginBottom: sizeFactor * 0.75,
        paddingTop: sizeFactor,
        paddingBottom: sizeFactor * 0.25,
        paddingHorizontal: sizeFactor,
        borderRadius: sizeFactor,
        //backgroundColor:"pink",
    },
    text: {
        fontSize: sizeFactor,
        marginBottom: sizeFactor * 0.75,
    },
    inputText: {
        fontSize: sizeFactor * 1.5,
        marginBottom: sizeFactor * 0.75,
    },
    header:{
        fontWeight:"800",
        fontSize:sizeFactor*2,
        color:colors.black,
      },
    hello:{
        fontWeight:"800",
        fontSize:16,
        color:colors.black,
        marginTop:sizeFactor*3,
        marginLeft:32,
        marginBottom:sizeFactor * 3,
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
    image_icon:{
        width:50,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        borderRadius:70/3,
        backgroundColor:colors.black
    },
    input:{
        marginTop:sizeFactor,
        marginBottom:sizeFactor,
        height:sizeFactor*3,
        width:sizeFactor*20,
        borderRadius:70/3,
        backgroundColor:colors.skin,
        fontWeight:"600",
        textAlign: "center",

        borderColor:"#BAB7C3",
        color: "#514E5A",
        alignItems:"center",
        justifyContent:"center",
    },
    FogetPassword:{
        marginTop:32,
        marginLeft:200,
        color: colors.blue,
      },
    Login_button:{
        width:sizeFactor*20,
        height:sizeFactor*5,
        borderRadius:99,
        backgroundColor:"lightpink",
        alignItems:"center",
        justifyContent:"center",
        marginTop: 16
      },
    MessageCard: {
        marginHorizontal: sizeFactor,
        marginBottom: sizeFactor * 0.75,
        paddingTop: sizeFactor,
        paddingBottom: sizeFactor * 0.25,
        paddingHorizontal: sizeFactor,
        borderRadius: sizeFactor,
        flexDirection:'row',
        justifyContent:"space-between", 
        backgroundColor:'transparent', 
        alignItems:'flex-end'
    },
    Login_text:{
        fontSize:30,
        fontWeight:'700',
        color:"#FFFFFF"
    },
    Simple_button:{
        
        width:sizeFactor*20,
        height:sizeFactor*3,
            borderRadius:70/3,
            backgroundColor:"lightpink",
            alignItems:"center",
            justifyContent:"center",
            marginTop: 16
        
    },
    Simple_text:{
        fontWeight:"700", fontSize:20, color:'white'
    },
    SignText:{
      
        color: colors.blue,
        marginLeft:10
      },
      Sign:{
        
        color: colors.black,
        
      },
      Extra:{
        marginTop:16,
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
      },
      SmallButton:{
        alignItems:'center',
        marginTop:10,
        flexDirection:'row',
        justifyContent:"center",
        backgroundColor: 'rgba(0, 0, 0, 0)',
        width:50,
        borderRadius: 70/5
      },
      ChatBox:{
        width:sizeFactor*23,
        height:windowHeight/1.11,
        marginLeft:-3*sizeFactor,
        paddingHorizontal: sizeFactor,
        backgroundColor: "#FFFF",
        borderRadius:70/5,
    },
})
export class MessageCard extends Component
{
    render(){
    return (
      <View style={styles.MessageCard} onPress={this.props.onPress}>
        <BasicImage icon="true"
        source={{uri:this.props.ImageSource}}></BasicImage>       
        <View style={{  marginTop:10,
                        marginLeft:5,
                        flexDirection:'column', 
                        justifyContent:"flex-start"
                    }}>
          <Text 
              style={{fontWeight:"800",
              fontSize:sizeFactor,
              color:colors.black}}
          >  
              {this.props.Name}
          </Text>
          <Text style={{width:sizeFactor*15,
                        fontWeight:this.props.isRead == 'true'? '100': '600'}} 
                numberOfLines={1} 
                ellipsizeMode={'tail'}> 
                {this.props.LastestChat}
          </Text>
        </View>
      </View>
    );
        }
}
export const LoginButton=(props)=>{
    return(
        <TouchableOpacity style={styles.Login_button} onPress={props.onPress}>
                  <Text style={styles.Login_text}>{props.Text}
                </Text>
        </TouchableOpacity>
    )
}
export const Button=(props)=>{
    return(
        <TouchableOpacity style={styles.Simple_button} onPress={props.onPress}>
                  <Text style={styles.Simple_text}>{props.Text}
                </Text>
        </TouchableOpacity>
    )
}
export const ButtonIcon=(props)=>{
    return(
        <TouchableOpacity style={styles.SmallButton} onPress={props.onPress}>
        <MaterialIcons name={props.MaterialFamilyIconName} size={props.size} color={'black'}></MaterialIcons>
        </TouchableOpacity>
    )
}
export const BasicImage=(props)=>{
    return(
        <Image style={{width:props.icon=='false'?200:50,
            height:props.icon=='false'?200:50,
            alignItems:"center",
            justifyContent:"center",
            borderRadius:70/3,}}
            source={props.source}/>
    )
}
export const LoginBottom=(props) =>{
    return (
        <View>
        <View style={{marginLeft:16,marginTop:32,alignItems:"center"}}>
                <Button onPress={props.OnPressNormal} Text={props.TextNormal}></Button>
                <View style={{flexDirection:'row',marginTop:32}}> 
                <View style={{width:30,height:1,backgroundColor:'black'}}>
                </View>
                <Text style={{marginTop:-10,fontWeight:"700", fontSize:15, color:'black'}}>Hoặc</Text>
                <View style={{width:30,height:1,backgroundColor:'black'}}>
                </View>
                </View>
                <Button OnPress={props.OnPressGoogle} Text={props.TextGoogle}></Button>
                
              </View>
              <View style={styles.Extra}>
              <Text style={styles.Sign}>{props.TextStatic}</Text>
              <Text style={styles.SignText} onPress={props.Sign}>{props.TextNav}</Text>
        </View>
        </View>
    )
}