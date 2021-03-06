export function ChangeEmailAction(Email){
    return {
        type:"CHANGE_EMAIL_ACTION",
        email:Email
    }
}

export function ChangeNameAction(Name){
    return {
        type:"CHANGE_NAME_ACTION",
        name:Name
    }
}

export function ChangeBirthdayAction(Birthday){
    return {
        type:"CHANGE_BIRTHDAY_ACTION",
        birthday:Birthday
    }
}

export function ChangePhoneAction(Phone){
    return {
        type:"CHANGE_PHONE_ACTION",
        phone:Phone
    }
}

export function ChangeGenderAction(Gender){
    return {
        type:"CHANGE_GENDER_ACTION",
        gender:Gender
    }
}
export function ChangeRoomIDAction(roomID){
    return {
        type:"CHANGE_ROOM_ID_ACTION",
        roomID:roomID
    }
}
export function ChangeRoomDataAction(roomData){
    return {
        type:"CHANGE_ROOM_DATA_ACTION",
        roomData:roomData
    }
}
export function ChangeLoginStatus(isLogin){
    return {
        type:"CHANGE_LOGINSTT_ACTION",
        isLogin:isLogin
    }
}

export function ChangeMemberAction(member){
    return {
        type:"CHANGE_MEMBER_ACTION",
        member:member
    }
}
export function ChangeAvaAction(urlAva){
    return {
        type:"CHANGE_AVA_ACTION",
        UrlAva:urlAva
    }
}
export function ChangeMemberStateAction(state){
    return {
        type:"CHANGE_MEMBER_STATE_ACTION",
        state:state
    }
}