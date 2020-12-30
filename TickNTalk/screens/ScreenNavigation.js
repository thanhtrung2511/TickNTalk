import { createBottomTabNavigator } from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import React from 'react'

import LoginScreen from './LoginScreen'
import ChatScreen from './ChatScreen'
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
import {colors} from '../components/Basic/Basic'
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import {Text} from 'react-native'
import {connect} from 'react-redux'
import { ChangeLoginStatus } from '../actions';

const TabNavigator= createBottomTabNavigator(
    {
    ChatFeed:{
        screen: ChatFeed,
        navigationOptions:{
            tabBarLabel:({ focused, tintColor }) => (
                <Text  style={{color:focused?colors.Darkpink:colors.black}} >Tin nhắn</Text>
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
                <MaterialIcons name="message" size={24} color={focused?colors.Darkpink:colors.black} />
              )
        }
    },
    RoomManage:{
        screen: RoomChatManagement,
        navigationOptions:{
            tabBarLabel:({ focused, tintColor }) => (
                <Text  style={{color:focused?colors.Darkpink:colors.black}} >Nhóm</Text>
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
                <FontAwesome name="group" size={24} color={focused?colors.Darkpink:colors.black} />
              )
        }
    },
    MyInfo:{
        screen: PersonalInfo,
        navigationOptions:{
            tabBarLabel:({ focused, tintColor }) => (
                <Text  style={{color:focused?colors.Darkpink:colors.black}} >Thông tin cá nhân</Text>
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
                <Ionicons name="ios-person" size={24} color={focused?colors.Darkpink:colors.black} />         )
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
    ChatScr:ChatScreen,
    ChatInfo: ChatInfo,
    Dashboard: TabNavigator,
    ChangePass: ChangePass,
    PersonalInfo: PersonalInfo,
    Avatar: UpdateAvaScreen,
    SignUpCont: SignUpCont
  },
  
  {
    index: 0,
    initialRouteName: 'Dashboard',
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
  