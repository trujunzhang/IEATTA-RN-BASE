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

const {width, height} = Dimensions.get('window')

const F8SVGButton = require('F8SVGButton')
const F8PlaceHolderImage = require('F8PlaceHolderImage')
const F8StarIcon = require('F8StarIcon')

const styles = StyleSheet.create({
    reviewVotingContainer: {
        flexDirection: 'column',
        marginTop: 12,
        marginBottom: 8,
        borderTopWidth: 1,
        borderTopColor: "#e6e6e6"
    },
    messageText: {
        height: 20,
        paddingTop: 8
    },
    reviewVotingButtonSection: {
        width: width - 20,
        height: 30,
        marginTop: 6,
        flexDirection: 'row',
        alignItems: 'center'
    },
    reviewVotingSvgButtonTextStyle: {
        marginLeft: 6,
        fontSize: 14,
    }
});

/**
 * class="flex-container ufc-feedback ufc-buttons"
 *
 */
class ReviewVotingSection extends Component {
    constructor(props) {
        super(props)
        this.state = {
            message: "",
            // message: "Thanks for your vote!"
        }
    }

    render() {
        return (
            <View style={styles.reviewVotingContainer}>
                {this.renderMessage()}
                {this.renderButtons()}
            </View>
        )
    }

    renderMessage() {
        const {message} = this.state;
        if (message === "") return;
        return (
            <View style={styles.messageText}>
                <Text style={{color: '#41a700'}}>{message}</Text>
            </View>
        )
    }

    renderButtons() {
        const {review} = this.props;
        return (
            <View style={styles.reviewVotingButtonSection}>
                <F8SVGButton
                    buttonDirection="row"
                    textStyle={styles.reviewVotingSvgButtonTextStyle}
                    svgSize={18}
                    rowNum={3} item={{
                    // style: {backgroundColor: "#f00"},
                    title: 'Useful',
                    subTitleText: (review.useful > 0 ? review.useful : null),
                    icon: "M9 17c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM9 2C5.14 2 2 5.14 2 9s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm2 8.392V12H7v-1.608a3.982 3.982 0 0 1-2-3.445 4 4 0 0 1 8 0c0 1.477-.81 2.752-2 3.445zM8 5.25a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5zm1.003 9.747h-.006A1.997 1.997 0 0 1 7 13h4a1.997 1.997 0 0 1-1.997 1.997z"
                }}
                    onPress={(e) => {
                        // debugger
                    }}
                />

                <F8SVGButton
                    buttonDirection="row"
                    textStyle={styles.reviewVotingSvgButtonTextStyle}
                    svgSize={18}
                    rowNum={3} item={{
                    // style: {backgroundColor: "#0f0"},
                    title: 'Funny',
                    subTitleText: (review.funny > 0 ? review.funny : null),
                    icon: "M9 17c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM9 2C5.14 2 2 5.14 2 9s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm0 12a4.87 4.87 0 0 1-4.787-4h9.574A4.87 4.87 0 0 1 9 14zm2.5-5.625a1.376 1.376 0 1 1 0-2.75 1.376 1.376 0 0 1 0 2.75zm-5 0a1.376 1.376 0 1 1 0-2.75 1.376 1.376 0 0 1 0 2.75z"
                }}
                    onPress={(e) => {
                        // debugger
                    }}
                />

                <F8SVGButton
                    buttonDirection="row"
                    textStyle={styles.reviewVotingSvgButtonTextStyle}
                    svgSize={18}
                    rowNum={3} item={{
                    // style: {backgroundColor: "#00f"},
                    title: 'Cool',
                    subTitleText: (review.cool > 0 ? review.cool : null),
                    icon: "M9 17c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM9 2C5.14 2 2 5.14 2 9s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm6.026 5.335C14.766 8.797 13.5 10 11.986 10h-.003c-1.218 0-2.282-.764-2.767-1.813-.088-.19-.344-.242-.432-.052C8.3 9.185 7.234 10 6.016 10h-.003C4.5 10 3.195 8.83 2.973 7.35l-.093-.84c-.053-.242.192-.51.477-.51h11.286c.294 0 .508.332.477.56l-.094.775zm-2.068 4.154A4.28 4.28 0 0 1 9 14.144a4.28 4.28 0 0 1-3.958-2.657A6.81 6.81 0 0 0 9 12.753a6.81 6.81 0 0 0 3.958-1.265z"
                }}
                    onPress={(e) => {
                        // debugger
                    }}
                />
            </View>
        )
    }

}

module.exports = ReviewVotingSection;

