import {combineReducers} from 'redux'
import emailReducer from './emailReducer'

const allReducers = combineReducers({
    emailReducer,
})
export default allReducers