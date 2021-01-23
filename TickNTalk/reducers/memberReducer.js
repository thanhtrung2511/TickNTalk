import {ChangeMemberAction} from "../actions/index"
const memberReducer=(state="",action)=>{
    switch(action.type)
    {
        case "CHANGE_MEMBER_ACTION": return action.member;
        default: return state;
    }
}
export default  memberReducer;