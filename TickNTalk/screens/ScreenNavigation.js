import { createBottomTabNavigator } from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import React from 'react'

import LoginScreen from './LoginScreen'
//import ChatScreen from './ChatScreen'
import ResetPassword from './ResetPassword'
import PersonalInfo from './PersonalInfo'
import PersonalInfoEdit from './PersonalInfoEdit'
import ChatFeed from './ChatFeed'
import ChatInfo from './ChatInfo'
import RoomChatManagement from './RoomChatManagement'
import SignInScreen from './SignInScreen'
import SignUpScreen from './SignUpScreen'
import ChangePass from './ChangePass'
import UpdateAvaScreen from './UpdateAvaScreen'
import SignUpCont from './SignUpCont'
import ChatScreen_GiftedChat from './ChatScreen_GiftedChat'
import {colors} from '../components/Basic/Basic'
import { MaterialCommunityIcons,MaterialIcons,AntDesign } from '@expo/vector-icons';

import {Text,View} from 'react-native'
import {connect} from 'react-redux'
import { ChangeLoginStatus } from '../actions';

const TabNavigator= createBottomTabNavigator(
    {
    ChatFeed:{
        screen: ChatFeed,
        navigationOptions:{
            tabBarLabel:({ focused, tintColor }) => (
                <View style={{alignItems:"center"}}><Text  style={{fontSize:12,color:focused?colors.Darkpink:colors.black}} >Tin nhắn</Text></View>
              ),      
            tabBarOption:{
                tabStyle:{
                    paddingVertical: 10
                },
                styles:{
                    height:50,
                    backgroundColor:'white',
                    elevation: 10,
                    borderTopWidth: 0
                },
                labelStyle:{
                    margin:0,
                    padding:0,
                },
                showIcon:true,
                showLabel:true,
                activeTintColor: colors.Darkpink,
                inactiveTintColor: 'gray'
            },
            tabBarIcon: ({ focused, tintColor }) => (
                <AntDesign name="message1" size={24} color={focused?colors.Darkpink:colors.black} />
              )
        }
    },
    RoomManage:{
        screen: RoomChatManagement,
        navigationOptions:{
            tabBarLabel:({ focused, tintColor }) => (
                <View style={{alignItems:"center"}}><Text  style={{fontSize:12,color:focused?colors.Darkpink:colors.black}} >Nhóm</Text></View>
              ), 
            tabBarOption:{
                tabStyle:{
                    paddingVertical: 10
                },
                styles:{
                    height:50,
                    backgroundColor:'white',
                    elevation: 10,
                    borderTopWidth: 0
                },
                labelStyle:{
                    margin:0,
                    padding:0,
                },
                showIcon:true,
                showLabel:true,
                activeTintColor: colors.Darkpink,
                inactiveTintColor: 'gray'
            },
            tabBarIcon: ({ focused, tintColor }) => (
                <MaterialCommunityIcons name="account-group-outline" size={24} color={focused?colors.Darkpink:colors.black} />
              )
        }
    },
    MyInfo:{
        screen: PersonalInfo,
        navigationOptions:{
            tabBarLabel:({ focused, tintColor }) => (
                <View style={{alignItems:"center"}}><Text  style={{fontSize:12,color:focused?colors.Darkpink:colors.black}} >Thông tin cá nhân</Text>
                </View>
              ), 
            tabBarOption:{
                tabStyle:{
                    paddingVertical: 10
                },
                styles:{
                    height:50,
                    backgroundColor:'white',
                    elevation: 10,
                    borderTopWidth: 0
                },
                labelStyle:{
                    margin:0,
                    padding:0,
                },
                showIcon:true,
                showLabel:true,
                activeTintColor: colors.Darkpink,
                inactiveTintColor: 'gray'
            },
            tabBarIcon: ({ focused, tintColor }) => (
                <MaterialIcons name="person-outline" size={24} color={focused?colors.Darkpink:colors.black} />         )
        }
    }
    }
);

const AppNavigator = createStackNavigator(
  {
    Login: LoginScreen,
    SignIn: SignInScreen,
    SignUp: SignUpScreen,
    EditMyInfo: PersonalInfoEdit ,
    ChatScr:ChatScreen_GiftedChat,
    ChatInf: ChatInfo,
    ResetPass:ResetPassword,
    Dashboard: TabNavigator,
    ChangePass: ChangePass,
    PersonalInfo: PersonalInfo,
    Avatar: UpdateAvaScreen,
    RoomManager:RoomChatManagement,
    SignUpCont: SignUpCont
  },
  
  {
    index: 0,
    initialRouteName: 'Login',
    headerMode: 'none',
    navigationOptions: {
      gesturesEnabled: false
    }
  },
);
const mapStateToProps = (state) => {
    return{
        isLogin: state.isLogin,  
    }
  };
  
  const mapDispatchToProps = (dispatch) =>{
    return {
        Update: (isLogin) => {
          dispatch(ChangeLoginStatus(isLogin));
        }
    };
  }
  export default connect(mapStateToProps, mapDispatchToProps)(createAppContainer(AppNavigator));
  