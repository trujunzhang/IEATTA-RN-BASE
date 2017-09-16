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
 * @providesModule EventCell
 * @flow
 */

'use strict';


/**
 * The components needed from React
 */
import React, {Component} from 'react'
import {
    TouchableHighlight,
    TouchableOpacity,
    View,
    Image,
    StyleSheet,
    Platform,
    Dimensions
} from 'react-native'

const CaptionTextView = require('CaptionTextView')
const F8Colors = require('F8Colors')
const {Text} = require('F8Text')

const {onCellItemPress} = require('../../filter/navigatorApp')
import Events from '../../../lib/events'

import Svg, {
    G,
    Path,
} from 'react-native-svg'

/**
 * The states were interested in
 */
const {
    MENU_DETAILED_EVENT_PAGE,
} = require('../../../lib/constants').default

class EventCell extends React.Component {

    onPress() {
        onCellItemPress(this.props,
            MENU_DETAILED_EVENT_PAGE,
            {
                event: this.props.event,
                forRestaurant: this.props.forRestaurant
            }
        )
    }

    render() {
        const {event} = this.props;
        const info = Events.getDateInfo(event);
        return (
            <TouchableHighlight underlayColor={F8Colors.cellUnderlayColor} onPress={this.onPress.bind(this)}>
                <View style={[{
                    backgroundColor: 'white',
                    // backgroundColor: 'red'
                }, {
                    flexDirection: 'column',
                }, {
                    paddingHorizontal: 8,
                    paddingVertical: 6
                }]}>
                    <Text numberOfLines={2} style={[styles.titleText, {
                        color: '#0073bb',
                        fontWeight: 'bold',
                        fontSize: 18
                    }, {
                        marginBottom: 8
                    }]}>
                        {event.displayName}
                    </Text>
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <Svg width="24" height="24">
                            <Path fill="#666"
                                  d="M18 21H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3 1 1 0 0 1 2 0h8a1 1 0 0 1 2 0 3 3 0 0 1 3 3v12a3 3 0 0 1-3 3zm1-13H5v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1V8zm-6 5h4v4h-4v-4z"/>
                        </Svg>
                        {/*Saturday, 1 Jul, 12:00 am – Monday, 31 Jul, 12:00 am*/}
                        <Text
                            numberOfLines={1}
                            style={[styles.locationText, {color: '#666'}]}>
                            {`${info.startFormat} - ${info.endFormat}`}
                        </Text>
                    </View>
                </View>
            </TouchableHighlight>
        )
    }
}


const styles = StyleSheet.create({
    cell: {},
    titleSection: {
        paddingRight: 9,
        flexDirection: 'row',
        alignItems: 'center',
    },
    titleAndDuration: {
        justifyContent: 'center',
    },
    titleText: {
        flex: 1,
        fontSize: 17,
        lineHeight: 24,
        color: F8Colors.darkText,
        marginBottom: 4,
        marginRight: 10,
    },
    duration: {
        fontSize: 12,
        color: F8Colors.lightText,
    },
    locationText: {
        fontSize: 10,
    },
    added: {
        position: 'absolute',
        backgroundColor: 'transparent',
        right: 0,
        top: 0,
    },
});


module.exports = EventCell;
