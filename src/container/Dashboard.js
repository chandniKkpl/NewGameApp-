import React from "react";
import { connect } from "react-redux";
import { AsyncStorage,View } from 'react-native';
//import { getDashboardData, getDashboardQandA, getDashboardClinicalNotes, getDashboardTagFeed, getDashboardTimeLineData, getDashboardSelectedTag, callApiToFollowUnfollowPost } from "../actions/dashboard";
//import { getMyProfileData } from '../actions/myProfile';
//import Dashboard from "../components/Dashboard/Dashboard";
//import postMenuConstants from '../constants/PostMenu';
//import dashboardConstants from '../constants/Dashboard';
//import qAndAJson from '../components/Dashboard/QnA.json';
import * as wordConstants from '../constants/WordConstants';

class DashboardContainer extends React.PureComponent {
    state = {
        data: {
            search: "",
        },
        fetching: false,
        errors: {},
        arrayData: [],
        onSuccess: false,
        auth_token: '',
        myProfileData: '',
        selectedCategoryOption: ''
    };


    componentDidMount() {

        // if (this.props.navigation.state.params && this.props.navigation.state.params.auth_token) {
        //     this.setState({
        //         auth_token: this.props.navigation.state.params.auth_token,
        //     });
        // }
        // // // this.callMyProfileApi();
        // // this.props.navigation.setParams({
        // //   onTabFocus: this.handleTabFocus
        // // });
        // this.props.navigation.addListener('didFocus', this.onScreenFocus)

    }

    // onScreenFocus = () => {
    //     console.log(" =========== onScreenFocus ");
    //     // Screen was focused, our on focus logic goes here

    //     this.callDashboardApi();
    // }

    // async _getAuthToken() {
    //     const auth_token = await AsyncStorage.getItem(wordConstants.CONST_AUTH_TOKEN);
    //     console.log("************", auth_token);
    //     if (auth_token == null) {
    //     } else {
    //         this.setState({
    //             auth_token: auth_token
    //         });
    //         //  return auth_token
    //     }
    // }

    // _handleChange = (name, value) => {
    //     const { data } = this.state;
    //     data[name] = value;
    //     this.setState(
    //         {
    //             data: JSON.parse(JSON.stringify(data))
    //         }
    //     );
    // };
  

    //* Calling Apis  *//

    

    callDashboardApi = () => {

        this.setState({ fetching: true })
       
        let postData = {
            "limit": 20,
            "paginate": 1,
        }

        postData.limit = 20;
        postData.paginate = 1;
        postData.category_id = 2;

        if (this.props.navigation.state.params && this.props.navigation.state.params.auth_token) {
            this.props.getDashboardData(postData, this.props.navigation.state.params.auth_token).then((response) => {

                this.setState({ fetching: false })
                let resData = response.data;

                //  if (!resData.success) {
                //   if (resData.message) {
                //     alert(resData.message);
                //   }
                //   return;
                //  }


                if (response) {
                    if (response.status === 200) {
                        this.setState({
                            arrayData: resData.all_posts.data
                        });
                    } else {
                       
                        if (resData.data.message) {
                            alert(resData.data.message);
                        } else {
                           
                            // alert(wordConstants.CONST_INTERNET_ISSUE_MESSAGE);
                        }
                    }

                } else {
                   
                    alert(wordConstants.CONST_INTERNET_ISSUE_MESSAGE)
                }


            });
        }
    }

   
    render() {
        const { data, errors, fetching, onSuccess, auth_token } = this.state;

        return (
            <View>

            </View>
            // <Dashboard
            //     formData={data}
            //     onSuccess={onSuccess}
            //     dashboard={this.state.arrayData}
            //     //myProfileData={this.state.myProfileData}
            //     errors={errors}
            //     fetching={fetching}
            //     handleChange={this._handleChange}
            //     navigation={this.props.navigation}
            //     auth_token={auth_token}
            //     postMenuOptionClick={this.postMenuOptionClick}
            //     selectedCategoryOption={this.state.selectedCategoryOption}
            //     handleFollowUnfollow={this.handleFollowUnfollowPost}
            // />
        );
    }
}

// eslint-disable-next-line
const mapStateToProps = state => {

    return {

    };
};

// eslint-disable-next-line
const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardContainer);
