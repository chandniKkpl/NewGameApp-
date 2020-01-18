import React, { Component } from 'react';
import { Image, View, Text, TouchableOpacity, FlatList, TextInput, Linking, Platform, ActivityIndicator } from 'react-native';
import { ScaledSheet, verticalScale, moderateScale, Button } from 'react-native-size-matters';
import signupConstants from '../constants/Signup';
import { checkError } from '../../utils'
//import commonStyles from './stylesheet/common/commonStyles.style';
import { SafeAreaView } from 'react-navigation';
import * as Animatable from 'react-native-animatable';
import RNPickerSelect from 'react-native-picker-select';
//import ImagePicker from 'react-native-image-crop-picker';
import SimplePicker from 'react-native-simple-picker';
import welcomeConstants from '../constants/Welcome';
import HeaderLoginModule from '../common/HeaderLoginModule'


// Site key and secret key https://www.google.com/recaptcha/admin/site/348326168/setup
//Secret key 6LcYCcMUAAAAADjgQXSpTUEWVrh8_a5Kc_rtM4Yo

const siteKey = '6LcWuG4UAAAAAAn1v2RHkpyaE6yaXAc-uyRDSgMG';
const baseUrl = 'https://rnrecaptcha.org';

export default class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imageNationalQualification: '',
            imageCertificateWithPhoto: '',
            userType: '',
            //isImageNationalQualification: true,

        }
        this.arrayData = [signupConstants.TITLE, signupConstants.ACCOUNT_TYPE, signupConstants.NAME, signupConstants.KANA_NAME, signupConstants.EMAIL_ADDRESS, signupConstants.PASSWORD, signupConstants.PHYSICIAN_QUALIFICATION_STUDENT, signupConstants.CERTIFICATE_DESC, signupConstants.ROBOT_DESC, signupConstants.PROCEED_TO_NEXT, signupConstants.BOTTOM_CONTINUE_TEXT];
    }

    openURLInBrowser = (url) => {
        Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
    };

    openImagePicker = (isImageNationalQualification) => {
        // ImagePicker.openPicker({
        //     width: 300,
        //     height: 400,
        //     compressImageQuality: 0.8
        //     //cropping: true
        // }).then(image => {

        //     console.log("image from picker ++++++++++++", image);

        //     if (isImageNationalQualification) {
        //         this.setState({ imageNationalQualification: image })
        //         this.props.data['imageNationalQualification'] = image;
        //         this.props.handleFileChange('imageNationalQualification', image);
        //     } else {
        //         this.setState({ imageCertificateWithPhoto: image })
        //         this.props.data['imageCertificateWithPhoto'] = image;
        //         this.props.handleFileChange('imageCertificateWithPhoto', image);
        //     }
        //     //console.log(" selected image is Value Container========", data['imageNationalQualification']);

        // });
    }


    handleUserType = (option) => {
        this.setState({
            userType: option,
        });

        console.log(" usertype state ===== ", this.state.userType, "option ", option);
        let value = '';
        if (option === signupConstants.VETERINARIAN) {
            console.log("in vetenary -==== ", value)
            // Vetenary
            value = 3 // Vetenary
        } else {
            console.log("in Student  -==== ", value)
            // Vetenary Student
            value = 4 // VetenaryStudent
        }

        this.props.handleChange('userType', value);

    }

    renderItem = (item) => {

        const { data, errors, handleChange, signup, onSubmit, fetching, handlePickerValueChange, handleFileChange } = this.props;

        const error = checkError(signup.error);
        let viewRow = <View />
        if (item.index === 0) {

            viewRow = <View>
                <HeaderLoginModule title={item.item} navigation={this.props.navigation} />

            </View>

        } else if (item.index === 1) {
            let fieldName = "userType";
            viewRow = <View>
                <TouchableOpacity style={{ justifyContent: 'center' }} onPress={() => this.refs.pickerUserType.show()}>
                    <View style={styles.viewMiddle}>
                        <View style={styles.viewInside}>

                            {this.state.userType === '' ? <Text style={[styles.rowText]}>{signupConstants.SELECT_AN_ITEM}</Text>
                                : <Text style={[styles.rowText]}>{this.state.userType}</Text>
                            }
                            {errors[fieldName] ? <Image source={require('../../assets/error.png')} style={{ width: 20, height: 20, tintColor: '#d61515', marginTop: moderateScale(2, 0.1) }} />
                                : null
                            }

                        </View>
                        {
                            errors[fieldName] ? <Animatable.Text animation="fadeIn" style={{ marginLeft: '2%', marginBottom: '2%', color: '#d61515' }} > {errors[fieldName]}</Animatable.Text> : null
                        }
                    </View>
                </TouchableOpacity>
                <View style={styles.singleLine} />
            </View>

        } else if (item.index === 2) {
            viewRow = <View>
                <View style={styles.viewMiddle}>

                    <View style={{ flexDirection: 'row' }}>
                        <Text style={[styles.rowText, { marginLeft: '7%', color: '#666', }]}>{signupConstants.NAME}</Text>


                        <TextInput
                            placeholder={signupConstants.LAST_NAME}
                            placeholderTextColor={'rgb(153, 153, 153)'}
                            style={[styles.rowText, { width: '30%', marginLeft: '6%' }]}
                            value={data['last_name']}
                            name={'last_name'}
                            onChangeText={val => handleChange('last_name', val)}
                            autoCapitalize='none'
                        />

                        <TextInput
                            placeholder={signupConstants.FIRST_NAME}
                            placeholderTextColor={'rgb(153, 153, 153)'}
                            style={[styles.rowText, { width: '33%' }]}
                            value={data['first_name']}
                            name={'first_name'}
                            onChangeText={val => handleChange('first_name', val)}
                            autoCapitalize='none'
                        />


                        {(data['last_name'].length > 0 && data['first_name'].length > 0) && (!errors['last_name'] && !errors['firt_name']) ?
                            <Image style={[styles.tickImage]} source={require('../../assets/tick1X.png')} />
                            : null
                        }

                        {(errors['last_name'] || errors['first_name']) ? <Image source={require('../../assets/error.png')} style={{ marginTop: moderateScale(2, 0.1), width: 20, height: 20, tintColor: '#d61515' }} />
                            : null
                        }


                    </View>
                </View>
                <View style={styles.singleLine} />
            </View>
        } else if (item.index === 3) {
            viewRow = <View>
                <View style={styles.viewMiddle}>

                    <View style={{ flexDirection: 'row' }}>
                        <Text style={[styles.rowText, { marginLeft: '7%', color: '#666' }]}>{signupConstants.KANA_NAME}</Text>


                        <TextInput
                            placeholder={signupConstants.LAST_KANA_NAME}
                            placeholderTextColor={'rgb(153, 153, 153)'}
                            style={[styles.rowText, { width: '30%', marginLeft: '6%' }]}
                            value={data['last_kana_name']}
                            name={'last_kana_name'}
                            onChangeText={val => handleChange('last_kana_name', val)}
                            autoCapitalize='none'
                        />

                        <TextInput
                            placeholder={signupConstants.FIRST_KANA_NAME}
                            placeholderTextColor={'rgb(153, 153, 153)'}
                            style={[styles.rowText, { width: '30%' }]}
                            value={data['first_kana_name']}
                            name={'first_kana_name'}
                            onChangeText={val => handleChange('first_kana_name', val)}
                            autoCapitalize='none'
                        />

                    </View>

                </View>
                <View style={styles.singleLine} />
            </View>
        }
        else if (item.index === 4 || item.index === 5) {


            let fieldName = item.index === 4 ? "email" : "password";
            let secureTextEntry = item.index === 4 ? false : true;

            // console.log(" field name ===== Signup ","item index", item.index ,data[fieldName]);

            viewRow = <View>
                <View style={{ justifyContent: 'center' }}>
                    <View style={styles.viewMiddle}>
                        <View style={styles.viewInside}>

                            {item.index === 4 ? <TextInput
                                placeholder={item.item}
                                placeholderTextColor={'rgb(153, 153, 153)'}
                                style={[styles.rowText, { width: '70%' }]}
                                value={data[fieldName]}
                                name={fieldName}
                                keyboardType='email-address'
                                onChangeText={val => handleChange(fieldName, val)}
                                secureTextEntry={secureTextEntry}
                            /> :
                                <TextInput
                                    placeholder={item.item}
                                    placeholderTextColor={'rgb(153, 153, 153)'}
                                    style={[styles.rowText, { width: '70%' }]}
                                    value={data[fieldName]}
                                    name={fieldName}
                                    keyboardType='default'
                                    onChangeText={val => handleChange(fieldName, val)}
                                    secureTextEntry={true}
                                />
                            }
                            {data[fieldName].length > 0 && !errors[fieldName] ?
                                <Image style={[styles.tickImage]} source={require('../../assets/tick1X.png')} />
                                : null
                            }

                            {errors[fieldName] ? <Image source={require('../../assets/error.png')} style={{ marginTop: moderateScale(2, 0.1), width: 20, height: 20, tintColor: '#d61515' }} />
                                : null
                            }
                           
                        </View>
                        {
                            errors[fieldName] ? <Animatable.Text animation="fadeIn" style={{ marginLeft: '2%', marginBottom: '2%', color: '#d61515' }} > {errors[fieldName]}</Animatable.Text> : null
                        }
                    </View>
                </View>
                <View style={styles.singleLine} />
            </View>

        }
        else if (item.index === 6) {
            let fieldName = 'imageNationalQualification';
            viewRow =
                <View style={{}}>
                    <View style={[{ height: 60, flexDirection: 'row', alignItems: 'center' }]}>
                        <TouchableOpacity style={{ flex: .9, flexDirection: 'row', alignItems: "center" }} onPress={() => this.openImagePicker(true)}>

                            {this.state.imageNationalQualification ?
                                <Image style={[styles.cameraImage, { marginRight: '3%', marginLeft: '10%' }]} source={{ uri: Platform.OS === "android" ? this.state.imageNationalQualification.path : this.state.imageNationalQualification.sourceURL }} />

                                : <Image source={require('../../assets/camera_image.png')} style={{ marginRight: '3%', marginLeft: '10%', width: 20, height: 20, tintColor: 'rgb(153,153,153)' }} />

                            }

                            {this.state.userType === signupConstants.VETENARY_STUDENT ? <Text style={[styles.rowText]}>{signupConstants.STUDENT_ID_DESC}</Text> : <Text style={[styles.rowText]}>{item.item}</Text>}
                        </TouchableOpacity>

                        <View style={{ flex: .11 }}>
                            {this.state.imageNationalQualification ? <Image style={[styles.tickImage, { marginLeft: '23%' }]} source={require('../../assets/tick1X.png')} /> : <View />
                            }
                            {errors[fieldName] && !this.state.imageNationalQualification ? 
                            
                            <Image source={require('../../assets/error.png')} style={{ marginTop: moderateScale(2, 0.1), width: 20, height: 20, tintColor: '#d61515' }} /> 
                            
                                : null
                            }

                        </View>

                    </View>
                    <View style={styles.singleLine} />
                </View>

        } else if (item.index === 7) {
            let fieldName = 'imageCertificateWithPhoto';
            {
                this.state.userType === signupConstants.VETENARY_STUDENT ?
                    viewRow = <View />
                    : viewRow = <View style={{}}>
                        <View style={[{ height: 60, marginLeft: '5%', marginRight: '5%', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }]}>
                            <TouchableOpacity style={{ flexDirection: 'row', alignItems: "center" }} onPress={() => this.openImagePicker(false)}>
                                {this.state.imageCertificateWithPhoto ?
                                    <Image style={[styles.cameraImage, { marginRight: '3%', marginLeft: '5%' }]} source={{ uri: Platform.OS === "android" ? this.state.imageCertificateWithPhoto.path : this.state.imageCertificateWithPhoto.sourceURL }} />
                                    : <Image source={require('../../assets/camera_image.png')} style={{ marginRight: '2%', marginLeft: '5%', width: 20, height: 20, tintColor: 'rgb(153,153,153)' }} />

                                }

                                <View style={{ width: '70%', justifyContent: 'center' }}>
                                    <Text style={[styles.rowText, { flexWrap: 'wrap', marginLeft: '2%' }]}>{item.item}</Text>
                                    <Text style={[styles.rowText_small, { marginLeft: '2%' }]}>{signupConstants.CERTIFICATE_DESC_2}</Text>
                                </View>
                            </TouchableOpacity>
                            {this.state.imageCertificateWithPhoto ? <Image style={[styles.tickImage, { marginLeft: '13%' }]} source={require('../../assets/tick1X.png')} /> : <View />}

                            {errors[fieldName] && !this.state.imageCertificateWithPhoto ?
                            
                            <Image source={require('../../assets/error.png')} style={{ marginTop: moderateScale(2, 0.1), width: 20, height: 20, tintColor: '#d61515' }} />

                                : null
                            }


                        </View>
                        <View style={styles.singleLine} />
                    </View>
            }
        }
        else if (item.index === 8) {
            viewRow = <View style={{ marginBottom: '5%', marginTop: '5%' }}>
                {fetching ?
                    <TouchableOpacity style={[styles.button, { justifyContent: 'center' }]} >
                        <View style={[styles.buttonViewBlue, { justifyContent: 'center' }]}>
                            <ActivityIndicator color='white' style={{ alignSelf: 'center' }} />
                        </View>
                    </TouchableOpacity>

                    :
                    <TouchableOpacity style={[styles.button, {}]} onPress={onSubmit}>
                        <View style={[styles.buttonViewBlue, {}]}>
                            <Text style={styles.buttonText}>{signupConstants.PROCEED_TO_NEXT}</Text>
                        </View>
                    </TouchableOpacity>}
            </View>

        } else if (item.index === 9) {
            viewRow = <View style={{ alignItems: 'center', }}>
                <View style={{ flexDirection: 'row', marginLeft: '5%', marginRight: '5%', marginTop: '1%' }}>

                    <Text style={[styles.textBottom1Gray]}>
                        {signupConstants.BOTTOM_CONTINUE_TEXT}
                    </Text>

                    <TouchableOpacity onPress={() => this.openURLInBrowser(welcomeConstants.TERMS_AND_CONDITION_URL)}>
                        <Text style={styles.textBottom1Blue}>{signupConstants.TERMS_OF_USE}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.openURLInBrowser(welcomeConstants.PRIVACY_POLICY_URL)}>
                        <Text style={styles.textBottom1Blue}>{signupConstants.PRIVACY_POLICY}</Text>
                    </TouchableOpacity>

                    <Text style={[styles.textBottom1Gray]}>{signupConstants.BOTTOM_LINE2} </Text>

                </View>
                <Text style={[styles.textBottom1Gray, { flexWrap: 'wrap', marginTop: '2%' }]}>{signupConstants.IT_IS_CONSIDERED}</Text>
            </View>
        }
        return (
            viewRow
        )
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>

                    <FlatList
                        style={{ flex: 1 }}
                        data={this.arrayData}
                        renderItem={this.renderItem}
                        keyExtractor={(item, index) => index.toString()}
                        extraData={this.state}
                        scrollEnabled={false}
                    />
                    <SimplePicker
                        ref={'pickerUserType'}
                        cancelText={signupConstants.CANCEL}
                        confirmText={signupConstants.CONFIRM}
                        options={[

                            signupConstants.VETERINARIAN,
                            signupConstants.VETENARY_STUDENT,
                        ]}
                        onSubmit={(option) => {
                            console.log(" Options ====", option);
                            this.handleUserType(option);
                        }}
                    />
                </View>
            </SafeAreaView>
        )
    }
}

const styles = {
    buttonTopAndroid: {
        flex: 0.3, marginLeft: '5%'
    },
    buttonTopIos: {
        flex: 2, marginLeft: '5%',
    },
    rightButton: {
        flex: 2
    },
    viewOutSide: {
        justifyContent: 'center'
    },
    viewMiddle: {
        height: verticalScale(60), justifyContent: 'center'
    },
    viewInside: {
        justifyContent: 'space-between',
        marginLeft: '6%',
        marginRight: '4%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    photoView: {
    },

    buttonViewBlue: {
        width: '40%',
        backgroundColor: 'rgb(3, 132, 255)',
        borderRadius: 5,
        height: 35,
        alignItems: 'center',
        // autoContent: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
    },
    button: {
        marginTop: '2%'
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        //padding: 10,
        textAlign: 'auto',
        fontFamily: 'NotoSansCJKjp-Medium',
    },
    row: {
        height: verticalScale(52),
        flexDirection: 'row',
    },

    rowText: {
        fontSize: 14.5,
        color: 'rgb(153, 153, 153)',
        marginLeft: '1.3%',
        fontFamily: 'NotoSansCJKjp-Medium',
    },
    rowTextTitle: {
        fontSize: 14.5,
        color: 'rgb(153, 153, 153)',
        marginLeft: '1.3%',
        fontFamily: 'NotoSansCJKjp-Medium',
    },
    rowText_small: {
        fontSize: 8.5,
        color: 'rgb(153, 153, 153)',
        fontFamily: 'NotoSansCJKjp-Medium',
    },
    singleLine: {
        width: '100%',
        height: 1,
        backgroundColor: 'lightgray'
    },
    crossImage: {
        width: 20,
        height: 20,
    },
    tickImage: {
        width: 18,
        height: 18
    },
    cameraImage: {
        width: 22,
        height: 22,
    },
    captchaImage: {
        // width: '100%',
        // height: '100%',
        alignSelf: 'center',
    },
    textBottom1Gray: {
        color: 'rgb(153, 153, 153)',
        fontSize: 10,
        textAlign: 'center',
        fontFamily: 'NotoSansCJKjp-Medium',
    },
    textBottom1Blue: {
        color: 'rgb(66, 130, 191)',
        fontSize: 10,
        fontFamily: 'NotoSansCJKjp-Medium',

        // marginLeft:'1%'
    },
}
