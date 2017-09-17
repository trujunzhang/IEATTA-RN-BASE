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
const F8EmptySection = require('F8EmptySection')
const PureListView = require('PureListView')
const SectionHeader = require('SectionHeader')

const PeopleInEventCell = require('./PeopleInEventCell')
const ReviewCell = require('../../review/layout/ReviewCell')

const StaticContainer = require('F8StaticContainer')
const RLEventListViewHeaderView = require('./RLEventListViewHeaderView')

const {queryPeopleForEvent, queryReviews} = require('../../../actions')
const {filterUserInEvent, filterReviews} = require('../../filter/filterAppModel')

/**
 * The states were interested in
 */
const {
    MENU_SECTIONS_PEOPLE_IN_EVENTS,
    MENU_SECTIONS_REVIEWS,
    PARSE_EVENTS,
} = require('../../../lib/constants').default


class PeopleInEventListView extends React.Component {

    constructor(props: Props) {
        super(props);


        this.state = {
            sections: {
                MENU_SECTIONS_PEOPLE_IN_EVENTS: [],
                MENU_SECTIONS_REVIEWS: []
            },
            ready: false
        }
    }

    componentWillReceiveProps(nextProps: Props) {
        const {event, forRestaurant} = nextProps;
        const {sections} = this.state;
        const {MENU_SECTIONS_PEOPLE_IN_EVENTS, MENU_SECTIONS_REVIEWS} = sections;

        const nextSections = Object.assign({}, sections, {
            MENU_SECTIONS_PEOPLE_IN_EVENTS: filterUserInEvent(nextProps, forRestaurant.objectId, event.objectId, MENU_SECTIONS_PEOPLE_IN_EVENTS),
            MENU_SECTIONS_REVIEWS: filterReviews(nextProps, PARSE_EVENTS, event.objectId, MENU_SECTIONS_REVIEWS)
        })

        this.setState({sections: nextSections})
    }

    componentDidMount() {
        const {event, forRestaurant} = this.props;
        this.props.dispatch(queryPeopleForEvent(forRestaurant.objectId, event.objectId))
        this.props.dispatch(queryReviews({objectSchemaName: PARSE_EVENTS, forObjectUniqueId: event.uniqueId}))
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
        if (sectionID === MENU_SECTIONS_PEOPLE_IN_EVENTS) {
            return (<PeopleInEventCell {...this.props} user={item}/>)
        }
        return (<ReviewCell{...this.props} review={item}/>)
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

