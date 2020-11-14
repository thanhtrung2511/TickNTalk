import {ChangeNameAction} from "../actions/index"
const nameReducer=(state="",action)=>{
    switch(action.type)
    {
        case "CHANGE_NAME_ACTION": return action.name;
        default: return state;
    
    }
}
export default  nameReducer;