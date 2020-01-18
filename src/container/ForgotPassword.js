import React from "react";
import { connect } from "react-redux";
import { forgotPassword } from "../actions/forgotPassword";
import Forgotpassword from '../components/Forgotpassword';
import Validator from "../../validator";
//import DeviceInfo from 'react-native-device-info';


class ForgotPasswordContainer extends React.PureComponent {
  state = {
    data: {
      email: '',

    },
    fetching: false,
    errors: {},
    onSuccess: false
  }

  /**
* Validation Location
*
*  @param String field
*
*  @return Boolean
*/

  _isValid = (field = null) => {
    const validate = Validator.createValidator(
      {
        email: ["required", "email"],
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
  }


  _onSubmit = () => {

    let postData = {
      "device_token": "258HGTKA85",
      "device_type": 2,
      "device_id": "VFGB654HY",
      "email": "",

    }
    let uniqueId = '';
    // let uniqueId = DeviceInfo.getUniqueId();
    postData.device_id = uniqueId;

    const valid = this._isValid();
    const { email } = this.state.data;

    if (valid) {
      postData.email = email;
      this.setState({ fetching: true });

      this.props.buttonClick(postData)
        .then((resData) => {

          this.setState({ fetching: false });

          console.log(" container ------- ", this.props.forgotPasswordData, "Res Data ===", resData);

          if (resData && resData.data && resData.data.success) {
            if (resData.data.message) {
              alert(resData.data.message);
            }
            //  setTimeout(() => {
            //     // this.props.navigation.navigate('Login'); // Ask to client for movement.
            //  }, 50);
          } else {
            if (resData.data.message) {
              alert(resData.data.message);
            }
          }
        })

    }
  }
  render() {
    const { data, errors, fetching, onSuccess } = this.state;
    const { forgotPasswordData } = this.props;

    return (
      <Forgotpassword
        formData={data}
        onSubmit={this._onSubmit}
        forgotPasswordData={forgotPasswordData}
        errors={errors}
        fetching={fetching}
        handleChange={this._handleChange}
        navigation={this.props.navigation}
      />
    );
  }
}


// eslint-disable-next-line
const mapStateToProps = state => {
  return {
    forgotPasswordData: state.forgotpassword,
  };
};

// eslint-disable-next-line
const mapDispatchToProps = (dispatch) => {
  return {
    buttonClick: (data) => dispatch(forgotPassword(data))
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgotPasswordContainer);
