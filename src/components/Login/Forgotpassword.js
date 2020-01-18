import React, { Component } from 'react';
import { View, TouchableOpacity, Image, Text, FlatList, TextInput, ActivityIndicator } from 'react-native';
import loginConstants from '../constants/Login';
import signupConstants from '../constants/Signup';

import commonStyles from '../stylesheet/common/commonStyles.style'
import { SafeAreaView } from 'react-navigation';
import { checkError } from '../utils'
import * as Animatable from 'react-native-animatable';
import { ScaledSheet, verticalScale, moderateScale } from 'react-native-size-matters';
import HeaderLoginModule from '../commonComponent/HeaderLoginModule';

export default class Forgotpassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFirstTimeCome: true,
        }
        this.arrayData = [loginConstants.FORGOT_PASSWORD, loginConstants.EMAIL_ADDRESS, loginConstants.LOGIN_BOTTOM_DESCRIPTION];
    }
    
    componentDidMount() {
        this.setState({ isFirstTimeCome: true })
    }

    renderItem = (item) => {
       const { formData, errors, handleChange, forgotPasswordData, onSubmit, fetching} = this.props;

        // const error = checkError(forgotPasswordData.error);
        // let fieldName = item.index === 1 ? "email" : "password";

        let viewRow = <View />
        if (item.index === 0) {
            viewRow = <View>
                <HeaderLoginModule title={item.item} navigation = {this.props.navigation}/>
            </View>

        } 
        else if (item.index === 1) {
            let fieldName =  "email" ;
            let secureTextEntry =  false;
            let keyboardType = 'email-address' ;

            viewRow = <View key={item.index}>
            <View style={{ justifyContent: 'center' }}>
                <View style={Platform.OS === 'ios'?styles.viewCredentialsIos : styles.viewCredentialsAndroid}>
                    <View style={[{ justifyContent: 'space-between', marginLeft: '6%', marginRight: '4%', flexDirection: 'row', alignItems: 'center' }]}>
                        <TextInput
                            placeholder={item.item}
                            placeholderTextColor={'rgb(153, 153, 153)'}
                            style={[styles.rowText, { width: '70%', paddingBottom: 0, paddingTop:0 }]}
                            value={formData[fieldName]}
                            name={fieldName}
                            keyboardType={keyboardType}
                            onChangeText={val => handleChange(fieldName, val)}
                            secureTextEntry={secureTextEntry}
                            autoCapitalize='none'
                        />
                        {formData[fieldName].length > 0 && !errors[fieldName] ?
                            <Image style={[styles.tickImage]} source={require('../../assets/tick1X.png')} />
                            : null
                        }
                         {errors[fieldName] ?  <Image source={require('../../assets/error.png')} style={{ width: 20, height: 20, tintColor: '#d61515' }} /> 
                            : null
                        }

                       
                    </View>
                    {errors[fieldName] ? <Animatable.Text animation="fadeIn" style={{ marginLeft: '2%', color: '#d61515' }} > {errors[fieldName]}</Animatable.Text> : null
                    }
                </View>
            </View>
            <View style={styles.singleLine} />
        </View>

         } 
         else if (item.index === 2) {
            viewRow = <View style={{ alignItems: 'center' }}>

                <Text style={[styles.textBottom1Gray, { marginTop: '5%', marginBottom:'5%' }]}>{loginConstants.FORGOT_PASSWORD_DESCRIPTION}</Text>
                
               {fetching? 
               <TouchableOpacity style={commonStyles.buttonViewBlue} >
               <View>
               <ActivityIndicator color='white' style={{ alignSelf: 'center' }} />
               </View>
           </TouchableOpacity>
             :<TouchableOpacity style={commonStyles.buttonViewBlue} onPress={() => onSubmit()}>
                    <View>
                        <Text style={styles.textBlueButton}>{loginConstants.FORGOT_PASSWORD}</Text>
                    </View>
                </TouchableOpacity>}
                <View style={{ flexDirection: 'row', marginLeft: '5%', marginRight: '5%', justifyContent: 'space-between', marginTop: '5%' }}>
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('Login')}>
                    <Text style={[styles.textBottomBelowLoginButtonBlue, { marginRight: '9%' }]}> {loginConstants.LOGIN_BUTTON_TITLE}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('Signup')}>
                    <Text style={styles.textBottomBelowLoginButtonBlue}>{loginConstants.FREE_REGISTRATION}</Text>
                    </TouchableOpacity>

                </View>
            </View>
        }
        return (
            viewRow
        )
    }
    onSubmit = () =>{

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
                        extraData={{ formData: this.props.formData, errors: this.props.errors }}
                    />
                </View>
            </SafeAreaView>
        )
    }
}

const styles = {
    viewCredentialsIos: {
        height: verticalScale(60), justifyContent: 'center'
    },

    viewCredentialsAndroid: {
        height: verticalScale(60), justifyContent: 'center',
    },
    buttonTopAndroid: {
        flex: 0.3, marginLeft: '5%'
    },
    buttonTopIos: {
        flex: 2, marginLeft: '5%',
    },
    row: {
        height: verticalScale(58),
        flexDirection: 'row',
    },
    textTitle: {
        fontSize: 20,
        color: 'rgb(153,153,153)',
        fontFamily: 'NotoSansCJKjp-Medium',
    },
    rowText: {
        fontSize: 15,
        color: 'rgb(153,153,153)',
        fontFamily: 'NotoSansCJKjp-Medium',
        marginLeft:'1.3%'
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
        width: 30,
        height: 30
    },
    captchaImage: {
        width: '80%',
        height: '80%',
        alignSelf: 'center',
        marginBottom: 6,
    },
    textBottom1Gray: {
        color: 'rgb(153,153,153)',
        fontSize: 13,
        textAlign: 'center',
        fontFamily: 'NotoSansCJKjp-Medium',
    },
    textBottom1Blue: {
        color: 'rgb(66, 130, 191)',
        fontSize: 13,
        // marginLeft:'1%'
        fontFamily: 'NotoSansCJKjp-Medium',
    },
    textBottomBelowLoginButtonGray: {
        fontSize: 13,
        color: 'rgb(153,153,153)',
        fontFamily: 'NotoSansCJKjp-Medium',
    },
    textBottomBelowLoginButtonBlue: {
        fontSize: 13,
        color: 'rgb(66, 130, 191)',
        fontFamily: 'NotoSansCJKjp-Medium',
    },
    textBlueButton: {
        color: 'white',
       // multiLine: true,
        textAlign: 'center',
        padding: 10,
        fontSize: 14,
        fontFamily: 'NotoSansCJKjp-Medium',
    },
}
