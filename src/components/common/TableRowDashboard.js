import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet, Image, ScrollView, FlatList } from 'react-native';
import { ScaledSheet, verticalScale, moderateScale } from 'react-native-size-matters';
import DashboardConstant from '../constants/Dashboard';
import { DescriptionCard } from './ReadMore';
import * as wordConstants from '../constants/WordConstants';
import { IMAGE_DASHBOARD_PREFIX_URL } from '../api/endPoints';

export default class TableRowDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowPostMenu: false,
        }
    }

    dateDiffInDays_Months_Years(timeUpdate) {
        var m1 = new Date(timeUpdate);
        var m2 = new Date();
        var yDiff = m2.getFullYear() - m1.getFullYear();
        var mDiff = m2.getMonth() - m1.getMonth();
        var dDiff = m2.getDate() - m1.getDate();

        if (dDiff < 0) {
            var daysInLastFullMonth = this.getDaysInLastFullMonth(timeUpdate);
            if (daysInLastFullMonth < m1.getDate()) {
                dDiff = daysInLastFullMonth + dDiff + (m1.getDate() - daysInLastFullMonth);
            } else {
                dDiff = daysInLastFullMonth + dDiff;
            }
            mDiff--;
        }
        if (mDiff < 0) {
            mDiff = 12 + mDiff;
            yDiff--;
        }
        let timeShowOnPost = '';

        if (yDiff !== 0) {
            if (yDiff > 1) {
                timeShowOnPost = yDiff + ' ' + wordConstants.CONST_YEARS
            } else {
                timeShowOnPost = yDiff + ' ' + wordConstants.CONST_YEAR
            }
        } else {
            if (mDiff !== 0) {
                if (mDiff > 1) {
                    timeShowOnPost = timeShowOnPost + ' ' + mDiff + ' ' + wordConstants.CONST_MONTHS
                } else {
                    timeShowOnPost = timeShowOnPost + ' ' + mDiff + wordConstants.CONST_MONTH
                }
            } else {
                if (dDiff != 0) {
                    if (dDiff > 1) {
                        timeShowOnPost = timeShowOnPost + ' ' + dDiff + wordConstants.CONST_DAYS
                    } else {
                        timeShowOnPost = timeShowOnPost + ' ' + dDiff + wordConstants.CONST_DAY
                    }
                }
            }
        }

        timeShowOnPost = timeShowOnPost + ' ' + wordConstants.CONST_AGO;
        return timeShowOnPost;
    }

    getDaysInLastFullMonth(day) {
        var d = new Date(day);
        var lastDayOfMonth = new Date(d.getFullYear(), d.getMonth() + 1, 0);
        return lastDayOfMonth.getDate();
    }

    renderItem = (place, index) => {

        return (
            <View key={place.index} style={{ flexDirection: 'row', alignItems: 'center' }} >
                <View style={{ backgroundColor: 'rgb(229, 243, 255)', borderRadius: 20, height: 30, justifyContent: 'center', alignItems: 'center', marginLeft: 2.5, marginRight: 2.5, padding: 2 }}>
                    {place.item.title ? <Text style={styles.listText}>
                        {place.item.title}
                    </Text> :
                        <Text style={styles.listText}>
                            {place.item}
                        </Text>}
                </View>
            </View>
        )
    };

    render() {

        let item = this.props.item;
        let index = this.props.index;
        let viewItem = <View />
        let followUnfollowText = '';
        { item.item.isFollowByUser ? followUnfollowText = DashboardConstant.FOLLOWING : followUnfollowText = DashboardConstant.FOLLOW }

        let userId = '';
        { item.item.user_id ? userId = item.item.user_id : '' }
        let imageName = '';
        { item.item.user && item.item.user.profile_image ? imageName = item.item.user.profile_image : imageName = '' }
        let completeUrl = '';
        { item.item.user && item.item.user.profile_image ? completeUrl = IMAGE_DASHBOARD_PREFIX_URL + userId + '-' + imageName : completeUrl = '' }
        // console.log(" tble row item ========", item); 
        // let urlShow = {uri:completeUrl};
        let urlShow = { uri: 'https://reactnativecode.com/wp-content/uploads/2017/05/react_thumb_install.png' };

        let dataSendToDetail = { 'auth_token': this.props.auth_token, 'type': item.item.type, 'slug': item.item.slug, 'id': item.item.id }
        viewItem =
            <View style={{ flex: 1 }}>

                <TouchableOpacity onPress={() => this.props.navigation.navigate('DetailPage', { dataOfPost: dataSendToDetail })}>
                    <View style={{ flexDirection: 'row', marginLeft: '5%', marginRight: '2%', alignItems: 'center' }}>
                        {item.item.type === "question" ? <View style={styles.viewStatus}>
                            <Text style={styles.textStatus}>{item.item.type === "question" ? "Q&A" : ''}</Text>
                        </View> : null}
                        {item.item.category && item.item.category.title ? <View style={{}}>
                            <Text style={[styles.textGrayTitle]}>{item.item.category.title}</Text>
                        </View> : null}
                    </View>
                    {item.item.title ? <Text style={styles.descriptionTitle}>{item.item.title}</Text> : null}

                    {/* <Text style={Platform.OS === 'ios' ? styles.textTitleBlackIos : styles.textTitleBlackAndroid}>{item.item.category.description}</Text> */}

                    <View style={{ flexDirection: 'row', marginLeft: '5%', marginBottom: '2%' }}>
                        {/* <Image source={require('../../assets/dashboard_user_image.png')} style={styles.profilePhotoWithoutCircle} /> */}
                        <Image source={urlShow} style={styles.profilePhotoWithoutCircle} />

                        <View>
                            {item.item.user && item.item.user.nick_name ? <Text style={styles.textGrayTitle}>{item.item.user.nick_name}</Text> : null}
                            {item.item.updated_at ? <Text style={styles.textGrayTitle}>{this.dateDiffInDays_Months_Years(item.item.updated_at)}</Text> : null}

                        </View>
                    </View>
                    {item.item.descriptionImage ?
                        <View style={{ flexDirection: 'row', marginLeft: '5%', flex: 1 }}>
                            <Text style={[styles.textGraySubTitle, { flex: 0.7 }]}>{DashboardConstant.ANSWER_DESCRIPTION1}</Text>
                            <Image source={require('../../assets/xray.png')} style={{ width: 60, height: 60, flex: 0.3, marginRight: '5%', marginLeft: '2%' }} />

                        </View>
                        :
                        <View style={{ flexDirection: 'row', marginLeft: '5%', marginRight: '5%' }}>
                            {item.item.summary ? <Text style={[styles.textGraySubTitle]}>{this.state["tab" + index] ? item.item.summary : item.item.summary.substr(0, 150) + "..."}</Text> : null}
                            {/* <Image source={require('../../assets/xray.png')} style={{ width: 60, height: 60, flex: 0.3, marginRight: '5%', marginLeft: '2%' }} /> */}
                        </View>
                    }
                </TouchableOpacity>
                <View style={{ marginLeft: '7%' }}>
                    <TouchableOpacity onPress={() => this.setState({
                        ["tab" + index]: !this.state["tab" + index]
                    })}>
                        <Text style={styles.textReadMore}>{DashboardConstant.READ_MORE}</Text>
                    </TouchableOpacity>
                </View>

                {item.item.tags && item.item.tags.length > 0 ? <View style={{ marginLeft: '5%', marginTop: "2%" }}>
                    <FlatList
                        scrollEnabled={true}
                        horizontal={true}
                        data={item.item.tags}
                        renderItem={this.renderItem}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View> : null}

                <View style={{ marginLeft: '5%', marginRight: '5%', flexDirection: 'row', marginTop: '2%', justifyContent: 'space-between', }}>
                    <View style={{ flexDirection: 'row' }}>

                        <Image source={require('../../assets/edit.png')} style={{ width: 20, height: 20, marginRight: '2%', tintColor: 'rgb(2, 132, 255)' }} />

                        <Text style={[styles.textFollow, { marginRight: '4%' }]}>{DashboardConstant.EDIT}</Text>
                        <TouchableOpacity onPress={() => this.props.handleFollowUnfollow(item.item.id, this.props.index)} style={{ flexDirection: 'row' }}>
                            <Image source={require('../../assets/iconAdd.png')} style={{ tintColor: 'rgb(2, 132, 255)', marginRight: '2%', width: 20, height: 20 }} />
                            <Text style={[styles.textFollow, { marginRight: '2%', marginLeft: '2%' }]}>{followUnfollowText}</Text>

                        </TouchableOpacity>
                    </View>

                    <View style={{ alignSelf: 'flex-end' }}>
                        <TouchableOpacity onPress={this.props.onClickMore}>
                            <Image source={require('../../assets/more.png')}  style={{ width: 20, height: 20, tintColor:"#525252" }} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.singleLine} />
            </View>


        return (
            <View>
                {viewItem}
            </View>

        )
    }
}

const styles = ScaledSheet.create({

    profilePhoto: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderColor: 'rgb(2, 132, 254)',
        borderWidth: 1.5,
    },
    profilePhotoWithoutCircle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        // borderColor: 'rgb(2, 132, 254)',
        // borderWidth: 1.5,

    },
    descriptionTitle: {
        fontFamily: 'NotoSansCJKjp-Medium',
        fontSize: 13,
        color: 'rgba(51, 51, 51, 255)',
        marginTop: '2%',
        marginLeft: '5%',
        //paddingBottom: '2%',
        marginRight: '2%'
    },
    titleLogo: {
        width: 110,
        height: 25,
        marginLeft: '5%',
    },
    searchIcon: {
        width: 20,
        height: 20,
    },
    plusWithCircle: {
        width: 20,
        height: 20,
    },
    textSearch: {
        fontSize: 9,
        color: 'black',
        fontFamily: 'NotoSansCJKjp-Medium',
        // paddingTop: -10,
    },
    textFollow: {
        fontSize: 12,
        color: 'rgba(162, 162, 162, 255)',
        fontFamily: 'NotoSansCJKjp-Medium',
        // paddingTop: -10,
    },
    textAddTo: {
        color: 'rgb(2, 132, 254)',
        fontSize: 9,
        fontFamily: 'NotoSansCJKjp-Medium',
        paddingTop: '1%',
    },
    singleLine: {
        marginTop: '5%',
        marginBottom: '5%',
        width: '100%',
        height: 10,
        backgroundColor: '#e5e5e5'
    },
    lighBlueButton: {
        borderRadius: 15,
        alignSelf: 'center',
        backgroundColor: 'rgb(229, 243, 255)',
        height: verticalScale(35),
        width: '90%'
    },
    textStatus: {
        // backgroundColor: 'rgb(68,153,218)',
        fontFamily: 'NotoSansCJKjp-Medium',
        color: 'white',
        fontSize: 9,
    },
    viewStatus: {
        backgroundColor: '#4399d9',
        borderRadius: 2,
        fontFamily: 'NotoSansCJKjp-Medium',
        // marginLeft: '5%',
        // marginTop: '2%',
        height: 20,
        width: 35,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textGrayTitle: {
        fontFamily: 'NotoSansCJKjp-Medium',
        fontSize: 11,
        color: ' rgba(183, 183, 183, 255)',
        marginRight: '5%',
        marginLeft: '5%'
    },
    textGraySubTitle: {
        fontFamily: 'NotoSansCJKjp-Medium',
        fontSize: 13,
        color: ' rgba(116, 116, 116, 255)',
        marginLeft: '2%'
    },
    textTitleBlackIos: {
        fontFamily: 'NotoSansCJKjp-Medium',
        fontSize: 13,
        color: 'rgba(51, 51, 51, 255)',
        marginLeft: '5%',
        marginBottom: '2%'

    },
    textTitleBlackAndroid: {
        fontFamily: 'NotoSansCJKjp-Medium',
        fontSize: 13,
        color: 'rgba(51, 51, 51, 255)',
        marginLeft: '5%',
        marginBottom: '5%'
    },
    textDescriptionAndroid: {
        fontFamily: 'NotoSansCJKjp-Medium',
        fontSize: 11,
        color: 'rgba(116, 116, 116, 255)',
        marginLeft: '5%',
        marginRight: '5%',
    },
    textDescriptionIos: {
        fontFamily: 'NotoSansCJKjp-Medium',
        fontSize: 11,
        color: 'rgba(116, 116, 116, 255)',
        marginLeft: '5%',
        marginRight: '5%',
        marginTop: '1%',
        marginBottom: '1%',
    },

    readMoreLightBlue: {
        color: 'rgb(229, 243, 255)',
    },
    textCompleteTitleAndroid: {
        fontFamily: 'NotoSansCJKjp-Medium',
        fontSize: 20,
        marginLeft: '5%'
        // alignSelf: 'center',
    },
    textCompleteTitleiOS: {
        fontFamily: 'NotoSansCJKjp-Medium',
        fontSize: 20,
        marginLeft: '5%',
        marginTop: '2%',
        marginBottom: '2%'
        // alignSelf: 'center',
    },
    textStart: {
        fontFamily: 'NotoSansCJKjp-Medium',
        fontSize: 14,
        color: 'rgb(2, 132, 254)'
    },
    textReadMore: {
        fontFamily: 'NotoSansCJKjp-Medium',
        fontSize: 11,
        color: 'rgba(190, 212, 230, 255)'
    },
    listText: {
        color: '#0385ff',
        alignSelf: 'center',
        backgroundColor: 'transparent',
        fontSize: 14,
        marginRight: 8,
        marginLeft: 8,
    },
})