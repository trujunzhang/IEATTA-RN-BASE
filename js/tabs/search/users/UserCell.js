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
    TouchableHighlight,
    View,
    Image,
    StyleSheet,
    Dimensions
} from 'react-native'


import Users from '../../../lib/users'

const F8Colors = require('F8Colors')
const F8PlaceHolderImage = require('F8PlaceHolderImage')

const {getLocalImagePath} = require('../../../parse/fsApi')

/**
 * The states were interested in
 */
const {
    MENU_ITEM_ADD_OR_EDIT_USER,
    MODEL_FORM_TYPE_EDIT,
} = require('../../../lib/constants').default

const styles = StyleSheet.create({
    userCellContainer: {
        flex: 1,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    userCellSection: { // .action-list .action
        flex: 1,
        marginHorizontal: -10,
        padding: 10,
        flexDirection: 'row',
    },
    userCellLeftSection: {
        marginRight: 10,
        width: 60,
        height: 60
    },
    userCellLeftPlaceHolderImage: {
        flex: 1,
        borderRadius: 4,
        width: 60,
        height: 60
    },
    userCellRightSection: {
        flex: 1,
        marginTop: 8,
        flexDirection: 'column',
        // backgroundColor:'red',
    },
    userCellDisplayNameText: {
        height: 20,
        fontWeight: "700",
        fontSize: 16,
        color: "#333"
    },
    dateRow: {
        marginTop: 8,
        height: 20,
        fontSize: 14,
        color: "#ccc"
    },
    userCellEmailText: {
        height: 17,
        fontSize: 14,
        color: "#333"
    }
});


class UserCell extends Component {

    renderLeft() {
        const {user} = this.props;
        const localImagePath = getLocalImagePath(user.listPhotoId || '')

        return (
            <View style={styles.userCellLeftSection}>
                <F8PlaceHolderImage
                    style={styles.userCellLeftPlaceHolderImage}
                    source={{uri: `file://${localImagePath}`}}
                    placeholderSource={require('../../img/user_60_square.png')}/>
            </View>
        )
    }

    renderRight() {
        const {user} = this.props;
        return (
            <View style={styles.userCellRightSection}>
                <Text style={styles.userCellDisplayNameText}>{user.displayName}</Text>
                <Text style={styles.dateRow}>{Users.toDateString(user.updatedAt)}</Text>
            </View>
        )
    }

    render() {
        return (
            <View key={this.props.user.objectId} style={styles.userCellContainer}>
                {this.renderLeft()}
                {this.renderRight()}
            </View>
        )
    }

}

module.exports = UserCell;
