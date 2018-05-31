import React, { Component } from 'react';
import { View, Text } from 'react-native';
import DevicesScreen from './Devices';
import ProfileScreen from './Profile';
import StaticSreen from './Static';
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import io from 'socket.io-client/dist/socket.io';
window.navigator.userAgent = 'react-native';

export default class HomeScreen extends React.Component {
    state = {
        name: 'abc'
    }
    constructor() {
        super();
        this.socket = io('http://172.30.115.53:3000', { jsonp: false });
        this.socket.on('update', () => {
            console.log('change name', this.state.name);
            this.setState({ name: 'Nate' })
        });
    }
    render() {
        console.log('name', this.state.name);
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>{this.state.name}</Text>
            </View>
        );
    }
}
