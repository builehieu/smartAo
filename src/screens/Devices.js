import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch } from 'react-native';

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#f2f1ed',
    },
    dataWrapper: {
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
    },
    header: {
        padding: 10,
        justifyContent: 'flex-start',
        backgroundColor: 'white',
    },
    deviceWrapper: {
        padding: 15,
        backgroundColor: 'white',
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    buttonsWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 15,
        fontWeight: 'bold',
        paddingLeft: 10,
        paddingBottom: 10,
    },
    buttonLable: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    },
    button: {
        backgroundColor: '#0c9eff',
        padding: 10,
        width: '100%',
        margin: 5,
        borderRadius: 30,
    }
})
export default class DevicesScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            SwitchOnValueHolder: false
        }
    }
    onSwitch(value){
        if(value)
            this.setState({SwitchOnValueHolder: false})
        else
            this.setState({SwitchOnValueHolder: true})
    }
    render() {
        return (
            <View style={styles.root}>
                <ScrollView style={styles.dataWrapper}>
                    <View style={styles.deviceWrapper}>
                        <Text style={styles.text}>Device 1</Text>
                        <View style={styles.btnWrapper}>
                            <Switch
                                onValueChange={() => this.onSwitch(this.state.SwitchOnValueHolder)}
                                value={this.state.SwitchOnValueHolder} />
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}