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
    TouchableHighlight,
    View,
    Image,
    StyleSheet,
    Dimensions
} from 'react-native'

import Reviews from '../../../lib/reviews'
import Users from '../../../lib/users'

import AppConstants from '../../../lib/appConstants'

const {getSvgButtonItem} = require('../../../lib/utils')

const F8PlaceHolderImage = require('F8PlaceHolderImage')
const F8SVGButton = require('F8SVGButton')

const ReviewVotingSection = require('./ReviewVotingSection')

const {onCellItemPress} = require('../../filter/navigatorApp')
const {getLocalImagePath} = require('../../../parse/fsApi')


/**
 * The states were interested in
 */
const {
    HEADER_SVG_BUTTON_EDIT,
    MENU_ITEM_ADD_OR_EDIT_REVIEW,
    MODEL_FORM_TYPE_EDIT,
} = require('../../../lib/constants').default

const styles = StyleSheet.create({
    reviewTopUserContainer: {
        paddingVertical: 10,
        marginBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#e6e6e6",
        flexDirection: 'row',
        height: 60,
    },
    reviewUserImage: {
        marginTop: 4,
        marginRight: 10,
        width: 36,
        height: 36,
        borderRadius: 4
    },
    reviewUserRightSection: {
        flex: 1,
        flexDirection: 'column',
    },
    reviewUserRightTitle: {
        marginBottom: 4,
        fontWeight: "700",
        fontSize: 16,
        color: "#333"
    },
    reviewUserRightDate: {
        height: 17,
        fontSize: 14,
        color: "#333"
    }
});

class ReviewTopUser extends Component {
    onEditIconPress() {
        const {review} = this.props;
        const _model = AppConstants.generateEditReviewObject(review);

        onCellItemPress(this.props,
            MENU_ITEM_ADD_OR_EDIT_REVIEW,
            {
                model: _model,
                modelType: MODEL_FORM_TYPE_EDIT,
                onBackHook: () => {
                }
            }
        )
    }

    renderRightEditButton() {

        const buttonItem = {
            ...getSvgButtonItem(HEADER_SVG_BUTTON_EDIT),
            style: {marginTop: 10}
        }

        return (
            <View style={styles.container}>
                <F8SVGButton
                    buttonDirection="row"
                    item={buttonItem}
                    onPress={this.onEditIconPress.bind(this)}
                />
            </View>
        )
    }

    render() {
        const {review} = this.props;
        const user = review.user || Users.anonymousUser;
        const localImagePath = getLocalImagePath(user.listPhotoId);

        const canEditReview = Reviews.checkCanEditReview(this.props)

        return (
            <View style={styles.reviewTopUserContainer}>
                <F8PlaceHolderImage
                    style={styles.reviewUserImage}
                    source={{uri: `file://${localImagePath}`}}
                    placeholderSource={require('../../img/user_60_square.png')}/>
                <View style={styles.reviewUserRightSection}>
                    <Text style={styles.reviewUserRightTitle}>{user.displayName}</Text>
                    <Text style={styles.reviewUserRightDate}>
                        {Reviews.toDateString(review.updatedAt)}
                    </Text>
                </View>

                {canEditReview ? this.renderRightEditButton() : null}

            </View>
        )
    }
}


const {connect} = require('react-redux')

function select(store) {
    return {
        currentUser: store.user
    }
}

module.exports = connect(select)(ReviewTopUser)

