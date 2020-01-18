/* eslint-disable */
import { combineReducers } from "redux";

import login from "./login";
import signup from "./signup";
import forgotpassword from './forgotpassword';



const rootReducer = combineReducers({
  login,
  signup,
  forgotpassword
});

export default rootReducer;