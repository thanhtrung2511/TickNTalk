import {ChangePhoneAction} from "../actions/index"
const phoneReducer=(state="",action)=>{
    switch(action.type)
    {
        case "CHANGE_PHONE_ACTION": return action.phone;
        default: return state;
    
    }
}
export default  phoneReducer;