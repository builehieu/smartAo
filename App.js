import React from 'react';


import LogInScreen from './src/screens/LogIn';
import HomeScreen from './src/screens/Home';
import {AppProvider} from './src/components/Provider'
import { StackNavigator } from 'react-navigation';
import WithProvider from './src/components/WithProvider';


const Navigation = StackNavigator({
    Home: { screen: WithProvider(HomeScreen) },
    LogIn: { screen: WithProvider(LogInScreen) },
},
    {
        headerMode: 'none',
        initialRouteName: 'LogIn',
    }
);

export default class App extends React.Component {
    render() {
        return (
                <Navigation />
        );
    }
};