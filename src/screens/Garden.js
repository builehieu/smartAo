import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ToastAndroid, Math, Dimensions, ScrollView, StatusBar, FlatList } from 'react-native';
import { AppConsumer } from '../components/Provider';

import { Defs, LinearGradient, Stop } from 'react-native-svg'
import { LineChart, BarChart, Grid, ProgressCircle, YAxis, XAxis } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import * as scale from 'd3-scale'

import io from 'socket.io-client/dist/socket.io'
window.navigator.userAgent = 'react-native'

//charts libs
var e;
const styles = StyleSheet.create({
    root: {
        flex: 1,
        //justifyContent: 'flex-start',
        backgroundColor: '#f5f4ff',
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
    progressWrapper: {
        padding: 10,
        borderRadius: 10,
        justifyContent: 'flex-start',
        backgroundColor: 'white',
    },
    chartWrapper: {
        padding: 15,
        backgroundColor: 'white',
        borderRadius: 10,
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
        marginBottom: 10,
    },
    text2: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#262626'
    },
    Lable: {
        fontSize: 25,
        fontWeight: 'bold',
        paddingLeft: 10,
        color: '#262626'
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

class ProgressData extends Component {
    constructor() {
        super();
        this.state = {
        }
    }
    render() {
        return (
            <View style={{ backgroundColor: 'white', padding: 10 }}>
                <Text style={styles.text2}>{this.props.item.deviceName}</Text>
                <View style={{ alignItems: 'center', justifyContent: 'center', paddingTop: 15 }}>
                    <ProgressCircle
                        style={{ height: 100, width: 100 }}
                        progress={this.props.item.data / 100}
                        progressColor={this.props.item.color}
                        backgroundColor={'#e7e6f2'}
                    >
                    </ProgressCircle>
                    <Text style={{
                        color: '#262626',
                        position: 'absolute',
                        fontSize: 25,
                        fontWeight: 'bold',
                        paddingTop: 15
                    }}>{this.props.item.data}</Text>
                </View>
            </View>
        );
    }
}

export default class GardenScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            test: 'alooooo',
            cb_nhietdo: [50, 10, 40, 95, -4, -24, 85, 21, 35, 53, -53, 50, 10, 40, 95, -4, -24, 85, 21, 35, 53, -53,],
            cb_doamD: [90, -10, 40, 35, -54, -24, 80, 9, 53, 23, 53, 50, 10, 40, 95, -4, -24, 85, 21, 35, 53, -53,],
            cb_doamK: [90, -10, 40, 35, -54, -24, 80, 9, 53, 23, 53, 50, 10, 40, 95, -4, -24, 85, 21, 35, 53, -53,],
            cb_anhsang: [90, -10, 40, 35, -54, -24, 80, 9, 53, 23, 53, 50, 10, 40, 95, -4, -24, 85, 21, 35, 53, -53,],
            r_nhietdo: 30,
            r_doamD: 50,
            r_doamK: 70,
            r_anhsang: 70,
            token: '',
        }
        e = this;
        this.socket = io('http://172.30.115.63:3000', { jsonp: false });
        this.socket.on('authenticated', function (data) {
            ToastAndroid.show('Welcome ' + data, ToastAndroid.SHORT);
        })
        this.socket.on('dataSensor', (data) => {
            console.log('data: ', data);
            // nhiet do
            var f = this.state.cb_nhietdo.concat(data.nhietdo1);
            f.splice(0, 1);
            this.setState({ cb_nhietdo: f });
            var s = Number((data.nhietdo1).toFixed(0))
            this.setState({ r_nhietdo: s });
            //do am dat
            var g = this.state.cb_doamD.concat((data.doam1/1023)*100);
            g.splice(0, 1);
            this.setState({ cb_doamD: g });
            s = Number(((data.doam1/1023)*100).toFixed(0))
            this.setState({ r_doamD: s });
            // do am khong khi
            s = Number((data.doamKK1).toFixed(0))
            this.setState({ r_doamK: s });
            // cd AS
            var s = Number((data.anh_sang1).toFixed(0))
            this.setState({ r_anhsang: s });

        });
        this.socket.on('getData', function (data) {
            console.log('data: ', data);
            var f = [];
            const hlist = data.map(sensorName =>{
                console.log('sensorName: ', sensorName.data);
                f = f.concat(sensorName.data);   
            })
            console.log('f : ', f);
            e.setState({cb_nhietdo: f});
            console.log('cambien1 : ', e.state.cb_nhietdo);
        })

    }

    componentWillMount(){
        this.getData();
    }

    getData(){
        this.socket.emit('getData', {name: 'nhietdo1'});
        console.log('press button')
    }


    render() {
        const xAxisHeight = 30
        const verticalContentInset = { top: 10, bottom: 10 }
        const axesSvg = { fontSize: 10, fill: 'grey' };

        const Gradient = () => (
            <Defs key={'gradient'}>
                <LinearGradient id={'blue'} x1={'0'} y={'0%'} x2={'100%'} y2={'0%'}>
                    <Stop offset={'0%'} stopColor={'#fdc830'} />
                    <Stop offset={'100%'} stopColor={'#f37335'} />
                </LinearGradient>
                <LinearGradient id={'red'} x1={'0'} y={'60%'} x2={'0%'} y2={'60%'}>
                    <Stop offset={'0%'} stopColor={'#ff0000'} />
                    <Stop offset={'100%'} stopColor={'#ff0066'} />
                </LinearGradient>
                <LinearGradient id={'yellow'} x1={'0'} y={'50%'} x2={'0%'} y2={'60%'}>
                    <Stop offset={'0%'} stopColor={'#ffff00'} />
                    <Stop offset={'100%'} stopColor={'#ff9933'} />
                </LinearGradient>
            </Defs>
        )

        return (
            <AppConsumer>
                {({ username, setUsername }) => (
                    <View style={styles.root}>
                        <StatusBar
                            backgroundColor="#d9e3ef"
                            barStyle="dark-content"
                        />
                        <View style={styles.header}>
                            <Text style={styles.Lable}>Tổng Quan</Text>
                        </View>
                        <ScrollView >
                            <FlatList
                                style={{ flexDirection: 'row', paddingLeft: 10, backgroundColor: 'white' }}
                                horizontal={true}
                                data={[
                                    {
                                        "key": "01",
                                        "deviceName": "Nhiệt độ",
                                        "color": "#e2322f",
                                        "data": this.state.r_nhietdo,
                                    },
                                    {
                                        "key": "02",
                                        "deviceName": "Độ ẩm đất",
                                        "color": "#72209b",
                                        "data": this.state.r_doamD,
                                    },
                                    {
                                        "key": "03",
                                        "deviceName": "Độ ẩm KK",
                                        "color": "#94f0fc",
                                        "data": this.state.r_doamK,
                                    },
                                    {
                                        "key": "04",
                                        "deviceName": "Cường độ AS",
                                        "color": "#ffd259",
                                        "data": this.state.r_anhsang,
                                    }
                                ]}
                                renderItem={({ item, index }) => {
                                    return (
                                        <ProgressData item={item} index={index}>
                                        </ProgressData>
                                    );
                                }}
                            >
                            </FlatList>

                            <View style={styles.dataWrapper}>
                                <View style={styles.chartWrapper}>
                                    <Text style={styles.text2}>Nhiệt độ tuần</Text>
                                    <View style={{ flexDirection: 'row', height: 200 }}>
                                        <YAxis
                                            data={this.state.cb_nhietdo}
                                            style={{ marginBottom: xAxisHeight, }}
                                            contentInset={verticalContentInset}
                                            svg={axesSvg}
                                        />
                                        <View style={{ flex: 1, paddingLeft: 1 }}>
                                            <LineChart
                                                style={{ flex: 1 }}
                                                data={this.state.cb_nhietdo}
                                                contentInset={verticalContentInset}
                                                curve={shape.curveNatural}
                                                svg={{
                                                    strokeWidth: 2,
                                                    stroke: 'url(#red)',
                                                }}
                                            >
                                                <Grid />
                                                <Gradient />
                                            </LineChart>
                                            <XAxis
                                                style={{ marginHorizontal: -10, height: xAxisHeight }}
                                                data={this.state.cb_nhietdo}
                                                formatLabel={(value, index) => index}
                                                contentInset={{ left: 10, right: 10 }}
                                                svg={axesSvg}
                                            />
                                        </View>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.dataWrapper}>
                                <View style={styles.chartWrapper}>
                                    <Text style={styles.text2}>Độ ẩm đất tuần</Text>
                                    <View style={{ flexDirection: 'row', height: 200 }}>
                                        <YAxis
                                            data={this.state.cb_doamD}
                                            style={{ marginBottom: xAxisHeight }}
                                            contentInset={verticalContentInset}
                                            svg={axesSvg}
                                        />
                                        <View style={{ flex: 1, paddingLeft: 1 }}>

                                            <BarChart
                                                style={{ flex: 1 }}
                                                data={this.state.cb_doamD}
                                                gridMin={0}
                                                svg={{ fill: '#2f53a8' }}
                                            >
                                                <Grid />
                                            </BarChart>
                                            <XAxis
                                                style={{ marginTop: 10 }}
                                                data={this.state.cb_doamD}
                                                scale={scale.scaleBand}
                                                formatLabel={(value, index) => index}
                                                svg={axesSvg}
                                            />
                                        </View>
                                    </View>
                                </View>
                                <Text> </Text>
                            </View>
                        </ScrollView>

                    </View>
                )}
            </AppConsumer>
        );
    }
}
