import React, { Component } from 'react';
import { View, TouchableOpacity, Image, Text, FlatList, TextInput, ActivityIndicator } from 'react-native';
import loginConstants from '../../constants/Login';
import signUpConstants from '../../constants/Signup';
import commonStyles from '../../stylesheet/common/commonStyles.style';
import loginStyles from '../../stylesheet/Login.style';
import { SafeAreaView } from 'react-navigation';
import { checkError } from '../../utils'
import * as Animatable from 'react-native-animatable';
import { ScaledSheet, verticalScale, moderateScale } from 'react-native-size-matters';
import HeaderLoginModule from '../common/HeaderLoginModule';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFirstTimeCome: true,
        }
        this.arrayData = [loginConstants.TITLE, loginConstants.EMAIL_ADDRESS, loginConstants.PASSWORD, loginConstants.LOGIN_BOTTOM_DESCRIPTION];

    }
    componentDidMount() {
        this.setState({ isFirstTimeCome: true })
    }


    render() {
        return (
            <SafeAreaView style={loginStyles.viewBackground}>
                <View style={loginStyles.container}>
                    <TouchableOpacity style={commonStyles.buttonViewBlue} onPress={() => null}>
                        <View>
                            <Text style={loginStyles.textBlueButton}>{signUpConstants.SIGN_UP}</Text>
                        </View>
                    </TouchableOpacity>

                    <View>
                        <Text style={loginStyles.textOr}>{loginConstants.OR}</Text>
                    </View>

                    <TouchableOpacity style={commonStyles.buttonViewBlue} onPress={() => this.props.navigation.navigate('tabNavigator')}>
                        <View>
                            <Text style={loginStyles.textBlueButton}>{loginConstants.GUEST}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        )
    }
}


