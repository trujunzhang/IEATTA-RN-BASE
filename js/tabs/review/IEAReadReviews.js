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

import Reviews from '../../lib/reviews'

const F8Colors = require('F8Colors')
const F8Header = require('F8Header')
const F8SearchBar = require('F8SearchBar')

const {queryReviews} = require('../../actions')

const ReviewsListView = require('./layout/ReviewsListView')
const SegmentedControlTab = require('../../components/vendor/segmented-control/SegmentedControlTab')

const {delayEvent} = require('../../lib/utils')

class IEAReadReviews extends Component {
    static navigationOptions = ({navigation}) => ({
        header: null,
    });

    constructor(props) {
        super(props)
        this.state = {
            selectedIndex: 0,
            selectedIndices: [0],
            customStyleIndex: 0,
            segmentedTableTitles: Reviews.segmentedTableTitles
        }
    }


    handleCustomIndexSelect = (index) => {
        this.setState({
            ...this.state,
            customStyleIndex: index,
        });

        const {segmentedTableTitles, search} = this.state;
        this.props.dispatch(queryReviews({objectSchemaName: segmentedTableTitles[index].tag, search: search}))
    }

    componentWillMount() {
        const {customStyleIndex, segmentedTableTitles} = this.state;
        this.props.dispatch(queryReviews({objectSchemaName: segmentedTableTitles[customStyleIndex].tag,}))
    }

    handleSearch(input) {
        this.setState({search: input});

        const {customStyleIndex, segmentedTableTitles} = this.state,
            {dispatch} = this.props;

        delayEvent(function () {
            const tag = segmentedTableTitles[customStyleIndex].tag;
            dispatch(queryReviews({objectSchemaName: tag, search: input}))
        }, 700)
    }

    render() {
        const titles = Reviews.segmentedTableTitles.map((item, index) => {
            return item.title;
        })

        return (
            <View style={{flex: 1, backgroundColor: F8Colors.controllerViewColor}}>
                <F8Header title={"Read Reviews"} {...this.props}/>
                <F8SearchBar
                    handleSearch={this.handleSearch.bind(this)}
                    hideBack={true}
                    placeholder={"Search Reviews"}
                    searchBarMarginTop={-1}
                    placeholderTextColor="#aaa"
                    ref={(ref) => this.searchBar = ref}/>

                <SegmentedControlTab
                    values={titles}
                    selectedIndex={this.state.customStyleIndex}
                    onTabPress={this.handleCustomIndexSelect.bind(this)}
                    borderRadius={0}
                    tabsContainerStyle={{height: 40}}/>

                {this.renderContent()}
            </View>
        )
    }

    renderContent() {
        const {customStyleIndex, segmentedTableTitles} = this.state;
        return (<ReviewsListView objectSchemaName={segmentedTableTitles[customStyleIndex].tag} {...this.props}/>)
    }

}


const {connect} = require('react-redux')

module.exports = connect()(IEAReadReviews)


