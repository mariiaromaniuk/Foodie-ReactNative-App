import React, { Component } from 'react';
import { Image, View } from 'react-native';
// we have our provider in app.js that provides a store. 
// inject in our component - takes that store and injects it into the class
import { inject } from 'mobx-react';

// the decorator
@inject("stores") 
export default class SplashScreen extends Component {
    constructor(props) {
        super(props)
    }
    // use react navigation and tell it to leave the splash screen 
    // and go to the log in screen
    componentDidMount() {
        const { stores, navigation } = this.props;
        setTimeout(() => {
            navigation.navigate("Login")
        }, stores.config.SplashTime) // the time (ms) we want it to wait
    }
    render() {
        const { stores } = this.props
        return (
            <View style={{ flex: 1 }}>
                <Image style={{ flex: 1, width: null, height: null }} source={stores.config.SplashImg} />
            </View>
        )
    }
}