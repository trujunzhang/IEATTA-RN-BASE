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
    Dimensions,
    Platform,
    ActivityIndicator
} from 'react-native'

const F8EmptySection = require('F8EmptySection')
const SectionHeader = require('SectionHeader')

const {
    MENU_SECTIONS_MORE,
    MENU_SECTIONS_NEAR_RESTAURANTS,
    MENU_DETAILED_RESTAURANT_PAGE,
    MENU_ITEM_ADD_OR_EDIT_RESTAURANT,
    MENU_SECTIONS_NEAR_RESTAURANTS_EMPTY,
    MODEL_FORM_TYPE_NEW,
} = require('../../lib/constants').default

const RestaurantCell = require('./layout/RestaurantCell')
const RestaurantMoreCell = require('./layout/RestaurantMoreCell')

import Restaurants from '../../lib/restaurants'

const {queryNearRestaurant} = require('../../actions')

import commonStyles from '../../common/commonStyle'

const {goBackPage, onCellItemPress} = require('../filter/navigatorApp')
import {Container, Header, Content, List, ListItem, Body} from 'native-base'

class IEANearRestaurantScene extends Component {

    constructor(props) {
        super(props);

        this.state = {
            sections: {
                MENU_SECTIONS_MORE: Restaurants.TOP_MENUS,
                MENU_SECTIONS_NEAR_RESTAURANTS: []
            },
            ready: false
        }
    }

    componentWillReceiveProps(nextProps: Props) {
        const {sections} = this.state;
        const nextSections = Object.assign({}, sections, {
            MENU_SECTIONS_NEAR_RESTAURANTS: nextProps.appModel.restaurants
        })

        const error = nextProps.location.error;

        console.log('location error', error)

        this.setState({
            sections: nextSections,
            ready: true,
            error
        })
    }

    componentDidMount() {
        const position = this.props.location.position;
        if (!!position) {
            this.props.dispatch(queryNearRestaurant({position}))
            // this.props.dispatch(queryNearRestaurant({}))
        }
    }

    renderRow = (item: Object,
                 sectionID: number | string) => {
        if (sectionID === MENU_SECTIONS_MORE) {
            return (<RestaurantMoreCell key={item.tag} item={item}/>)
        }
        return (<RestaurantCell key={item.objectId} restaurant={item}/>)
    }

    renderSectionHeader(sectionId) {
        return (
            <SectionHeader key={sectionId} sectionType={sectionId}/>
        )
    }


    render() {
        const {renderSectionHeader, renderRow} = this;
        const listRows = this.renderRowsArray(renderSectionHeader, renderRow);
        return (
            <Content>
                <List>
                    {listRows}
                </List>
            </Content>
        )
    }

    renderRowsArray(renderSectionHeader, renderRow) {
        const self = this;
        const {props, onPress} = this;
        const {sections} = this.state;
        const sectionKeys = Object.keys(sections);

        let listRows = [];
        sectionKeys.forEach(function (key) {
            const sectionData = sections[key];
            listRows.push(
                <ListItem itemDivider key={key}>
                    {renderSectionHeader(key)}
                </ListItem>
            )

            if (sectionData.length === 0) {
                listRows.push(
                    <ListItem itemDivider key={"empty-section"}>
                        {self.renderFooter()}
                    </ListItem>
                )
            }

            sectionData.forEach(function (row, index) {
                listRows.push(
                    <ListItem key={row.objectId} onPress={() => onPress(key, props, row)}>
                        {renderRow(row, key)}
                    </ListItem>
                )
            })
        })

        return listRows;
    }


    onPress(sectionId, props, item) {
        switch (sectionId) {
            case MENU_SECTIONS_MORE:
                const {tag, icon, model} = item;

                let morePassProps = {};
                switch (tag) {
                    case MENU_ITEM_ADD_OR_EDIT_RESTAURANT: {
                        morePassProps = {
                            modelType: MODEL_FORM_TYPE_NEW
                        }
                    }
                }

                onCellItemPress(props, tag, {model, ...morePassProps})
                break;
            case MENU_SECTIONS_NEAR_RESTAURANTS:
                onCellItemPress(props,
                    MENU_DETAILED_RESTAURANT_PAGE,
                    {restaurant: item}
                )
                break;
        }

    }


    renderFooter() {
        const {sections, ready} = this.state,
            {MENU_SECTIONS_NEAR_RESTAURANTS} = sections,
            restaurantLength = MENU_SECTIONS_NEAR_RESTAURANTS.length;

        if (restaurantLength === 0) {
            if (!ready) {
                return (
                    <View style={[commonStyles.rowDirection,
                        {
                            flex: 1,
                            height: 180,
                            backgroundColor: 'white',
                            justifyContent: 'center',
                        }
                    ]}>
                        <ActivityIndicator animating={this.state.animating} size="large"/>
                    </View>
                )
            }

            return (<F8EmptySection sectionTag={MENU_SECTIONS_NEAR_RESTAURANTS_EMPTY}/>)
        }

        return (<View style={{height: 60}}/>)
    }

}

const {connect} = require('react-redux')

function select(store) {
    return {
        appModel: store.appModel,
        currentUser: store.user,
        location: store.location,
    }
}

module.exports = connect(select)(IEANearRestaurantScene)

