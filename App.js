import React from 'react';


import LogInScreen from './src/screens/LogIn';
import MainScreen from './src/screens/MainScreen';
import { AppConsumer, AppProvider } from './src/components/Provider'
import { createStackNavigator } from 'react-navigation';
import WithProvider from './src/components/WithProvider';



const Navigation = createStackNavigator({
    Home: { screen: MainScreen },
    LogIn: { screen: LogInScreen },
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

    initApp(isLogIn) {
        console.log('isLogIn:', isLogIn);
        if (isLogIn === 'true')
            return <MainScreen />
        else
            return <LogInScreen />


    };

    render() {
        return (
            <AppProvider>
                <AppConsumer>
                    {({ isLogIn }) => (
                        this.initApp(isLogIn)
                    )}
                </AppConsumer>
            </AppProvider>
        );
    }
};