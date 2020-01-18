import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet, Image, ScrollView } from 'react-native';

export default class HeaderBlue extends Component{
    constructor(props){
        super(props);

    }
    render(){
        
        return(
            <View style={[{ alignItems: 'center', alignSelf: 'center', height: 40, flexDirection: 'row', backgroundColor: 'rgb(61, 160, 248)', }]}>
            <TouchableOpacity style={{ marginLeft: '3%', flex: 1 }} onPress={() => this.props.navigation.goBack()} >
                <Image source={require('../../assets/back.png')} style={{ width: 16, height: 16, tintColor: 'white' }} />
            </TouchableOpacity>
            <Text style={[styles.textTitle, { alignSelf: 'center', flex: 6, textAlign: 'center', color: 'white' }]}>{this.props.title}</Text>
            <View style={{ flex: 1 }} />
        </View>
        )
    }
}

const styles = {
    textTitle: {
        fontSize: 15,
        color: 'rgb(153, 153, 153)',
        fontFamily: 'NotoSansCJKjp-Medium',
    },
}