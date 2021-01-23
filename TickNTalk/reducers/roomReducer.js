import {ChangeRoomIDAction} from "../actions/index"
const roomReducer=(state="",action)=>{
    switch(action.type)
    {
        case "CHANGE_ROOM_ID_ACTION": return action.roomID;
        default: return state;
    }
}
export default  roomReducer;
