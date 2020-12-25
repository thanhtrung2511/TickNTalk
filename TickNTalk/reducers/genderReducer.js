import {ChangeGenderAction} from "../actions/index"
const genderReducer=(state="",action)=>{
    switch(action.type)
    {
        case "CHANGE_GENDER_ACTION": return action.gender;
        default: return state;
    
    }
}
export default  genderReducer;