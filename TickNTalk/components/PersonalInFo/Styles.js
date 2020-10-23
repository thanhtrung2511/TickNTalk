import {Dimensions,StyleSheet} from 'react-native'

const windowWidth=Dimensions.get('window').width;
    const windowHeight=Dimensions.get('window').height;
    const styles= StyleSheet.create({
        container:{ 
            flex:1,
            backgroundColor:"pink",
            alignItems: 'center'
        },
        ChatBox:{
            width:windowWidth/1.11,
            height:windowHeight/1.11,
            marginLeft:-32,
            backgroundColor: "#FFFF",
            borderRadius:70/5,
        },
        header:{
          fontWeight:"800",
          fontSize:30,
          color:"#FFFFFF",
          
        },
        input:{
            
            height:50,
            marginLeft:-32,
            width:windowWidth/1.11,
            borderColor:"#BAB7C3",
            borderRadius:70/5,
            backgroundColor:"#FFE5D8",
            color: "#514E5A",
            alignItems:"flex-start",
            justifyContent:"center",
            marginTop: 16
            
        },
        tinyLogo:{
          width:150,
          height:150,
          borderRadius:70/0.5,
          backgroundColor:"#9075E3",
          alignItems:"center",
          justifyContent:"center",
          marginTop: -32,
          marginLeft:-32,
        },
        hello:{
          fontWeight:"800",
          fontSize:16,
          color:"#9B9B9B",
          marginTop:windowHeight/8,
          marginLeft:32,
        },
        SignInText:{
          
          marginLeft:10,
          color: "#120C6E",
        },
        SignIn:{
          
          color: "#9B9B9B",
        },
        Extra:{
            marginTop:16,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }
    });

export default styles