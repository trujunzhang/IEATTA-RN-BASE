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
 * @providesModule PeopleInEventCell
 * @flow
 */

'use strict';


/**
 * The components needed from React
 */
import React, {Component} from 'react'
import {
    TouchableHighlight,
    View,
    Image,
    StyleSheet,
    Dimensions
} from 'react-native'


import Icon from 'react-native-vector-icons/FontAwesome';

const CellRowHeight = 60
const avatorW = 36;

const F8PlaceHolderImage = require('F8PlaceHolderImage')
const {Text} = require('F8Text');

const {onCellItemPress} = require('../../filter/navigatorApp')
const {getLocalImagePath} = require('../../../parse/fsApi')

const {
    MENU_DETAILED_ORDERED_USER_PAGE,
} = require('../../../lib/constants').default


const styles = StyleSheet.create({
    eventContainer: {
        flex: 1,
        paddingHorizontal: 10,
        height: CellRowHeight,
    },
    eventSection: {
        flex: 1,
        padding: 10,
        flexDirection: 'row',
    },
    eventLeftSection: {
        marginRight: 10,
        marginTop: 4,
        width: avatorW,
        height: avatorW,
    },
    eventRightSection: {
        flex: 1,
        flexDirection: 'column',
    },
    eventDisplayText: {
        fontWeight: "700",
        fontSize: 16,
        color: "#333",
        marginTop: 10,
    },
    cellRightArrow: {
        position: 'absolute',
        right: 10,
        top: (CellRowHeight - 24) / 2
    }
});

class PeopleInEventCell extends React.Component {

    renderLeft() {
        const {user} = this.props;
        const localImagePath = getLocalImagePath(user.listPhotoId)
        return (
            <View style={styles.eventLeftSection}>
                <F8PlaceHolderImage style={{flex: 1, borderRadius: avatorW / 2}}
                                    source={{uri: `file://${localImagePath}`}}
                                    placeholderSource={require('../../img/blank_user_small.png')}/>
            </View>
        )
    }

    renderRight() {
        const {user} = this.props;
        return (
            <View style={styles.eventRightSection}>
                <Text style={styles.eventDisplayText}>{user.displayName}</Text>
            </View>
        )
    }

    render() {
        const {user} = this.props;
        return (
            <View
                key={user.objectId}
                style={styles.eventContainer}>
                <View style={styles.eventSection}>
                    {this.renderLeft()}
                    {this.renderRight()}
                </View>
                <View style={styles.cellRightArrow}>
                    <Icon name="angle-right" size={24} color="#C8C7CC"/>
                </View>
            </View>
        )
    }

    onPress() {
        onCellItemPress(this.props,
            MENU_DETAILED_ORDERED_USER_PAGE,
            {
                orderedUser: this.props.user,
                forRestaurant: this.props.forRestaurant,
                forEvent: this.props.event
            }
        )
    }


}


module.exports = PeopleInEventCell;
