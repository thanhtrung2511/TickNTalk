import {ChangeEmailAction} from "../actions/index"
const emailReducer=(state="",action)=>{
    switch(action.type)
    {
        case "CHANGE_EMAIL_ACTION": return action.email;
        default: return state;
    }
}
export default  emailReducer;