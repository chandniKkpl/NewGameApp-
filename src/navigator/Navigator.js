import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from '../store/configureStore';
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import LoginContainer from '../container/Login';



const appStackNavigator = createStackNavigator({
   
    Login: {
        screen: LoginContainer
    }
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



