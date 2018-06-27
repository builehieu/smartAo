import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    AsyncStorage,
    BackHandler,
} from 'react-native';

import { createStackNavigator } from 'react-navigation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { makeCircle } from '../utils/metrics';
import { ACCESS_TOKEN } from '../utils/constants';
import ChangeUserInfor from './ChangeUserInfo';
import About from './About';

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    avatarWrapper: {
        padding: 20,
        flex: 0.4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarImg: {
        ...makeCircle(80),
    },
    textId: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
    },
    link: {
        color: '#0c9eff',
        fontSize: 13,
        fontWeight: 'bold',
        paddingTop: 10,
        paddingBottom: 10,
    },
    btnWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonLable: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    },
    button: {
        backgroundColor: 'red',
        padding: 10,
        width: '50%',
        margin: 5,
        borderRadius: 30,
    },
    opWrapper: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    opLable: {
        paddingLeft: 10,
        fontSize: 15,
        fontWeight: 'normal',
        color: 'gray'
    },
    op: {
        marginBottom: 10,
        padding: 10,
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'white',
        paddingLeft: 15,
        width: '100%',
        borderRadius: 30,
    },
});


class ProfileScreen extends React.Component {

    onPressBtnLogOut = async () => {
        try {
            await AsyncStorage.removeItem(ACCESS_TOKEN);
        } catch (error) {
            console.log('error: ', error);
        }
        BackHandler.exitApp();
    }

    render() {
        return (
            <View style={styles.root}>
                <View style={styles.avatarWrapper}>
                    <View style={{ flexDirection: 'column', top: 3, alignItems: 'center', justifyContent: 'space-between' }}>
                        <Image
                            source={{
                                uri:
                                    'https://scontent.fsgn5-4.fna.fbcdn.net/v/t1.0-9/32104688_1222457947888743_3455051136636026880_n.jpg?_nc_cat=0&_nc_eui2=AeHD-km8rixB_mM4XVPDnhq0Wfo_01Yp6GWWKiiqkLfgiyzVQFOkc00qIFtMJNm-7ufhB88SpMDfmXjO4PIbsKciREPbWV0EJotNCjpHAE_YGw&oh=91e884665607297bb2c9fd37f4e7e6d0&oe=5BAE5817'
                            }}
                            style={styles.avatarImg}
                        />
                        <Text style={styles.textId} >
                            Id: builehieu
                    </Text>
                    </View>
                </View>
                <View>
                    <View style={styles.opWrapper}>
                        <TouchableOpacity
                            style={styles.op}
                            onPress={() => this.props.navigation.navigate('ChangeUserInfor')}
                        >
                            <MaterialIcons name='account-circle' size={27} color='black' />
                            <Text style={styles.opLable}>Change user's info</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.op}>
                            <MaterialIcons name='lock-outline' size={27} color='black' />
                            <Text style={styles.opLable}>Change password</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.op}
                            onPress={() => this.props.navigation.navigate('About')}
                        >
                            <MaterialIcons name='info-outline' size={27} color='black' />
                            <Text style={styles.opLable}>About</Text>
                        </TouchableOpacity>
                    </View>

                </View>
                <View style={styles.btnWrapper}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this.onPressBtnLogOut()}
                    >
                        <Text style={styles.buttonLable}>Log Out</Text>
                    </TouchableOpacity>
                </View>
            </View >


        );
    }
}


export default ProfileNavigation = createStackNavigator({
    Profile: {
        screen: ProfileScreen,
        navigationOptions: () => ({
            title: `Profile`,
        }),
    },
    ChangeUserInfor: {
        screen: ChangeUserInfor,
        navigationOptions: () => ({
            title: `Change User's Infor`,
        }),
    },
    About: {
        screen: About,
        navigationOptions: () => ({
            title: `About`,
        }),
    },
},
    {

        headerMode: 'screen',
        initialRouteName: 'Profile',
    }
);
