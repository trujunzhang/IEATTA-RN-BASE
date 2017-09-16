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

const F8EmptySection = require('F8EmptySection')
const PureListView = require('PureListView')
const SectionHeader = require('SectionHeader')

const ReviewCell = require('./ReviewCell')

const StaticContainer = require('F8StaticContainer')

const {filterReviews} = require('../../filter/filterAppModel')

/**
 * The states were interested in
 */
const {
    MENU_SECTIONS_REVIEWS
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
        const {objectSchemaName} = this.props;
        this.setState({
            sections: {
                MENU_SECTIONS_REVIEWS: filterReviews(nextProps, objectSchemaName, null, [])
            },
            ready: true
        })
    }

    renderSectionHeader(sectionData, sectionId) {
        const {sections} = this.state;
        let emptyBlock = null;
        if (this.state.ready) {
            switch (sectionId) {
                case MENU_SECTIONS_REVIEWS:
                    if (sections.MENU_SECTIONS_REVIEWS.length === 0) {
                        emptyBlock = (<F8EmptySection title={`No reviews found`} text=""/>)
                    }
                    break;
            }
        }

        return (<SectionHeader sectionType={sectionId} emptyBlock={emptyBlock}/>)
    }

    render() {
        return (
            <PureListView
                {...this.props}
                haveParallaxView={false}
                data={this.state.sections}
                renderRow={this.renderRow.bind(this)}
                renderSectionHeader={this.renderSectionHeader.bind(this)}
                renderFooter={this.renderFooter.bind(this)}
            />
        )
    }

    renderFooter() {
        return (<View style={{height: 60}}/>)
    }

    renderRow(item: any,
              sectionID: number | string,
              rowID: number | string) {
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

