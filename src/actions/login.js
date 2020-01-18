import axios from 'axios';
import { END_POINT_LOGIN } from "../api/endPoints";

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE
} from "../constants";

const loginRequest = () => ({
  type: LOGIN_REQUEST
});

const loginSuccess = data => ({
  type: LOGIN_SUCCESS,
  payload: {
    data: data
  }
});

const loginFailure = error => ({
  type: LOGIN_FAILURE,
  payload: {
    error
  }
});

export const login = (data) => {
  return dispatch => {
    dispatch(loginRequest());
    console.log(" login param ", data);
    return axios
      .post(END_POINT_LOGIN,data)
      .then(res => {
        dispatch(loginSuccess(res.data));
        return res.data;
      })
      .catch(err => {
        dispatch(loginFailure(err.message));
      });
  };
};