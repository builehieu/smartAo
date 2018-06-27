import React, { Component } from 'react';
import { View, Text, AsyncStorage, TouchableOpacity, StyleSheet, ToastAndroid, Math, Dimensions, ScrollView } from 'react-native';
import DevicesScreen from './Devices';
import ProfileScreen from './Profile';
import StaticSreen from './Static';
import { StackNavigator, TabNavigator, TabBarBottom, } from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { AppConsumer } from '../components/Provider';
import { ACCESS_TOKEN } from '../utils/constants';

import { Defs, LinearGradient, Stop } from 'react-native-svg';
import { LineChart, BarChart, Grid, ProgressCircle, YAxis, XAxis } from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import * as scale from 'd3-scale'

import io from 'socket.io-client/dist/socket.io';
window.navigator.userAgent = 'react-native';

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
    header: {
        padding: 10,
        justifyContent: 'flex-start',
        backgroundColor: 'white',
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
        const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80]
        const xAxisHeight = 30
        const verticalContentInset = { top: 10, bottom: 10 }
        const axesSvg = { fontSize: 10, fill: 'grey' };

        const Gradient = () => (
            <Defs key={'gradient'}>
                <LinearGradient id={'gradient'} x1={'0'} y={'0%'} x2={'100%'} y2={'0%'}>
                    <Stop offset={'0%'} stopColor={'rgb(134, 65, 244)'} />
                    <Stop offset={'100%'} stopColor={'rgb(66, 194, 244)'} />
                </LinearGradient>
            </Defs>
        )


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
                    <View style={styles.root}>
                        <View style={styles.header}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ alignItems: 'center', justifyContent: 'space-between' }}>
                                    <ProgressCircle
                                        style={{ height: 100, width: 100 }}
                                        progress={0.7}
                                        progressColor={'rgb(77, 166, 255)'}
                                    />
                                    <Text style={styles.text}>Độ ẩm</Text>
                                </View>
                                <View style={{ alignItems: 'center', justifyContent: 'space-between' }}>
                                    <ProgressCircle
                                        style={{ height: 100, width: 100 }}
                                        progress={0.9}
                                        progressColor={'rgb(255, 80, 80)'}
                                    />
                                    <Text style={styles.text}>Dinh Dưỡng</Text>
                                </View>
                                <View style={{ alignItems: 'center', justifyContent: 'space-between' }}>
                                    <ProgressCircle
                                        style={{ height: 100, width: 100 }}
                                        progress={0.2}
                                        progressColor={'rgb(255, 153, 51)'}
                                    />
                                    <Text style={styles.text}>Nhiệt độ</Text>
                                </View>
                            </View>
                        </View>
                        <ScrollView>
                            <View style={styles.dataWrapper}>
                                <Text style={styles.text}>Tổng quan</Text>
                                <View style={styles.chartWrapper}>
                                    <View style={{ flexDirection: 'row', height: 200 }}>
                                        <YAxis
                                            data={data}
                                            style={{ marginBottom: xAxisHeight }}
                                            contentInset={verticalContentInset}
                                            svg={axesSvg}
                                        />
                                        <View style={{ flex: 1, paddingLeft: 1 }}>

                                            <LineChart
                                                style={{ flex: 1 }}
                                                data={data}
                                                contentInset={verticalContentInset}
                                                curve={shape.curveNatural}
                                                svg={{
                                                    strokeWidth: 2,
                                                    stroke: 'url(#gradient)',
                                                }}
                                            >
                                                <Grid />
                                                <Gradient />
                                            </LineChart>
                                            <XAxis
                                                style={{ marginHorizontal: -10, height: xAxisHeight }}
                                                data={data}
                                                formatLabel={(value, index) => index}
                                                contentInset={{ left: 10, right: 10 }}
                                                svg={axesSvg}
                                            />

                                        </View>

                                    </View>
                                </View>
                            </View>

                            <View style={styles.dataWrapper}>
                                <Text style={styles.text}>Tổng quan</Text>
                                <View style={styles.chartWrapper}>
                                    <View style={{ flexDirection: 'row', height: 200 }}>
                                        <YAxis
                                            data={data}
                                            style={{ marginBottom: xAxisHeight }}
                                            contentInset={verticalContentInset}
                                            svg={axesSvg}
                                        />
                                        <View style={{ flex: 1, paddingLeft: 1 }}>

                                            <BarChart
                                                style={{ flex: 1 }}
                                                data={data}
                                                gridMin={0}
                                                svg={{ fill: 'rgb(134, 65, 244)' }}
                                            />
                                            <XAxis
                                                style={{ marginTop: 10 }}
                                                data={data}
                                                scale={scale.scaleBand}
                                                formatLabel={(value, index) => index}
                                                labelStyle={{ color: 'black' }}
                                            />

                                        </View>

                                    </View>
                                </View>
                            </View>
                        </ScrollView>

                    </View>
                )}
            </AppConsumer>
        );
    }
}
