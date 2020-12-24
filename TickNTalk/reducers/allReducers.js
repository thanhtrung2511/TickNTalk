import {combineReducers} from 'redux'
import emailReducer from './emailReducer'
import nameReducer from './nameReducer'
import birthdayReducer from './birthdayReducer'
import phoneReducer from './phoneReducer'
import roomReducer from './roomReducer'
import isLoginReducer from './isLoginReducer'
//import { firebaseReducer } from 'react-redux-firebase'


const allReducers = combineReducers({
    emailReducer,
    nameReducer,
    phoneReducer,
    birthdayReducer,
    isLoginReducer,
    roomReducer,
    //firebase: firebaseReducer
})
export default allReducers