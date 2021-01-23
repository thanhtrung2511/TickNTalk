import {ChangeRoomDataAction} from "../actions/index"
const roomDataReducer=(state="",action)=>{
    switch(action.type)
    {
        case "CHANGE_ROOM_DATA_ACTION": return action.roomData;
        default: return state;
    }
}
export default  roomDataReducer;
