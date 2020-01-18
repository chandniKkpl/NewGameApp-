import React, { Component } from 'react';
import { View, FlatList, Text, CheckBox, Image, TouchableOpacity, Button } from 'react-native';


export default class ViewPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false,
        }
    }

    handleCheckboxClick() {
        this.setState({ checked: !this.state.checked });
        this.props.showPopup();
    }

    renderItem = (item, index) => {
        console.log(" in popup item is =====", item);
        let isShowSingleLine = true;
        if (item.index === 2) {
            isShowSingleLine = false;
        }
        return (
            <View style={{}}>
                <View style={{ marginLeft: '2%', height: 40, justifyContent: 'center', backgroundColor: 'white' }}>
                    <TouchableOpacity onPress={() => this.handleCheckboxClick()}>
                        <Text style={styles.textData}>{item.item}</Text>

                    </TouchableOpacity>
                    {/* <Ionicons name="ios-checkmark" fontSize={54} /> */}
                </View>
                {isShowSingleLine ? <View style={styles.viewSingleLine} /> : <View />}
            </View>
        )
    }

    render() {
        console.log(" popup data ====", this.props.arrayData)
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <FlatList

                    data={this.props.arrayData}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        )
    }
}

const styles = {
    viewSingleLine: {
        width: '100%',
        height: 0.5,
        backgroundColor: 'rgb(153, 153, 153)',
        // marginTop:'2%', 
        // marginBottom: "2%",
    },
    textData: {
        marginLeft: '5%',
        //height:30, 

        color: 'rgba(155, 155, 155, 255)',
        fontSize: 13
    }
}