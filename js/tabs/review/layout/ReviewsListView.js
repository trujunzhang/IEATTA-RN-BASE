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

const PureListView = require('PureListView')
const ReviewCell = require('./ReviewCell')

import {Container, Header, Content, List, ListItem, Body, Row} from 'native-base'

const {filterReviews} = require('../../filter/filterAppModel')

const {onCellItemPress} = require('../../filter/navigatorApp')

/**
 * The states were interested in
 */
const {
    MENU_SECTIONS_REVIEWS,
    MENU_DETAILED_REVIEW_PAGE,
    REVIEW_ITEM_READ_LIST_PAGE,
} = require('../../../lib/constants').default


class ReviewsListView extends React.Component {

    constructor(props: Props) {
        super(props);

        this.state = {
            sections: {
                MENU_SECTIONS_REVIEWS: []
            },
            ready: false
        }
    }

    componentWillReceiveProps(nextProps: Props) {
        const {objectSchemaName} = nextProps;
        this.setState({
            sections: {
                MENU_SECTIONS_REVIEWS: filterReviews(nextProps, objectSchemaName, null, [])
            },
        })
    }

    render() {
        const {props, onPress} = this;
        const {sections} = this.state;
        const reviews = sections.MENU_SECTIONS_REVIEWS;
        return (
            <Content style={{flex: 1}}>
                <List>
                    {
                        reviews.map(function (item) {
                            return (
                                <ListItem onPress={() => onPress(props, item)}
                                          key={item.objectId}
                                          style={{flex: 1}}>

                                    <ReviewCell{...props}
                                               reviewItemType={REVIEW_ITEM_READ_LIST_PAGE}
                                               review={item}/>
                                </ListItem>
                            )
                        })
                    }
                </List>
            </Content>
        )
    }

    onPress(props, review) {
        onCellItemPress(props, MENU_DETAILED_REVIEW_PAGE, {review})
    }

    renderRow(item: any, sectionID: number | string) {
        return (<ReviewCell{...this.props} review={item}/>)
    }

}


const {connect} = require('react-redux')

function select(store) {
    return {
        appModel: store.appModel
    };
}

module.exports = connect(select)(ReviewsListView)

