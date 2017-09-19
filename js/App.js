import React, {Component} from "react";
import {StyleSheet} from "react-native";

import {Container, Content, Text, View} from "native-base";
import MainStackRouter from "./Routers/MainStackRouter";
import ProgressBar from "./components/loaders/ProgressBar";

const {delayEvent} = require('./lib/utils')

const LoginScreen = require('./components/lib/login/LoginScreen')
const LoginModal = require('./components/lib/login/LoginModal')

const {
    startAsyncTask,
    syncBetweenParseAndRealm,
    queryNearRestaurant,
    updateLocationPosition,
    setFetchLocationPositionError,
} = require('./actions');

/**
 * The states were interested in
 */
const {
    // Geo Location Type
    REDUX_SAGA_LOCATION_ACTION_SET_POSITION,
    REDUX_SAGA_LOCATION_ACTION_SET_ERROR,
    REDUX_SAGA_LOCATION_ACTION_REQUEST,
} = require('./lib/constants').default


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
            if (self.props.config.isSyncTask === false) {
                self.scheduledTask()
            } else {
                console.log("async task is already running!")
            }
        }, 1 * 60 * 1000)

        this.setState({intervalId: intervalId})
    }

    componentWillUnmount() {
        // Cancel the timer when you are done with it
        BackgroundTimer.clearInterval(this.state.intervalId)

        navigator.geolocation.clearWatch(this.watchID)
    }

    componentDidMount() {
        const {dispatch} = this.props;

        // Module: Async Task.
        this.setupAsyncTask();

        // Module: Location Tracker.
        navigator.geolocation.getCurrentPosition(
            (position) => {
                dispatch(updateLocationPosition(position))
            },
            (error) => {
                // last position error: {"message":"Location request timed out","code":3}
                const message = error.message || error;
                if (message.indexOf('timed out') === -1) {
                    console.log("last position error: " + JSON.stringify(error));
                    // dispatch(setFetchLocationPositionError(error))
                }
            },
            {enableHighAccuracy: true, timeout: 40 * 1000, maximumAge: 1 * 1000}
        )
        this.watchID = navigator.geolocation.watchPosition((position) => {

            dispatch(updateLocationPosition(position))

            console.log("last position: " + JSON.stringify(position));
            delayEvent(function () {
                dispatch(queryNearRestaurant({position}))
            }, 700)
        })
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
        currentUser: store.user,
        config: store.config,
    };
}

export default connect(select)(App)
