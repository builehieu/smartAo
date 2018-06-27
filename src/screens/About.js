import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class About extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>About</Text>
            </View>
        );
    }
}