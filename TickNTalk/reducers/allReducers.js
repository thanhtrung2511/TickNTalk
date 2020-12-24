import {combineReducers} from 'redux'
import emailReducer from './emailReducer'
import nameReducer from './nameReducer'
import birthdayReducer from './birthdayReducer'
import phoneReducer from './phoneReducer'
//import { firebaseReducer } from 'react-redux-firebase'


const allReducers = combineReducers({
    emailReducer,
    nameReducer,
    birthdayReducer,
    phoneReducer,
    //firebase: firebaseReducer
})
export default allReducers