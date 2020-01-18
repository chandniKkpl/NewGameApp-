import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet, Image, ScrollView, Platform } from 'react-native';
import constants from '../../constants/Signup';

export default class HeaderLoginModule extends Component {
    constructor(props) {
        super(props);

    }
    render() {

        return (
            <View>
                <View style={[{ alignItems: 'center', alignSelf: 'center', height: 40, flexDirection: 'row', flex:10 }]}>
                    <View style={{flex:1.2}}>
                        <View style={{marginLeft:'20%'}}>
                            {/* <TouchableOpacity onPress={() => this.props.navigation.goBack()} >
                                <Image source={require('../../../assets/cross1x.png')} style={{ width: 13, height: 13 }} />
                            </TouchableOpacity> */}
                        </View>
                    </View>

                    <Text style={styles.titlePosition}>{this.props.title}</Text>
                    <View style={{ flex: 1.2}}>
                        {/* <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <Text style={[styles.textRightButton, {marginLeft:'13%'}]}>{constants.CLOSE}</Text>
                        </TouchableOpacity> */}
                    </View>
                </View>
                <View style={styles.singleLine} />
            </View>
        )
    }
}

const styles = {
    buttonTopAndroid: {
        flex: 0.3, marginLeft: '5%'
    },
    buttonTopIos: {
        flex: 0.3, marginLeft: '5%',
    },
    singleLine: {
        width: '100%',
        height: 1,
        backgroundColor: 'lightgray'
    },
    titlePositionAndroid:{
        fontSize: 20,
        color: 'rgb(153,153,153)',
        fontFamily: 'NotoSansCJKjp-Medium',
        textAlign: 'center', alignSelf: 'center'
    },
    titlePosition:{
        fontSize: 20,
        color: 'rgb(153,153,153)',
        fontFamily: 'NotoSansCJKjp-Medium',
         textAlign: 'center', alignSelf: 'center',
         flex:4.8
    },
    title: {
        alignSelf: 'center',
        // textAlign:'center',
        color: 'rgb(153, 153, 153)',
        fontFamily: 'NotoSansCJKjp-Medium',
    },
    textRightButton: {
        color: '#d61515', fontSize: 17,
        fontFamily: 'NotoSansCJKjp-Medium',
       
    },
    rightButton:{
        flex: 1.5
    },
}