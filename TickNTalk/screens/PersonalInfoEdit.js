import React, { Component } from 'react'
import { Text, View } from 'react-native'
import firebase from 'firebase'

export default class PersonalInfoEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
            userName:'',
            userPassword:'',
            userGender:'',
            userBirthDay:'',
            userPhoneNumber:'',
        }
    }
    CreateUser =()=> {

    }
    render() {
        return (
            <View>
                <Text> textInComponent </Text>
            </View>
        )
    }
}
