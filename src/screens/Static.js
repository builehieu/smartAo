import React, { Component } from 'react';
import { View, Text, TouchableOpacity} from 'react-native';

import { StackNavigator } from 'react-navigation';
import io from 'socket.io-client/dist/socket.io';
window.navigator.userAgent = 'react-native';


export default class StaticScreen extends React.Component {
     constructor() {
        super();
        this.state = {
            test: 'alooooo',
            cam_bien1: [50, 10, 40, 95, -4, -24, 85, 21, 35, 53, -53,],
            token: '',
        }
        e = this;
        this.socket = io('http://172.30.115.63:3000', { jsonp: false });
        this.socket.on('getData', function (data) {
            console.log('data: ', data);
        })
        
        
    }
    getData(){
        this.socket.emit('getData', {name: 'doam1'});
        console.log('press button')
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity onPress={() => this.getData()}>
                <Text>Statics Screen</Text>
            </TouchableOpacity>
            </View>
        );
    }
}