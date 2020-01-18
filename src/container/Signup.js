import React from "react";
import { connect } from "react-redux";
import { Platform, Alert, AsyncStorage } from 'react-native';
import { signup } from "../actions/signup";
import Validator from "../validator";
import Signup from "../components/Signup";
import * as wordConstants from '../constants/WordConstants';
import firebase from 'react-native-firebase'
//import DeviceInfo from 'react-native-device-info';
import signupConstants from '../constants/Signup';


class SignupContainer extends React.PureComponent {
  state = {
    data: {
      userType: "",
      email: "",
      password: "",
      imageNationalQualification: '',
      imageCertificateWithPhoto: '',
      isRobot: "",
      first_name:'',
      last_name:'', 
      first_kana_name:'', 
      last_kana_name:'',
    },
    fetching: false,
    errors: {},
    onSuccess: false,
    fcmToken : '',
  };

  /**
   * Validation Location
   *
   *  @param String field
   *
   *  @return Boolean
   */
  componentDidMount = () => {
    //console.log(" signup  ====", this.props.navigation.state);
    this.checkPermission();
    if (this.props.navigation.state.params) {

      console.log(" data in Signup  ===", this.state.data);
      this._handleChange('email', this.props.navigation.state.params.userData.email);
      this._handleChange('password', this.props.navigation.state.params.userData.password);

    }

  }
  _isValid = (field = null) => {
    const validate = Validator.createValidator(
      {
        userType: ["required"],
        email: ["required", "email"],
        password: ["required", "minLength|6"],
        first_name: ["required"],
        last_name: ["required"],
        // imageNationalQualification:["required"],
        // imageCertificateWithPhoto:["required"],
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
    //console.log(" name ==== value ==== ", name, value);
    const { data } = this.state;
    data[name] = value;
    this.setState(
      {
        data: JSON.parse(JSON.stringify(data))
      },
      () => this._isValid(name)
    );
  };

  _handleFileChange = (name, file) => {
    if (file) {
      const { data } = this.state;
      data[name] = file;
      this.setState({ data });
      
    }
  };
  
  async requestPermission() {
   
    firebase.messaging().requestPermission()
      .then(() => {
        this.getToken();
      })
      .catch(error => {
        
      });
  }

  async checkPermission() {
    firebase.messaging().hasPermission()
      .then(enabled => {

        if (enabled) {
         
          this.getToken();
        } else {
         
          this.requestPermission();
        }
      });
  }
  async getToken() {
    const fcmToken = await firebase.messaging().getToken();
    if (fcmToken) {
      this.setState({ fcmToken: fcmToken });
    } else {
      console.log("---------- No  fcmToken: ");
    }
  }

  _signup = () => {

    const valid = this._isValid();
    const { userType, email, password, imageCertificateWithPhoto, imageNationalQualification, first_name,last_name, first_kana_name, last_kana_name } = this.state.data;

    console.log("passing data =====", this.state.data);

    //let fcmToken = await AsyncStorage.getItem('fcmToken');

    const postData = new FormData()
    postData.append('first_name', first_name);
    postData.append('last_name', last_name);
    postData.append('first_kana_name', first_kana_name);
    postData.append('last_kana_name', last_kana_name);
    postData.append('user_type', userType);
    postData.append('email', email);
    postData.append('password', password);

    postData.append('agree', 'yes');
    postData.append('device_token',this.state.fcmToken);
    let device_type = Platform.OS === 'ios'? 1: 2
    postData.append('device_type', device_type);
    let uniqueId = "";

   // let uniqueId = DeviceInfo.getUniqueId();
    postData.append('device_id',uniqueId);
  

    if(userType === 4){
      
      if (imageNationalQualification) {
        postData.append('student_id_photo', {
          uri: imageNationalQualification.path,
          type: 'image/jpeg', // or photo.type
          name: 'student_id_photo'
        });
    
        postData.append('driver_license_photo', {
          uri: imageNationalQualification.path,
          type: 'image/jpeg', // or photo.type
          name: 'driver_license_photo'
        });

      }

    }else
    {
      if(imageNationalQualification){
        console.log("imageNationalQualification ", imageNationalQualification.path);
        postData.append('national_veterinarian_license_photo', {
          uri: imageNationalQualification.path,
          type: 'image/jpeg', // or photo.type
          name: 'national_veterinarian_license_photo'
        });
      }
  
      if (imageCertificateWithPhoto) {

        console.log("student_id_photo ", imageCertificateWithPhoto.path);

        postData.append('student_id_photo', {
          uri: imageCertificateWithPhoto.path,
          type: 'image/jpeg', // or photo.type
          name: 'student_id_photo'
        });
      }
  
      if (imageCertificateWithPhoto) {

        console.log("driver_license_photo ", imageCertificateWithPhoto.path);

        postData.append('driver_license_photo', {
          uri: imageCertificateWithPhoto.path,
          type: 'image/jpeg', // or photo.type
          name: 'driver_license_photo'
        });
      }
    }

   

    if (valid) {
      this.setState({ fetching: true });
      this.props.signupClick(postData).then((resData) => {
        this.setState({ fetching: false });
        console.log("register res data == ", resData);
if (resData) {
        if (resData.success) {
        // await AsyncStorage.setItem(wordConstants.CONST_IS_REGISTER, true);
          this.props.navigation.navigate('LoginProgress', { status: wordConstants.CONST_CHECKING, auth_token: resData.auth_token, });
        }
        if (resData.message) {
          {
          Platform.OS === 'ios' ?
            alert(resData.message)
            :
            Alert.alert(resData.message)
          }
        }
      }else{
        Alert.alert(signupConstants.PLEASE_TRY_AGAIN);
      }
      })
    }
  };



  render() {
    const { data, errors, fetching, onSuccess } = this.state;
    const { signupData } = this.props;
    return (
      <Signup
        data={data}
        onSuccess={onSuccess}
        signup={signupData}
        handleFileChange={this._handleFileChange}
        errors={errors}
        fetching={fetching}
        onSubmit={this._signup}
        handleChange={this._handleChange}
        navigation={this.props.navigation}
      />
    );
  }
}

// eslint-disable-next-line
const mapStateToProps = state => {
  return {
    signupData: state.signup,
  };
};

// eslint-disable-next-line
const mapDispatchToProps = (dispatch) => {
  return {
    signupClick: (data) => dispatch(signup(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupContainer);
