import {ChangeMemberStateAction} from "../actions/index"
const memberStateReducer=(state="",action)=>{
    switch(action.type)
    {
        case "CHANGE_MEMBER_STATE_ACTION": return action.state;
        default: return state;
    }
}
export default  memberStateReducer;