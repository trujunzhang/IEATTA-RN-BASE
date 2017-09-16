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


const F8Colors = require('F8Colors')
const F8EmptySection = require('F8EmptySection')
const PureListView = require('PureListView')
const SectionHeader = require('SectionHeader')

const StaticContainer = require('F8StaticContainer')

const RLOrderedUserListViewHeaderView = require('./RLOrderedUserListViewHeaderView')

const OrderedRecipeCell = require('./OrderedRecipeCell')

const {queryRecipesForUser} = require('../../../actions')

const {filterOrderedRecipes} = require('../../filter/filterAppModel')

/**
 * The states were interested in
 */
const {
    MENU_SECTIONS_ORDERED_RECIPES,
} = require('../../../lib/constants').default


class OrderedUserListView extends React.Component {

    constructor(props: Props) {
        super(props);

        this.state = {
            sections: {
                MENU_SECTIONS_ORDERED_RECIPES: []
            },
            ready: false
        }
    }


    componentWillReceiveProps(nextProps: Props) {
        const {forEvent, forRestaurant, orderedUser} = this.props;
        const {sections} = this.state;
        const {MENU_SECTIONS_ORDERED_RECIPES} = sections;
        this.setState({
            sections: {
                MENU_SECTIONS_ORDERED_RECIPES: filterOrderedRecipes(nextProps, forRestaurant.objectId, forEvent.objectId, orderedUser.objectId, MENU_SECTIONS_ORDERED_RECIPES)
            },
            ready: true
        })
    }

    componentDidMount() {
        const {forEvent, forRestaurant, orderedUser} = this.props;
        this.props.dispatch(queryRecipesForUser(forRestaurant.objectId, forEvent.objectId, orderedUser.objectId))
    }


    renderSectionHeader(sectionData, sectionId) {
        const {sections} = this.state;
        let emptyBlock = null;
        if (this.state.ready) {
            switch (sectionId) {
                case MENU_SECTIONS_ORDERED_RECIPES:
                    if (sections.MENU_SECTIONS_ORDERED_RECIPES.length === 0) {
                        emptyBlock = (
                            <F8EmptySection
                                title={`No recipes ordered by the user`}
                                text="Chick the add icon to add an recipe."
                            />
                        )
                    }
                    break;
            }
        }

        return (<SectionHeader sectionType={sectionId} emptyBlock={emptyBlock}/>)
    }

    render() {
        return (
            <PureListView
                data={this.state.sections}
                renderTopHeader={this.renderTopHeaderView.bind(this)}
                renderFooter={this.renderFooter.bind(this)}
                renderRow={this.renderRow.bind(this)}
                renderSectionHeader={this.renderSectionHeader.bind(this)}
                {...this.props}
            />
        )
    }

    renderFooter() {
        return (<View style={{height: 60}}/>)
    }

    renderRow(recipe: any,
              sectionID: number | string,
              rowID: number | string) {
        return (
            <OrderedRecipeCell {...this.props} recipe={recipe}/>
        )
    }

    renderTopHeaderView(): ?ReactElement {
        return (
            <StaticContainer>
                <View style={{flex: 1, marginTop: F8Colors.topViewHeight}}>
                    <RLOrderedUserListViewHeaderView {...this.props}/>
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

