import {ChangeAvaAction} from "../actions/index"
const avaReducer=(state="",action)=>{
    switch(action.type)
    {
        case "CHANGE_AVA_ACTION": return action.UrlAva;
        default: return state;
    
    }
}
export default avaReducer;