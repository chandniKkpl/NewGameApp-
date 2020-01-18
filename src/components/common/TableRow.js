import React, { Component } from 'react';
import { View, Text, CheckBox, Image, Platform, ImageBackground } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';


class TableRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false,
        }
    }

    handleCheckboxClick(rowData) {
        this.setState({ checked: !this.state.checked });
        if(rowData){
            var rowDataTemp  = rowData
            rowDataTemp.isChecked = true;
            rowData = rowDataTemp
        }
      
      // console.log(" After select =======", rowData, '-------'); 
    }
    render() {
        const { rowData, isShowRightView, isShowLeftView } = this.props
 
        return (
            <View>
                <View style={{ height: 35,   marginLeft: '5%', marginRight: '5%', justifyContent:'center' }}>

                  
                    {isShowRightView && !this.state.checked ?
                     <TouchableOpacity onPress={()=> this.handleCheckboxClick(rowData)}>
                        <View style={{flexDirection: 'row',justifyContent: 'space-between',}}>
                              <Text style={this.state.checked? styles.rowCheckedText:styles.rowUncheckedText}>{rowData.title}</Text>
                              <Image source={require('../../assets/checkbox_uncheck.png')} style={styles.checkBox}/>
                        </View>
                        </TouchableOpacity>
                     :<View >
                         <TouchableOpacity onPress={()=> this.handleCheckboxClick()}>
                         <View style={{flexDirection: 'row',justifyContent: 'space-between',}}>
                              <Text style={this.state.checked? styles.rowCheckedText:styles.rowUncheckedText}>{rowData.title}</Text>
                              <Image source={require('../../assets/check_box_checked.jpg')} style={[styles.checkBox, {justifyContent:'center', alignItems:'center'}]} />
                        </View>
                         </TouchableOpacity>
                     </View>
                    }
                </View>
                <View style={styles.singleLine} />
            </View>
        )
    }
}

const styles = {
    rowUncheckedText: {
        fontSize: 14,
        color: 'rgb(81,81,81)',
        fontFamily: 'NotoSansCJKjp-Medium',
    },
    rowCheckedText:{
        fontSize: 14,
        color: 'rgb(2, 132, 254)',
        fontFamily: 'NotoSansCJKjp-Medium',
    },
    singleLine: {
        width: '100%',
        height: 1,
        backgroundColor: 'rgb(229,229,229)'
    },
    checkBox:{
     width:20,
     height:20
    },
    checkBoxChecked:{
        width:50,
        height:50
       },
}

export default TableRow;
