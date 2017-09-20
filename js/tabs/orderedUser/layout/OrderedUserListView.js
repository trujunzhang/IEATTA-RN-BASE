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
    View,
    Image,
    StyleSheet,
    Platform,
    Dimensions
} from 'react-native'

const F8Header = require('F8Header')
const F8Colors = require('F8Colors')
const PureListView = require('PureListView')
const StaticContainer = require('F8StaticContainer')

const RLOrderedUserListViewHeaderView = require('./RLOrderedUserListViewHeaderView')

const OrderedRecipeCell = require('./OrderedRecipeCell')
const {queryRecipesForUser} = require('../../../actions')

const {onCellItemPress} = require('../../filter/navigatorApp')
const {filterOrderedRecipes} = require('../../filter/filterAppModel')

/**
 * The states were interested in
 */
const {
    MENU_SECTIONS_ORDERED_RECIPES,
    MENU_DETAILED_RECIPE_PAGE
} = require('../../../lib/constants').default

import {Container, Header, Content, List, ListItem, Body} from 'native-base'
import commonStyles from '../../../common/commonStyle'

const {
    RestaurantService, EventService, PeopleInEventService,
    RecipeService,
    PhotoService,
    UserService,
    ReviewService
} = require('../../../parse/realmApi').default

class OrderedUserListView extends React.Component {

    constructor(props: Props) {
        super(props);

        const {forEvent, forRestaurant, orderedUser} = this.props;
        const newOrderedRecipes = RecipeService.findTerm(forRestaurant.objectUniqueId, forEvent.objectUniqueId, orderedUser.objectId)
        this.state = {
            sections: {
                MENU_SECTIONS_ORDERED_RECIPES: newOrderedRecipes
            }
        }
    }

    render() {
        const {orderedUser, forRestaurant, forEvent} = this.props;
        return (
            <Container>

                <F8Header title={orderedUser.displayName} {...this.props}/>

                <Content>
                    <PureListView
                        data={this.state.sections}
                        renderRow={this.renderRow.bind(this)}
                        {...this.props}
                    />
                </Content>
            </Container>
        )
    }

    renderRow(recipe: any, sectionID: number | string) {
        const self = this;
        const {props, onPress} = this;
        return (
            <ListItem itemDivider onPress={() => onPress(props, recipe)}>
                <Body style={{
                    backgroundColor: 'white',
                    borderBottomWidth: 1,
                    borderBottomColor: "#eeeeee",
                    height: F8Colors.RecipeCellRowHeight,
                }}>
                <OrderedRecipeCell {...this.props} recipe={recipe}/>
                </Body>
            </ListItem>
        )
    }

    onPress(props, recipe) {
        const {orderedUser, forRestaurant, forEvent} = props;

        onCellItemPress(props,
            MENU_DETAILED_RECIPE_PAGE,
            {
                recipe: recipe,
                forRestaurant: forRestaurant,
                forEvent: forEvent,
                forUser: orderedUser
            }
        )
    }

    renderTopHeaderView() {
        return (
            <StaticContainer>
                <View style={{flex: 1, height: 1}}>
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

module.exports = connect(select)(OrderedUserListView)

