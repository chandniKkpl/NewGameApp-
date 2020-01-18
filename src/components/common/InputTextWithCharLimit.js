import React, { Component } from 'react';
import { Image, View, Text, TouchableOpacity, FlatList, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import CastConstants from '../constants/Cast';
import { ScaledSheet, verticalScale, moderateScale, Button } from 'react-native-size-matters';

const InputTextWithCharLimit = (props) => {
    const { handleChange, placeholder, value, charLimit, name, titleLabel, errors } = props;

    return (
        <View style={{ margin: '5%' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.textTitle}>{titleLabel}</Text>
                {errors[name] ? <Image source={require('../../assets/error.png')} style={[{ paddingTop: '5%', tintColor:'#d61515', width:20, height:20 }]} />
                    : null
                }
               
            </View>

            {/* Text field with keyboard handling  */}
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View>
                    <TextInput
                        placeholder={placeholder}
                        onChangeText={val => handleChange(name, val)}
                        value={value}
                        name={name}
                        multiline={true}
                        numberOfLines={5}
                        style={name === 'detail' ? styles.inputTextAreaStyleLarge : styles.inputTextAreaStyle}
                    />

                </View>

            </TouchableWithoutFeedback>
            
            <View style={{ flexDirection: 'row', marginTop: '1%' }}>
                <View style={{ flex: 0.96 }} />
                <Text style={[styles.charLimit, { alignSelf: 'flex-end', }]}>{charLimit === '' ? name === 'title' ? 40 : 2000 : charLimit} {CastConstants.CHARACTER_LIMIT}</Text>
            </View>
        </View>)
}
export default InputTextWithCharLimit;

const styles = {
    textTitle: {
        fontSize: 13,
        color: 'rgb(51, 51, 51)',
        fontFamily: 'NotoSansCJKjp-Medium',
        paddingTop: '5%',
        height: 40
    },
    charLimit: {
        fontSize: 12,
        color: '#9b9b9b',
        fontFamily: 'NotoSansCJKjp-Medium',
    },
    inputTextAreaStyle: {
        // marginLeft: '5%',
        // marginRight: '5%',
        height: 100,
        backgroundColor: 'white',
        marginTop: '3%',
        borderColor: '#aaaaaa',
        borderWidth: 1,
        fontFamily: 'NotoSansCJKjp-Medium',
        fontWeight: '300',
        fontSize: 16,
        color: '#262626',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 3,
    },

    inputTextAreaStyleLarge: {
        // marginLeft: '5%',
        // marginRight: '5%',
        height: 250,
        backgroundColor: 'white',
        marginTop: '3%',
        borderColor: '#aaaaaa',
        borderWidth: 1,
        fontFamily: 'NotoSansCJKjp-Medium',
        fontWeight: '300',
        fontSize: 16,
        color: '#262626',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 3,
    },
}