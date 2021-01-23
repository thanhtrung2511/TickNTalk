import { combineReducers } from "redux";
import emailReducer from "./emailReducer";
import nameReducer from "./nameReducer";
import birthdayReducer from "./birthdayReducer";
import phoneReducer from "./phoneReducer";
import roomReducer from "./roomReducer";
import isLoginReducer from "./isLoginReducer";
import genderReducer from "./genderReducer";
import avaReducer from "./avaReducer";
import memberReducer from "./memberReducer";
import roomDataReducer from "./roomDataReducer";
//import { firebaseReducer } from 'react-redux-firebase'

const allReducers = combineReducers({
  emailReducer,
  nameReducer,
  birthdayReducer,
  isLoginReducer,
  roomReducer,
  phoneReducer,
  genderReducer,
  avaReducer,
  memberReducer,
  roomDataReducer,
  //firebase: firebaseReducer
});
export default allReducers;
