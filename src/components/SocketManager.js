import React from 'react';

import io from 'socket.io-client/dist/socket.io';
window.navigator.userAgent = 'react-native';

export default class SocketManager {
    static socket = null;
    static connect(onConnect) {
        if(SocketManager.socket) return;
        SocketManager.socket = io('http://172.16.117.121:3000', {jsonp: false});
        SocketManager.socket.on('connected', function() {
            if(onConnect) onConnect();
        });
    }
}