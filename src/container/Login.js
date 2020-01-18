import React from "react";
import { connect } from "react-redux";
import { Alert, Platform, AsyncStorage } from 'react-native';
import { login } from "../actions/login";
import Validator from "../validator";
import Login from "../components/Login/Login";

//import DeviceInfo from 'react-native-device-info';

class LoginContainer extends React.PureComponent {
  state = {
    data: {
      email: "",
      password: ""
    },
    fetching: false,
    errors: {},
    onSuccess: false,
    fcmToken: '',

  };

  /**
   * Validation Location
   *
   *  @param String field
   *
   *  @return Boolean
   */

  componentDidMount() {

    //this.checkPermission();
  }

  _isValid = (field = null) => {
    const validate = Validator.createValidator(
      {
        email: ["required", "email"],
        password: ["required", "minLength|6"]
      },
      this.state.data,
      field
    );

    const { isValid, errors } = validate;
    if (field) {
      let oldErrorState = this.state.errors;
      if (!errors[field]) {
        delete oldErrorState[field];
      }
      oldErrorState[field] = errors[field];
      this.setState({ errors: oldErrorState ? JSON.parse(JSON.stringify(oldErrorState)) : oldErrorState });
    } else {
      this.setState({ errors: errors ? JSON.parse(JSON.stringify(errors)) : errors });
    }
    return isValid;
  };

  /**
   * Input change handlers
   *
   */
  _handleChange = (name, value) => {
    const { data } = this.state;
    
    data[name] = value;
    this.setState(
      {
        data: JSON.parse(JSON.stringify(data))
      },
      () => {
        this._isValid(name)
      }
    );
  };

  async setDataInStorage(resultData) {

  }

  /**
   * On Login
   */
  _login = () => {
    let postData = {
      "device_token": "",
      "device_type": Platform.OS === 'ios' ? 1 : 2,
      "device_id": "",
      "username": "",
      "password": ''
    }
    const valid = this._isValid();
    const { email, password } = this.state.data;
    postData.username = email;
    postData.password = password;
    postData.device_token = this.state.fcmToken;
    let uniqueId = '';
    //let uniqueId = DeviceInfo.getUniqueId();
    postData.device_id = uniqueId;
   
    
    if (valid) {
      this.setState({ fetching: true });
      this.props.loginClick(postData).then((resData) => {

        this.setState({ fetching: false });

        if (resData.success) {

          this.setDataInStorage(resData);
          
        } else {
          if (resData.message) {
            {
            Platform.OS === 'ios' ?
              alert(resData.message)
              : Alert.alert(resData.message)
            }
          }
        }
      })
    }
  };

  // async getToken() {
  //   const fcmToken = await firebase.messaging().getToken();

  //   if (fcmToken) {

  //     this.setState({ fcmToken: fcmToken });
  //   } else {

  //   }

  // }

  // async requestPermission() {
  //   firebase.messaging().requestPermission()
  //     .then(() => {
  //       this.getToken();
  //     })
  //     .catch(error => { });
  // }

  // async checkPermission() {

  //   firebase.messaging().hasPermission()
  //     .then(enabled => {

  //       if (enabled) {

  //         this.getToken();
  //       } else {
  //         this.requestPermission();
  //       }
  //     });
  // }

  render() {
    const { data, errors, fetching, onSuccess } = this.state;
    const { loginData } = this.props;
    return (
      <Login
        formData={data}
        onSuccess={onSuccess}
        login={loginData}
        errors={errors}
        fetching={fetching}
        onSubmit={this._login}
        handleChange={this._handleChange}
        navigation={this.props.navigation}
      />
    );
  }
}

// eslint-disable-next-line
const mapStateToProps = state => {
  return {
    loginData: state.login,
  };
};

// eslint-disable-next-line
const mapDispatchToProps = (dispatch) => {
  return {
    loginClick: (data) => dispatch(login(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginContainer);


/*
{
    "0": 200,
    "success": true,
    "message": "You have a successfully login.",
    "auth_token": "258HGTKA851VFGB654HY",
    "result": {
        "email": "user@gmail.com",
        "password": "123456",
        "user_type": 3,
        "is_approve": "APPROVE"
    }
}

*/