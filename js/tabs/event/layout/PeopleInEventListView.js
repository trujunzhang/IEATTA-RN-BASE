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

const PeopleInEventCell = require('./PeopleInEventCell')
const ReviewCell = require('../../review/layout/ReviewCell')

const StaticContainer = require('F8StaticContainer')
const RLEventListViewHeaderView = require('./RLEventListViewHeaderView')

const {queryPeopleForEvent, queryReviews} = require('../../../actions')
const {filterUserInEvent, filterReviews} = require('../../filter/filterAppModel')
const {onCellItemPress} = require('../../filter/navigatorApp')

/**
 * The states were interested in
 */
const {
    MENU_SECTIONS_PEOPLE_IN_EVENTS,
    MENU_SECTIONS_REVIEWS,
    PARSE_EVENTS,
    MENU_DETAILED_ORDERED_USER_PAGE,
} = require('../../../lib/constants').default

import {Content, List, ListItem, Body} from 'native-base'
import commonStyles from '../../../common/commonStyle'


const _ = require('underscore')
const {
    RestaurantService, EventService, PeopleInEventService,
    RecipeService,
    PhotoService,
    UserService,
    ReviewService
} = require('../../../parse/realmApi').default

class PeopleInEventListView extends React.Component {

    constructor(props: Props) {
        super(props);

        const {event, forRestaurant} = this.props;
        const peopleInEvent = PeopleInEventService.findTerm(forRestaurant.uniqueId, event.uniqueId);
        const ids = _.pluck(peopleInEvent, 'userId')
        const orderedUsers = UserService.getUsersContainedIn(ids)

        const newReviews = ReviewService.findByTerm(
            {objectSchemaName: PARSE_EVENTS, forObjectUniqueId: event.uniqueId}
        )
        this.state = {
            sections: {
                MENU_SECTIONS_PEOPLE_IN_EVENTS: orderedUsers,
                MENU_SECTIONS_REVIEWS: newReviews
            },
            ready: false
        }
    }

    render() {
        return (
            <PureListView
                {...this.props}
                data={this.state.sections}
                renderTopHeader={this.renderTopHeaderView.bind(this)}
                renderRow={this.renderRow.bind(this)}
            />
        )
    }


    renderRow(item: any, sectionID: number | string) {
        const self = this;
        const {props, onPress} = this;

        if (sectionID === MENU_SECTIONS_PEOPLE_IN_EVENTS) {
            return (
                <ListItem itemDivider onPress={() => onPress(props, item)}>
                    <Body style={{
                        backgroundColor: 'white',
                        borderBottomWidth: 1,
                        borderBottomColor: "#eeeeee",
                    }}>
                    <PeopleInEventCell {...this.props} user={item}/>
                    </Body>
                </ListItem>
            )
        }
        return (<ReviewCell{...this.props} review={item}/>)
    }

    onPress(props, user) {
        const {forRestaurant, event} = props;
        onCellItemPress(props,
            MENU_DETAILED_ORDERED_USER_PAGE,
            {
                orderedUser: user,
                forRestaurant: forRestaurant,
                forEvent: event
            }
        )

    }


    renderTopHeaderView() {
        return (
            <StaticContainer>
                <View style={{flex: 1, marginTop: F8Colors.topViewHeight}}>
                    <RLEventListViewHeaderView {...this.props}/>
                </View>
            </StaticContainer>
        );
    }


}


const {connect} = require('react-redux')

function select(store) {
    return {
        appModel: store.appModel
    };
}

module.exports = connect(select)(PeopleInEventListView)

