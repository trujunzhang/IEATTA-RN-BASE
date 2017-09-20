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

const F8Colors = require('F8Colors')
const PureListView = require('PureListView')

const EventCell = require('./EventCell')
const ReviewCell = require('../../review/layout/ReviewCell')

const StaticContainer = require('F8StaticContainer')

const RLRestaurantParallaxHeader = require('./RLRestaurantParallaxHeader')
const RLRestaurantListViewHeaderView = require('./RLRestaurantListViewHeaderView')

const {queryEventsForRestaurant, queryReviews} = require('../../../actions')

const {filterEvents, filterReviews} = require('../../filter/filterAppModel')

/**
 * The states were interested in
 */
const {
    MENU_SECTIONS_EVENTS,
    MENU_SECTIONS_REVIEWS,
    PARSE_RESTAURANTS
} = require('../../../lib/constants').default

const {
    RestaurantService, EventService, PeopleInEventService,
    RecipeService,
    PhotoService,
    UserService,
    ReviewService
} = require('../../../parse/realmApi').default

class DetailedRestaurantListView extends React.Component {

    constructor(props: Props) {
        super(props);

        const {uniqueId} = props.forRestaurant;
        const newEvents = EventService.findEventsForRestaurant(uniqueId);
        const newReviews = ReviewService.findByTerm(
            {objectSchemaName: PARSE_RESTAURANTS, forObjectUniqueId: uniqueId}
        )
        this.state = {
            sections: {
                MENU_SECTIONS_EVENTS: newEvents,
                MENU_SECTIONS_REVIEWS: newReviews
            }
        }
    }

    render() {
        const {forRestaurant} = this.props;
        return (
            <PureListView
                forObject={forRestaurant}
                objectSchemaName={PARSE_RESTAURANTS}
                renderParallaxHeader={() => {
                    return (<RLRestaurantParallaxHeader {...this.props}/>)
                }}
                data={this.state.sections}
                renderTopHeader={this.renderTopHeaderView.bind(this)}
                renderRow={this.renderRow.bind(this)}
                {...this.props}
            />
        )
    }

    renderRow(item: any, sectionID: number | string) {
        console.log("render detailed restaurant row:", sectionID)
        if (sectionID === MENU_SECTIONS_EVENTS) {
            return (<EventCell{...this.props} event={item}/>)
        }
        return (<ReviewCell{...this.props} review={item}/>)
    }

    renderTopHeaderView() {
        return (
            <StaticContainer>
                <View style={{flex: 1, marginTop: F8Colors.topViewHeight}}>
                    <RLRestaurantListViewHeaderView {...this.props}/>
                </View>
            </StaticContainer>
        )
    }

}


const {connect} = require('react-redux')

function select(store) {
    return {
        appModel: store.appModel
    };
}

module.exports = connect(select)(DetailedRestaurantListView)

