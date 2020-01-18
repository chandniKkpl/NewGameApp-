import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE
} from "../constants";
const initialState = {
    error: {},
    data: {},
    isRequesting: false
  }
export const signup = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_REQUEST:
      return Object.assign({}, state, {
        isRequesting: true,
        data: {},
        error: {}
      });
    case SIGNUP_SUCCESS:
      return Object.assign({}, state, {
        data: action.data,
        isRequesting: false,
        error: {}
      });
    case SIGNUP_FAILURE:
      return Object.assign({}, state, {
        error: action.error,
        isRequesting: false
      });
    default:
      return state;
  }
};

export default signup;