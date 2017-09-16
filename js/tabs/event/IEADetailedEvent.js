/**
 * Copyright 2016 Facebook, Inc.
 *
 * You are hereby granted a non-exclusive, worldwide, royalty-free license to
 * use, copy, modify, and distribute this software in source code or binary
 * form for use in connection with the web services and APIs provided by
 * Facebook.
 *
 * As with any software that integrates with the Facebook platform, your use
 * of this software is subject to the Facebook Developer Principles and
 * Policies [http://developers.facebook.com/policy/]. This copyright notice
 * shall be included in all copies or substantial portions of the software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE
 *
 * @flow
 */
'use strict';


/**
 * The components needed from React
 */
import React, {Component} from 'react'
import {
    Text,
    TouchableOpacity,
    View,
    Image,
    StyleSheet,
    Platform,
    Dimensions
} from 'react-native'


const F8DrawerLayout = require('F8DrawerLayout')

const RLEventParallaxHeader = require('./layout/RLEventParallaxHeader')
const PeopleInEventListView = require('./layout/PeopleInEventListView')

/**
 * The states were interested in
 */
const {
    PARSE_RESTAURANTS,
} = require('../../lib/constants').default


class IEADetailedEvent extends React.Component {

    static navigationOptions = ({navigation}) => ({
        header: null,
    });

    render() {
        const {event, forRestaurant} = this.props.navigation.state.params;

        const content = (
            <PeopleInEventListView
                {...this.props.navigation.state.params}
                {...this.props}
                forObject={forRestaurant}
                customStickyTitle={event.displayName}
                objectSchemaName={PARSE_RESTAURANTS}
                renderParallaxHeader={(e) => {
                    return (<RLEventParallaxHeader
                        {...this.props.navigation.state.params}
                        {...this.props}/>)
                }}
            />
        );

        return content;
    }

}

module.exports = IEADetailedEvent;
