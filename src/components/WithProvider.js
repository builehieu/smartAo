import React, { Component } from 'react';
import { AppProvider } from './Provider';

export default function WithProvider(WrappedComponent) {
    return class Cp extends Component {
        render() {
            return (
                <AppProvider>
                    <WrappedComponent {...this.props} />
                </AppProvider>
            );
        }
    };
}