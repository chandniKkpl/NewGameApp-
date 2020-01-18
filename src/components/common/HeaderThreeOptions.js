import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet, Image, ScrollView } from 'react-native';

export default class HeaderBlueThreeOptions extends Component{
    constructor(props){
        super(props);

    }
    render(){
        
        return(
            <View>
            <View style={[{  alignSelf: 'center', height: 100, flexDirection: 'row', backgroundColor: 'rgb(61, 160, 248)', alignItems:'baseline'}]}>
            <TouchableOpacity style={{ marginLeft: '3%', flex: 1, marginTop:'2%' }} onPress={() => this.props.navigation.goBack()} >
                <Image source={require('../../assets/back.png')} style={{ width: 16, height: 16, tintColor: 'white' }} />
            </TouchableOpacity>
            <Text style={[styles.textTitle, { alignSelf: 'center', flex: 6, textAlign: 'center', color: 'white',marginTop:'2%' }]}>{this.props.title}</Text>
            <View style={{flex: 1, marginTop:'2%'}}>
                        <TouchableOpacity onPress={this.props.onRightButtonPress}>
                        <Image source={require('../../assets/more.png')} style={{ width: 20, height: 20, tintColor: 'white' }} />

                        </TouchableOpacity>
                    </View>
        </View>
        <View style={styles.singleLine} />
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
    iconMore:{
        fontSize:20,
        color:'white',
    }
}