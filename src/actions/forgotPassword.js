import axios from 'axios';
import { END_POINT_FORGOT_PASSWORD, END_POINT_LOGIN } from "../api/endPoints";

import { FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAILURE } from '../constants';


const forgotPasswordRequest = () => ({
  type: FORGOT_PASSWORD_REQUEST
})

const forgotPasswordSuccess = (data) => ({
  type: FORGOT_PASSWORD_SUCCESS,
  payload: {
    data: data
  }
})

const forgotPasswordFailure = (error) => ({
  type: FORGOT_PASSWORD_FAILURE,
  payload: {
    error: error
  }
})

export const forgotPassword = (data) => {

  return dispatch => {

    dispatch(forgotPasswordRequest());

    return axios({
      method: 'post',
      // responseType: 'json',
      url: END_POINT_FORGOT_PASSWORD,
      data
    })
      .then(response => {
        console.log(" respoinse ------", response);
        dispatch(forgotPasswordSuccess(response));
        return response;
      })
      .catch(error => {
        console.log(" error-----", error.response);
        dispatch(forgotPasswordFailure(error.response));
        return error.response;
      });

    // return axios
    //   .post("http://54.250.243.234/api/v1/password/email",{'email':'manrajparmar52@gmail.co'})

    //   .then(res => {
    //     console.log(" respoinse ------",res);

    //     dispatch(forgotPasswordSuccess(res));

    //     return res;
    //   })
    //   .catch(err => {
    //     console.log(" error------",res);
    //     dispatch(forgotPasswordFailure(err.message));
    //   });
  };
};