import React, {Component} from "react";
import {StyleSheet} from "react-native";
import CodePush from "react-native-code-push";

import {Container, Content, Text, View} from "native-base";
import Modal from "react-native-modalbox";
import MainStackRouter from "./Routers/MainStackRouter";
import ProgressBar from "./components/loaders/ProgressBar";

import theme from "./themes/base-theme";

const LoginScreen = require('./components/lib/login/LoginScreen')
const LoginModal = require('./components/lib/login/LoginModal')

const {
    startAsyncTask,
    syncBetweenParseAndRealm,
    switchTab,
    queryNearRestaurant,
} = require('./actions');

import BackgroundTimer from 'react-native-background-timer'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: null,
        height: null
    },
    modal: {
        justifyContent: "center",
        alignItems: "center"
    },
    modal1: {
        height: 300
    }
});

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDownloadingModal: false,
            showInstalling: false,
            downloadProgress: 0
        };
    }

    scheduledTask() {
        this.props.dispatch(startAsyncTask())
        this.props.dispatch(syncBetweenParseAndRealm())
    }

    setupAsyncTask() {
        const self = this;
        self.scheduledTask()
        // Start a timer that runs continuous after X milliseconds
        const intervalId = BackgroundTimer.setInterval(() => {
            // this will be executed every 10 minutes
            // even when app is the the background
            // if (self.props.config.isSyncTask === false) {
            self.scheduledTask()
            // } else {
            //     console.log("async task is already running!")
            // }
        }, 1 * 60 * 1000)

        this.setState({intervalId: intervalId})
    }

    componentDidMount() {
        this.setupAsyncTask();
    }

    render() {
        // if (!this.props.isLoggedIn|| true) {
        if (!this.props.isLoggedIn) {
            return <LoginScreen/>
            // return <LoginModal/>
        }

        return <MainStackRouter/>;
    }
}


const {connect} = require('react-redux')

function select(store) {
    return {
        isLoggedIn: store.user.isLoggedIn || store.user.hasSkippedLogin,
        currentUser: store.user
    };
}

export default connect(select)(App)
