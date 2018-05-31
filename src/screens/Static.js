import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { StackNavigator } from 'react-navigation';

export default class StaticScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Statics Screen</Text>
            </View>
        );
    }
}