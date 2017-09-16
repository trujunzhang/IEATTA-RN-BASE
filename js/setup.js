import React, {Component} from 'react';

import {Provider} from 'react-redux';
const configureStore = require('./store/configureStore')

import {StyleProvider} from 'native-base';
import App from './App';

import getTheme from '../native-base-theme/components';
import platform from '../native-base-theme/variables/platform';

const FacebookSDK = require('FacebookSDK')
const Parse = require('parse/react-native')

const {configureImageFolder} = require('./parse/fsApi')

Parse.initialize('YJ60VCiTAD01YOA3LJtHQlhaLjxiHSsv4mkxKvVM', '3S9VZj8y9g0Tj1WS64dl19eDJrEVpvckG7uhcXIi', '87rxX8J0JwaaPSBxY9DdKJEqWXByqE7sShRsX4vg')
Parse.serverURL = 'https://parseapi.back4app.com/'

configureImageFolder()

FacebookSDK.init();
Parse.FacebookUtils.init();


/**
 * ### Translations
 */
const I18n = require('react-native-i18n')

// Support fallbacks so en-US & en-BR both use en
I18n.fallbacks = true

import Translations from './lib/Translations'

I18n.translations = Translations

function setup(): React.Component {

    class Root extends Component {

        constructor() {
            super();
            this.state = {
                isLoading: false,
                store: configureStore(() => this.setState({isLoading: true})),
            };
        }

        render() {
            if (!this.state.isLoading) {
                return null;
            }
            return (
                <StyleProvider style={getTheme(platform)}>
                    <Provider store={this.state.store}>
                        <App/>
                    </Provider>
                </StyleProvider>
            );
        }
    }

    return Root;
}

export default setup;
