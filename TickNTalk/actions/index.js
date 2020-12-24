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
export function BirthdayAction(birthday){
    return {
        type:"BIRTHDAY_ACTION",
        birthday:birthday
    }
}
export function ChangePhoneAction(phone){
    return {
        type:"CHANGE_PHONE_ACTION",
        phone:phone
    }
}
export function ChangeRoomIDAction(roomID){
    return {
        type:"CHANGE_ROOM_ID_ACTION",
        roomID:roomID
    }
}
export function ChangeLoginStatus(isLogin){
    return {
        type:"CHANGE_LOGINSTT_ACTION",
        isLogin:isLogin
    }
}
