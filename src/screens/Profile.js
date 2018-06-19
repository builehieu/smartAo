import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    ToastAndroid,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    Image,
    AsyncStorage,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


import { List, ListItem } from 'react-native-elements'
import { makeCircle } from '../utils/metrics';
import { ACCESS_TOKEN } from '../utils/constants';


const list = [
    {
        title: 'Change information',
        icon: 'create'
    },
    {
        title: 'Change password',
        icon: 'vpn-key'
    },
    {
        title: 'About',
        icon: 'info-outline'
    },
]

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'flex-start',
        
        // backgroundColor: 'blue',
    },
    avatarWrapper: {
        padding: 20,
        flex: 0.4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnWrapper: {
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
        backgroundColor: 'red',
        padding: 10,
        width: '50%',
        margin: 5,
        borderRadius: 30,
    },
});


export default class ProfileScreen extends React.Component {

    onPressBtnLogOut = async () => {
        try {
            await AsyncStorage.removeItem(ACCESS_TOKEN);
        } catch (error) {
            console.log('error: ', error);
        }
        this.props.navigation.navigate('LogIn');
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
                <List>
                    {
                        list.map((item, i) => (
                            <ListItem
                                key={i}
                                title={item.title}
                                leftIcon={{ name: item.icon }}
                            />
                        ))
                    }
                </List>
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