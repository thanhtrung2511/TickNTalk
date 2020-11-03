import {combineReducers} from 'redux'
import emailReducer from './emailReducer'
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase'


const allReducers = combineReducers({
    emailReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
})
export default allReducers