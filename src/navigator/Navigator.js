import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from '../store/configureStore';
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import LoginContainer from '../container/Login';
import DashboardContainer from '../container/Dashboard';
import IconEntypo from 'react-native-vector-icons/MaterialIcons';
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import IconMaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import IconFeather from 'react-native-vector-icons/Feather';

const tabNavigator = createBottomTabNavigator(
    {
        Dashboard: DashboardContainer, 
        Questions: DashboardContainer,
        Answer: DashboardContainer,
        Others: DashboardContainer
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarOnPress: ({ navigation, defaultHandler }) => {
                 defaultHandler();
            },

            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                const { routeName } = navigation.state;
                let IconComponent;
                let iconName;
                if (routeName === 'Dashboard') {
                    IconComponent = IconEntypo;
                    iconName = `home${focused ? '' : ''}`;

                } else if (routeName === 'Question') {
                    IconComponent = IconMaterialCommunityIcon;
                    iconName = 'account-question'
                }
                else if (routeName === 'Answer') {
                    IconComponent = IconFontAwesome5;
                    iconName = `edit`;

                } else if (routeName === 'Others') {
                    IconComponent = IconFeather;
                    iconName = 'more-horizontal';
                }

                // You can return any component that you like here!
                return <IconComponent name={iconName} size={25} color={tintColor} />;
            },
        }),
        tabBarOptions: {
            activeTintColor: 'rgb(2, 132, 254)',
            inactiveTintColor: 'rgba(73, 73, 73, 255);',
        },
    }
);


const appStackNavigator = createStackNavigator({
   
    Login: {
        screen: LoginContainer
    },
    Dashboard: {
        screen: DashboardContainer
    },
    tabNavigator: {
        screen: tabNavigator
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



