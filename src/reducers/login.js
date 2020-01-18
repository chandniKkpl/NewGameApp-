import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE
} from "../constants";

const initialState = {
    error: {},
    data: {},
    isRequesting: false
}
const login = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return Object.assign({}, state, {
        isRequesting: true,
        data: {},
        error: {}
      });
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        data: action.payload.data,
        isRequesting: false,
        error: {}
      });
    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        error: action.payload.error,
        isRequesting: false
      });
    default:
      return state;
  }
};

export default login;