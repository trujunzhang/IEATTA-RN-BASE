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

const F8Header = require('F8Header')

const ReviewCell = require('./layout/ReviewCell')

import {Container, Content} from 'native-base'

/**
 * The states were interested in
 */
const {
    MENU_DETAILED_REVIEW_PAGE,
    // Review Item Type.
    REVIEW_ITEM_DETAILED_PAGE,
    REVIEW_ITEM_READ_LIST_PAGE,
    REVIEW_ITEM_PREVIEW_PAGE,
} = require('../../lib/constants').default

class IEADetailedReview extends Component {

    static navigationOptions = ({navigation}) => ({
        header: null,
    });

    render() {
        const {review} = this.props.navigation.state.params;
        return (
            <Container>
                <F8Header title={'Review'} {...this.props}/>
                <Content>
                    <ReviewCell{...this.props} review={review} reviewItemType={REVIEW_ITEM_PREVIEW_PAGE}/>
                </Content>
            </Container>
        )
    }
}

const {connect} = require('react-redux')
module.exports = connect()(IEADetailedReview)


