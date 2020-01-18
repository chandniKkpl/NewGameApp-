/* eslint-disable */
import { combineReducers } from "redux";

import login from "./login";
import signup from "./signup";
import dashboard from "./dashboard";
import category from './category';
import forgotpassword from './forgotpassword';
import myProfile from './myProfile'; 
import questions from './questions';
import dashboardPostDetail from './dashboardPostDetail';


const rootReducer = combineReducers({
  login,
  signup,
  dashboard,
  category,
  forgotpassword, 
   myProfile, 
   questions,
   dashboardPostDetail
});

export default rootReducer;