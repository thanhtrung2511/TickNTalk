import {BirthdayAction} from "../actions/index"
const birthdayReducer=(state="",action)=>{
    switch(action.type)
    {
        case "BIRTHDAY_ACTION": return action.birthday;
        default: return state;
    
    }
}
export default  birthdayReducer;