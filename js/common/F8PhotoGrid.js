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
 * @providesModule F8PhotoGrid
 * @flow
 */

'use strict';

import React, {Component} from 'react'
import {
    Dimensions,
    ListView,
    StyleSheet,
    View,
} from 'react-native'

const styles = StyleSheet.create({
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
})

const F8Colors = require('F8Colors')

class F8PhotoGrid extends React.Component {

    constructor() {
        super();

        this.state = {
            data: new ListView.DataSource({
                rowHasChanged: (r1, r2) => {
                    r1 !== r2;
                }
            }),
        }
    }

    buildRows(items, itemsPerRow = 300) {
        return items.reduce((rows, item, idx) => {
            // If a full row is filled create a new row array
            if (idx % itemsPerRow === 0 && idx > 0) rows.push([]);
            rows[rows.length - 1].push(item);
            return rows;
        }, [[]]);
    }

    render() {
        let rows = this.buildRows(this.props.data, this.props.itemsPerRow);

        return (
            <ListView
                {...this.props}
                dataSource={this.state.data.cloneWithRows(rows)}
                renderRow={this.renderRow.bind(this)}
                renderFooter={this.props.renderPhotoFooter}
                style={{
                    flex: 1,
                    height: F8Colors.photoBrowserHeight,
                }}/>
        )
    }


    renderRow(items) {
        // Calculate the width of a single item based on the device width
        // and the desired margins between individual items
        let deviceWidth = Dimensions.get('window').width;
        let itemsPerRow = this.props.itemsPerRow;
        let margin = this.props.itemMargin || 1;

        let totalMargin = margin * (itemsPerRow - 1);
        let itemWidth = Math.floor((deviceWidth - totalMargin) / itemsPerRow);
        let adjustedMargin = ( deviceWidth - (itemsPerRow * itemWidth) ) / (itemsPerRow - 1);

        return (
            <View style={[styles.row, {marginBottom: adjustedMargin}]}>
                {items.map((item, index) => this.props.renderRow(item, itemWidth, index))}
                {itemsPerRow - items.length > 0 && <View style={{width: itemWidth * (itemsPerRow - items.length)}}/>}
            </View>
        )
    }

}

module.exports = F8PhotoGrid;

