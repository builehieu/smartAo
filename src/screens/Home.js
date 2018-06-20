import React, { Component } from 'react';
import { View, Text, AsyncStorage, TouchableOpacity, StyleSheet, ToastAndroid, Math, Dimensions, ScrollView } from 'react-native';
import DevicesScreen from './Devices';
import ProfileScreen from './Profile';
import StaticSreen from './Static';
import { StackNavigator, TabNavigator, TabBarBottom, } from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { AppConsumer } from '../components/Provider';
import { ACCESS_TOKEN } from '../utils/constants';


import io from 'socket.io-client/dist/socket.io';
window.navigator.userAgent = 'react-native';

import PureChart from 'react-native-pure-chart';
//charts libs
var e;
const styles = StyleSheet.create({
    root: {
        flex: 1,
        //justifyContent: 'flex-start',
        backgroundColor: '#f2f1ed',
    },
    dataWrapper: {
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        justifyContent: 'flex-start',

    },
    chartWrapper: {
        padding: 15,
        backgroundColor: 'white',
        borderRadius: 15,
    },
    inputWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        //  backgroundColor: 'orange'
    },
    buttonsWrapper: {
        flex: 0.2,
        alignItems: 'center',
        justifyContent: 'center',
        //  backgroundColor: 'cyan'
    },
    textInput: {
        borderWidth: 1,
        backgroundColor: '#faf9f9',
        borderColor: '#e4e4e4',
        margin: 5,
        paddingLeft: 18,
        borderRadius: 30,
        width: '78%',
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
    link: {
        color: '#0c9eff',
        fontSize: 13,
        fontWeight: 'bold',
        paddingTop: 10,
        paddingBottom: 10,
    },
    button: {
        backgroundColor: '#0c9eff',
        padding: 10,
        width: '60%',
        margin: 5,
        borderRadius: 30,
    },
    smallButton: {
        alignSelf: 'center'
    }
})
const screenWidth = Dimensions.get('window').width;

export default class HomeScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            test: 'alooooo',
            cam_bien1: [{x:10, y:0}],
            cam_bien2: [{x:10, y:0}],
        }
        e = this;
        this.socket = io('http://172.30.115.59:3000', { jsonp: false });
        this.socket.on('authenticated', function (data) {
            ToastAndroid.show('Welcome ' + data, ToastAndroid.SHORT);
        });
        this.socket.on('data_cambien1', (data) => {
            console.log('cam bien 1: ',data);
            var j = this.state.cam_bien1.concat(data);
            console.log('j: ' ,j);
            j.splice(0,1);
            console.log('j after delete: ' ,j);
            e.setState({ cam_bien1: j });
        });
        this.socket.on('data_cambien2', (data) => {
            console.log('cam bien 2: ',data);
            var f = this.state.cam_bien2.concat(data);
            console.log('f: ' ,f);
            f.splice(0,1);
            console.log('f after delete: ' ,f);
            e.setState({ cam_bien2: data });
           
           
        });
    }



    render() {
        let sampleDataPie = [
            {
                value: 50,
                label: 'Marketing',
                color: '#ffbe63',
            }, {
                value: 10,
                label: 'Sales',
                color: '#297AB1'
            }, {
                value: 40,
                label: 'Support',
                color: '#9dd671'
            }

        ]

        let sampleData = [
            {
                seriesName: 'series1',
                data: this.state.cam_bien1,
                color: '#297AB1'
            },
            {
                seriesName: 'series2',
                data:this.state.cam_bien2,
                color: 'purple'
            }
        ]
        return (
            <AppConsumer>
                {({ username, setUsername }) => (
                    <ScrollView style={styles.root}>
                        <View style={styles.dataWrapper}>
                            <Text style={styles.text}
                            >Tổng Quan</Text>
                            <View style={styles.chartWrapper}>
                                {/* <PureChart
                                    data={sampleDataPie}
                                    type={'pie'}
                                /> */}
                            </View>
                        </View>
                        <View style={styles.dataWrapper}>
                            <Text style={styles.text}
                            >Cam biens:</Text>
                            <View style={styles.chartWrapper}>
                                <PureChart type={'line'}
                                    data={sampleData}
                                    width={'100%'}
                                    customValueRenderer={(index, point) => {
                                        if (index % 2 === 0) return null
                                        return (
                                            <Text style={{ textAlign: 'center', fontSize: 10 }}>{point.y}</Text>
                                        )
                                    }} />
                            </View>
                        </View>
                        <View style={styles.dataWrapper}>
                            <Text style={styles.text}
                            >Mật độ ánh sáng 2 T6</Text>
                            <View style={styles.chartWrapper}>
                                {/* <PureChart type={'bar'}
                                    data={sampleData}
                                    width={'100%'}
                                    customValueRenderer={(index, point) => {
                                        if (index % 2 === 0) return null
                                        return (
                                            <Text style={{ textAlign: 'center' }}>{point.y}</Text>
                                        )
                                    }} /> */}
                            </View>
                        </View>

                    </ScrollView>
                )}
            </AppConsumer>
        );
    }
}
