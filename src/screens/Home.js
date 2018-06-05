import React, { Component } from 'react';
import { View, Text } from 'react-native';
import DevicesScreen from './Devices';
import ProfileScreen from './Profile';
import StaticSreen from './Static';
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { AppConsumer } from '../components/Provider';

import io from 'socket.io-client/dist/socket.io';
window.navigator.userAgent = 'react-native';

//charts libs
var e;
export default class HomeScreen extends React.Component {
    constructor() {
        super();
    }
    render() {
        const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80];
        return (
            <AppConsumer>
                {({ username, setUsername, isLogIn }) => (
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text>{username} is logIn: {isLogIn}</Text>
                    </View>
                )}
            </AppConsumer>
        );
    }
}
