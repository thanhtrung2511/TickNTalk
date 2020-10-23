import {Dimensions,StyleSheet} from 'react-native'

const windowWidth=Dimensions.get('window').width;
const windowHeight=Dimensions.get('window').height;
const styles= StyleSheet.create({
    container:{ 
        flex:1,
        backgroundColor:"#FFFFFF"
    },
    header:{
      fontWeight:"800",
      fontSize:30,
      color:"#000",

    },
    input:{
        marginTop:16,
        height:50,
        width:300,
        borderColor:"#BAB7C3",
        borderRadius:70/3,
        backgroundColor:"#FFE5D8",
        color: "#514E5A",
        fontWeight:"600",
        textAlign: "center"
    },
    SignInButton:{
      width:300,
      height:50,
      borderRadius:70/3,
      backgroundColor:"lightpink",
      alignItems:"center",
      justifyContent:"center",
      marginTop: 16
    },
    FogetPassword:{
      marginTop:32,
      marginLeft:200,
      color: "blue",
    },
    hello:{
      fontWeight:"800",
      fontSize:16,
      color:"#000000",
      marginTop:64
    },
    SignUpText:{
      
      color: "blue",
      marginLeft:10
    },
    SignUp:{
      
      color: "#9B9B9B",
      
    },
    Extra:{
      marginTop:16,
      flexDirection: "row",
      justifyContent: 'center',
      alignItems: 'center',
    },
    tinyLogo:{
      width:200,
      height:200,
      alignItems:"center",
      justifyContent:"center",
    },
});
export default styles