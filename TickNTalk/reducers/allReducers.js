import {combineReducers} from 'redux'
import emailReducer from './emailReducer'
import nameReducer from './nameReducer'
import birthdayReducer from './birthdayReducer'
import phoneReducer from './phoneReducer'
import { firebaseReducer } from 'react-redux-firebase'


const allReducers = combineReducers({
    emailReducer,
    nameReducer,
    phoneReducer,
    birthdayReducer,
    firebase: firebaseReducer
})
export default allReducers