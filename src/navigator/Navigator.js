import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from '../store/configureStore';
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';


import SignupContainer from '../container/Signup';
import LoginContainer from '../container/Login';
import Forgotpassword from '../container/ForgotPassword';


// const tabNavigator = createBottomTabNavigator(
//     {
//         // Dashboard: DashboardContainer, 
//         // Questions: Questions,
//         // Answer: PostAnswer,
//         // Others: DashboardContainer


//         ホーム: DashboardContainer,
//         回答する: PostQuestionOrNotesContainer,
//         質問する: PostAnswer,
//         その他: DashboardContainer
//     },
//     {
//         defaultNavigationOptions: ({ navigation }) => ({
//             tabBarOnPress: ({ navigation, defaultHandler }) => {
               
//                 console.log(" State Routes =====", navigation.state.routeName);
//                  defaultHandler();
//             },

//             tabBarIcon: ({ focused, horizontal, tintColor }) => {
//                 const { routeName } = navigation.state;
//                 let IconComponent;
//                 let iconName;
//                 if (routeName === 'ホーム' || routeName === 'Dashboard') {
//                     IconComponent = IconEntypo;
//                     iconName = require('../../assets/home.png');

//                 } else if (routeName == '回答する' || routeName === 'Question') {
//                     IconComponent = IconMaterialCommunityIcon;
//                     iconName = require('../../assets/account.png');
//                 }
//                 else if (routeName === '質問する' || routeName === 'Answer') {
//                     IconComponent = IconFontAwesome5;
//                     iconName = require('../../assets/edit.png');

//                 } else if (routeName == 'その他' || routeName === 'Others') {
//                     IconComponent = IconFeather;
//                     iconName = require('../../assets/more.png');
//                 }

//                 // You can return any component that you like here!
//                 return <Image source={iconName} style={{tintColor: tintColor, width:20, height:20}}/>;
                
//                 // <IconComponent name={iconName} size={25} color={tintColor} />;
//             },
//         }),
//         tabBarOptions: {
//             activeTintColor: 'rgb(2, 132, 254)',
//             inactiveTintColor: 'rgba(73, 73, 73, 255);',
//         },
//     }
//);

const appStackNavigator = createStackNavigator({
   
    Login: {
        screen: LoginContainer
    },
    Signup: {
        screen: SignupContainer
    },
   
    // tabNavigator: {
    //     screen: tabNavigator
    // },
   
    Forgotpassword: {
        screen: Forgotpassword
    },
   
}, {
    initialRouteName: 'Login',
    gesturesEnabled: false,
    headerMode: 'none',
})
const RootNavigator = createAppContainer(appStackNavigator);

export class GameApp extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <Provider store={store}>
                <RootNavigator />
            </Provider>
        );
    }
}
export default RootNavigator;



