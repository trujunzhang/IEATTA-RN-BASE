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
import React, {Component, PropTypes} from 'react';
import {
    Text,
    TouchableHighlight,
    View,
    Image,
    StyleSheet,
    Dimensions
} from 'react-native'

const F8Colors = require('F8Colors')
const F8PlaceHolderImage = require('F8PlaceHolderImage')
const F8StarIcon = require('F8StarIcon')

const ReviewTopUser = require('./ReviewTopUser')
const ReviewVotingSection = require('./ReviewVotingSection')

const {onCellItemPress} = require('../../filter/navigatorApp')

/**
 * The states were interested in
 */
const {
    MENU_DETAILED_REVIEW_PAGE
} = require('../../../lib/constants').default

const styles = StyleSheet.create({
    reviewContainer: {
        backgroundColor: F8Colors.controllerViewColor,
        paddingBottom: 10
    },
    reviewContent: {
        backgroundColor: "#fff",
        paddingHorizontal: 10,
        paddingBottom: 12,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "#ccc",
        flexDirection: 'column',
    },
    bodyText: {
        marginTop: 6,
        fontSize: 16,
        color: "#333"
    }
});

class ReviewCell extends Component {

    renderCell() {
        const {review, isPreview} = this.props;
        const textProps = isPreview ? {} : {numberOfLines: 3};
        return (
            <View key={review.objectId} style={styles.reviewContent}>

                <ReviewTopUser {...this.props}/>

                <F8StarIcon rate={review.rate}/>
                <Text {...textProps} style={styles.bodyText}>
                    {review.body}
                </Text>

                {/*<ReviewVotingSection {...this.props}/>*/}

            </View>
        )
    }

    onPress() {
        const {review} = this.props;
        onCellItemPress(this.props, MENU_DETAILED_REVIEW_PAGE, {review})
    }

    render() {
        if (this.props.isPreview) {
            return this.renderCell();
        }

        return (
            <View style={styles.reviewContainer}>
                <TouchableHighlight onPress={this.onPress.bind(this)}>
                    {this.renderCell()}
                </TouchableHighlight>
            </View>
        )
    }

}


module.exports = ReviewCell;
