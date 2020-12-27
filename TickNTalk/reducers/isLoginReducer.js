import {ChangeLoginStatus} from "../actions/index"
const isLoginReducer=(state="",action)=>{
    switch(action.type)
    {
        case "CHANGE_LOGINSTT_ACTION": return action.isLogin;
        default: return state;
    }
}
export default  isLoginReducer;