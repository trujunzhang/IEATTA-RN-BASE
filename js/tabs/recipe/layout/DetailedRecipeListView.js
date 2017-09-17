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

const ReviewCell = require('../../review/layout/ReviewCell')

const StaticContainer = require('F8StaticContainer')
const RLRecipeListViewHeaderView = require('./RLRecipeListViewHeaderView')

const {queryReviews} = require('../../../actions')
const {filterReviews} = require('../../filter/filterAppModel')


/**
 * The states were interested in
 */
const {
    MENU_SECTIONS_REVIEWS,
    PARSE_RECIPES,
} = require('../../../lib/constants').default

class DetailedRecipeListView extends React.Component {

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
        const {recipe} = nextProps;
        const {sections} = this.state;

        const nextSections = Object.assign({}, sections, {
            MENU_SECTIONS_REVIEWS: filterReviews(nextProps, PARSE_RECIPES, recipe.objectId, sections.MENU_SECTIONS_REVIEWS)
        })

        this.setState({sections: nextSections})
    }

    componentDidMount() {
        this.props.dispatch(queryReviews({
            objectSchemaName: PARSE_RECIPES,
            forObjectUniqueId: this.props.recipe.uniqueId
        }))
    }

    render() {
        return (
            <PureListView
                data={this.state.sections}
                renderTopHeader={this.renderTopHeaderView.bind(this)}
                renderRow={this.renderRow.bind(this)}
                {...this.props}
            />
        )
    }

    renderRow(item: any, sectionID: number | string) {
        return (<ReviewCell{...this.props} review={item}/>)
    }

    renderTopHeaderView() {
        return (
            <StaticContainer>
                <View style={{flex: 1, marginTop: F8Colors.topViewHeight}}>
                    <RLRecipeListViewHeaderView {...this.props}/>
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

module.exports = connect(select)(DetailedRecipeListView)

