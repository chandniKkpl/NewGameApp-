import axios from 'axios';
import { END_POINT_SIGNUP } from "../api/endPoints";

import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE
} from "../constants";

const signupRequest = () => ({
  type: SIGNUP_REQUEST
});

const signupSuccess = data => ({
  type: SIGNUP_SUCCESS,
  payload: {
    data: data
  }
});

const signupFailure = error => ({
  type: SIGNUP_FAILURE,
  payload: {
    error
  }
});

export const signup = (data) => {
  return dispatch => {
    dispatch(signupRequest());
    console.log(" Paramerter of Signup ***** ====", data);
    return axios({
      method: 'post',
      url: END_POINT_SIGNUP,
      data: data,
    })
      .then(res => {
        console.log("res====", res)
        dispatch(signupSuccess(res.data));
        return res.data;
      })
      .catch(err => {
        console.log(" Error ====", err);
        dispatch(signupFailure(err.message));
      });
  };
};