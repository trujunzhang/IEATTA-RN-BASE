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
 * @providesModule F8RatingReview
 * @flow
 */


'use strict';

/**
 * The components needed from React
 */
import React, {Component} from 'react'
import {
    TouchableOpacity,
    TouchableHighlight,
    View,
    Image,
    StyleSheet,
    Text,
    Platform,
    Dimensions
} from 'react-native'

const {width, height} = Dimensions.get('window')

const F8StarIcon = require('F8StarIcon')
const F8SVGButton = require('F8SVGButton')

import LinearGradient from 'react-native-linear-gradient'

const {getSvgButtonItem} = require('../lib/utils')

import AppConstants from '../lib/appConstants'

/**
 * The states were interested in
 */
const {
    MENU_ITEM_ADD_OR_EDIT_REVIEW,
    MODEL_FORM_TYPE_NEW,
} = require('../lib/constants').default


import commonStyles from './commonStyle'

/**
 * className="action-bar clearfix three-up"
 *
 * .action-bar {
     *   display: table;
     *   width: 100%;
     *   padding: 10px 0;
     *   border: 1px solid #ccc;
     *   border-width: 1px 0;
     *   background-color: #fafaf8;
     *   background: -webkit-linear-gradient(#fff, #fafaf8);
     *   background: linear-gradient(#fff, #fafaf8);
     *   font-size: 16px;
     *   line-height: 1.3125em;
     * }
 *
 * @returns {XML}
 */
const styles = StyleSheet.create({
    ratingReviewContainer: {
        flex: 1,
        backgroundColor: 'white'
    },
    buttonActionContainer: {
        flex: 1,
        height: 64,
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    topReviewInfoContainer: {
        flex: 1,
        height: 90,
        paddingTop: 20,
        paddingBottom: 18,
        // justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'blue'
    },
    topReviewLabel: {
        height: 32,
        marginTop: 8,
        fontSize: 14,
        color: "#999"
    },

    // Top Star Buttons
    topStarButtonBase: {
        width: 24,
        height: 24,
        backgroundColor: 'transparent',
        position: 'absolute',
        top: 0,
    }
});

const {onCellItemPress} = require('../tabs/filter/navigatorApp')
const {delayEvent} = require('../lib/utils')

class F8RatingReview extends Component {

    constructor(props) {
        super(props);

        this.state = {
            rate: props.rate || 0,
            showTopRatingPanel: props.showTopRatingPanel
        }
    }

    onRatingPress() {
        this._navigatorToNewReview()
    }

    _navigatorToNewReview(reviewRating = 0) {
        onCellItemPress(this.props,
            MENU_ITEM_ADD_OR_EDIT_REVIEW,
            {
                model: AppConstants.generateNewReviewObject(this.props, reviewRating),
                modelType: MODEL_FORM_TYPE_NEW,
                onBackHook: () => {
                }
            }
        )
    }


    render() {
        const {showTopRatingPanel} = this.state;
        return (
            <View style={[styles.ratingReviewContainer, commonStyles.columnDirection]}>
                {
                    showTopRatingPanel &&
                    (
                        <View style={[{flex: 1, flexDirection: 'row',}, commonStyles.boarderBottomDivide]}>
                            <View style={[styles.topReviewInfoContainer, commonStyles.columnDirection]}>
                                {this.renderTopRatingButtons()}

                                <TouchableOpacity
                                    style={commonStyles.columnDirection}
                                    accessibilityTraits="button"
                                    onPress={this.onRatingPress.bind(this)}>
                                    <Text style={styles.topReviewLabel}>
                                        {" Tap a star to start your review... "}
                                    </Text>
                                </TouchableOpacity>

                            </View>
                        </View>
                    )
                }
                {this.renderButtonsAction()}

            </View>
        )
    }

    renderButtonsAction() {
        const {showTopRatingPanel} = this.state;
        const {buttonsType} = this.props,
            buttonsLength = buttonsType.length;
        const buttonsView = buttonsType.map((item, index) => {
            const buttonStyle = (index !== buttonsLength - 1) ? {
                style: {borderRightWidth: 1, borderRightColor: "#ccc"}
            } : {}
            const buttonItem = {
                ...getSvgButtonItem(item),
                ...buttonStyle
            }
            return (
                <F8SVGButton
                    key={index}
                    rowNum={buttonsLength} item={buttonItem}
                    onPress={(e) => {
                        this.props.onSVGButtonPress(item)
                    }}/>
            )
        })
        return (
            <LinearGradient
                colors={['#fff', '#fafaf8']}
                style={[styles.buttonActionContainer,
                    commonStyles.boarderBottomDivide,
                    {marginTop: (!showTopRatingPanel ? 10 : 0)}]}>
                {buttonsView}
            </LinearGradient>
        )
    }


    onStarButtonPress(tag) {
        this.setState({rate: tag})

        const {navigator, forItem} = this.props;
        const self = this;

        delayEvent(function () {
            self._navigatorToNewReview(tag)
            self.setState({rate: 0})
        }, 100)
    }

    /**
     *  (132-{24*5||120}){12||(3*4)},{24,24}
     * @returns {XML}
     */
    renderTopRatingButtons() {
        const starButtons = [1, 2, 3, 4, 5].map((t, index) => {
            return (<TouchableOpacity style={[styles.topStarButtonBase, {left: (24 + 3) * index}]}
                                      key={index}
                                      onPress={() => {
                                          this.onStarButtonPress(t)
                                      }}>
                <View style={{flex: 1,}}/>
            </TouchableOpacity>)
        })

        return (
            <View style={{width: 132, height: 24}}>
                <F8StarIcon width={132} height={24} rate={this.state.rate}/>
                {starButtons}
            </View>
        )
    }

}


const {connect} = require('react-redux')

function select(store) {
    return {
        currentUser: store.user
    };
}

module.exports = connect(select)(F8RatingReview)




