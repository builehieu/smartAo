import React from 'react';

import { AsyncStorage } from 'react-native';
import LogInScreen from './src/screens/LogIn';
import MainScreen from './src/screens/MainScreen';
import { AppConsumer, AppProvider } from './src/components/Provider'
import { createStackNavigator } from 'react-navigation';
import WithProvider from './src/components/WithProvider';

import { ACCESS_TOKEN } from './src/utils/constants';
import SignUpScreen from './src/screens/SignUp';



const Navigation = createStackNavigator({
    Home: { screen: MainScreen },
    LogIn: { screen: LogInScreen },
    SignUp: { screen: SignUpScreen },
},
    {
        headerMode: 'none',
        initialRouteName: 'LogIn',
    }
);



export default class App extends React.Component {
    state = {
        display: 'home',
    };
    async componentWillMount() {
        let token = await AsyncStorage.getItem(ACCESS_TOKEN);
        console.log('token: ', token);
        if (!token)
            this.setState({ display: 'login' });
        else
            this.setState({ display: 'home' });
    }

    render() {
        if (this.state.display === 'home')
            return (
                <AppProvider>
                    <MainScreen />
                </AppProvider>
            );
        else
            return (
                <AppProvider>
                    <Navigation />
                </AppProvider>
            );
    }
};