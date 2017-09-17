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
 * @providesModule PureListView
 * @flow
 */

'use strict';


/**
 * The components needed from React
 */
import React, {Component, PropTypes} from 'react';
import {
    TouchableOpacity,
    View,
    Text,
    StyleSheet,
    ListView,
    Platform,
    Image,
    Dimensions
} from 'react-native'

const _ = require('underscore')
import AppConstants from '../lib/appConstants'

const SectionHeader = require('SectionHeader')
const F8EmptySection = require('F8EmptySection')
const F8Colors = require('F8Colors')

import ParallaxScrollView from 'react-native-parallax-scroll-view';
import commonStyles from './commonStyle'

const F8PlaceHolderImage = require('F8PlaceHolderImage')
const {getLocalImagePath} = require('../parse/fsApi')

const {goBackPage} = require('../tabs/filter/navigatorApp')

import Icon from 'react-native-vector-icons/FontAwesome';

const PARALLAX_HEADER_HEIGHT = 300;
const STICKY_HEADER_HEIGHT = 70;


/**
 * The states were interested in
 */
const {
    PARALLAX_BACKGROUND_STATIC_IMAGE,
    PARALLAX_BACKGROUND_DYNAMIC_IMAGE,
    PARALLAX_HEADER_LEFT_ITEM_NONE,
    PARALLAX_HEADER_LEFT_ITEM_BACK,

    NATIVE_BASE_LIST_SECTION_HEADER,
    NATIVE_BASE_LIST_SECTION_ROWS,
    NATIVE_BASE_LIST_SECTION_EMPTY,
} = require('../lib/constants').default

import {Container, Header, Content, List, ListItem} from 'native-base'


// FIXME: Android has a bug when scrolling ListView the view insertions
// will make it go reverse. Temporary fix - pre-render more rows
const LIST_VIEW_PAGE_SIZE = Platform.OS === 'android' ? 20 : 1;

class PureListView extends React.Component {

    constructor(props: Props) {
        super(props);

    }

    render() {
        const {haveParallaxView} = this.props;

        const parallaxProperty =
            haveParallaxView ? {
                renderScrollComponent: (props) => (
                    <ParallaxScrollView
                        headerBackgroundColor="#333"
                        stickyHeaderHeight={STICKY_HEADER_HEIGHT}
                        parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT}
                        backgroundSpeed={10}

                        renderBackground={this.renderBackground.bind(this)}
                        renderForeground={this.props.renderParallaxHeader}
                        renderStickyHeader={this.renderStickyHeader.bind(this)}
                        renderFixedHeader={this.renderFixedHeader.bind(this)}
                    />
                )
            } : {};

        const _dataArray = this._generateDataArray();
        return (
            <Content>
                <List
                    style={{flex: 1, backgroundColor: F8Colors.controllerViewColor}}
                    rowHasChanged={(row1, row2) => row1.objectId !== row2.objectId}
                    dataArray={_dataArray}
                    renderRow={this.renderListRow.bind(this)}
                    renderHeader={this.props.renderTopHeaderView}

                    initialListSize={10}
                    pageSize={LIST_VIEW_PAGE_SIZE}
                    stickySectionHeadersEnabled={false}
                    enableEmptySections={true}

                    {...parallaxProperty}
                >
                </List>
            </Content>
        )
    }

    renderListRow(item) {
        switch (item.rowType) {
            case NATIVE_BASE_LIST_SECTION_HEADER:
                return (<SectionHeader sectionType={item.objectId}/>)
            case NATIVE_BASE_LIST_SECTION_ROWS:
                return this.props.renderRow(item, item.sectionTag)
            case NATIVE_BASE_LIST_SECTION_EMPTY:
                return (
                    <F8EmptySection
                        title={`No events on the restaurant`}
                        text="Chick the cross icon to add new event."
                    />
                )
        }

        return null
    }

    _generateDataArray() {
        const {data} = this.props;
        const sectionKeys = Object.keys(data);

        let listRows = [];
        sectionKeys.forEach(function (key) {
            const sectionData = data[key];
            listRows.push(
                {
                    rowType: NATIVE_BASE_LIST_SECTION_HEADER,
                    objectId: key,
                    sectionData: sectionData,
                }
            )

            if (sectionData.length === 0) {
                listRows.push(
                    {
                        rowType: NATIVE_BASE_LIST_SECTION_EMPTY,
                        objectId: NATIVE_BASE_LIST_SECTION_EMPTY,
                    }
                )
            }
            sectionData.forEach(function (row, index) {
                listRows.push(
                    Object.assign({}, row, {
                        rowType: NATIVE_BASE_LIST_SECTION_ROWS,
                        sectionTag: key,
                    })
                )
            })
        })

        return listRows;
    }

    renderBackground() {
        const {forObject, objectSchemaName, parallaxViewType} = this.props;

        if (parallaxViewType === PARALLAX_BACKGROUND_STATIC_IMAGE) {
            return (
                <View key="background" style={[styles.parallaxHeaderBackground]}>
                    {this.props.renderCustomBackground()}
                </View>
            )
        }

        return (
            <View key="background" style={[styles.parallaxHeaderBackground]}>

                <F8PlaceHolderImage
                    style={[commonStyles.absoluteFullSection]}
                    source={{uri: `file://${getLocalImagePath(forObject.listPhotoId)}`}}
                    placeholderSource={AppConstants.placeHolderImage [objectSchemaName]}>
                </F8PlaceHolderImage>

                <View
                    style={[commonStyles.absoluteFullSection, commonStyles.blurForegroundView, styles.parallaxHeaderBlurView]}/>
            </View>
        )
    }

    renderStickyHeader() {
        const {forObject, customStickyTitle} = this.props;
        return (
            <View key="sticky-header" style={styles.stickyHeaderSection}>
                <Text numberOfLines={1} style={styles.stickyHeaderSectionText}>
                    {customStickyTitle === "" ? forObject.displayName : customStickyTitle}
                </Text>
            </View>
        )
    }

    renderFixedHeader() {
        const {rightItem, parallaxLeftItemType} = this.props;

        const headerItems = [];
        if (parallaxLeftItemType !== PARALLAX_HEADER_LEFT_ITEM_NONE) {
            const leftItem = {
                title: 'back',
                icon: require('./img/back_white.png'),
                onPress: () => {
                    goBackPage(this.props)
                }
            }
            headerItems.push(
                <View key="fixed-header-left-item" style={[styles.fixedHeaderLeftItemSection]}>
                    <View style={styles.fixedHeaderLeftCellLeftArrowPanel}>
                        <TouchableOpacity
                            accessibilityLabel={leftItem.title}
                            accessibilityTraits="button"
                            onPress={leftItem.onPress}>
                            <Icon name="angle-left" size={32} color="white"/>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }
        if (!!rightItem) {
            headerItems.push(
                <View key="fixed-header-right-item" style={[styles.fixedHeaderRightItemSection]}>
                    <TouchableOpacity
                        accessibilityLabel={rightItem.title}
                        accessibilityTraits="button"
                        onPress={rightItem.onPress}>
                        <Text style={[styles.rightItemText]}>{rightItem.title}</Text>
                    </TouchableOpacity>
                </View>
            )
        }

        return (
            <View key="fixed-header"
                  style={[commonStyles.absoluteFullSection, commonStyles.rowDirection, styles.fixedHeaderSection]}>
                {headerItems}
            </View>
        )
    }

    onContentSizeChange(contentWidth: number, contentHeight: number) {
        if (contentHeight !== this.state.contentHeight) {
            this.setState({contentHeight});
        }
    }

    scrollTo(...args: Array<any>) {
        this.refs.listview.scrollTo(...args);
    }

    getScrollResponder(): any {
        return this.refs.listview.getScrollResponder();
    }

    renderHeader() {
        return this.props.renderTopHeader && this.props.renderTopHeader();
    }

    renderFooter() {
        if (!!this.props.renderFooter) {
            return this.props.renderFooter();
        }

        if (this.state.dataSource.getRowCount() === 0) {
            return this.props.renderEmptyList && this.props.renderEmptyList();
        }

        return null;
    }
}

function cloneWithData(dataSource: ListView.DataSource, data: ?Data) {
    if (!data) {
        return dataSource.cloneWithRows([]);
    }
    if (Array.isArray(data)) {
        return dataSource.cloneWithRows(data);
    }
    return dataSource.cloneWithRowsAndSections(data);
}


const styles = StyleSheet.create({
    parallaxHeaderBackground: {
        flexGrow: 1,
        height: PARALLAX_HEADER_HEIGHT,
        // backgroundColor: 'red',
    },
    parallaxHeaderImage: {
        flexGrow: 1,
        height: PARALLAX_HEADER_HEIGHT,
    },
    parallaxHeaderBlurView: {
        height: PARALLAX_HEADER_HEIGHT,
        // backgroundColor: 'blue',
    },
    stickyHeaderSection: {
        flexGrow: 1,
        height: STICKY_HEADER_HEIGHT,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: F8Colors.primaryColor,
    },
    stickyHeaderSectionText: {
        color: 'white',
        fontSize: 20,
        margin: 10,
        paddingTop: 12,
    },
    fixedHeaderSection: {
        // justifyContent: 'flex-end',
        // backgroundColor: 'red',
    },
    fixedHeaderLeftItemSection: {
        flex: 1,
    },
    fixedHeaderLeftCellLeftArrowPanel: {
        flex: 1,
        marginTop: 24,
        marginLeft: 16,
        justifyContent: 'flex-start',
        // backgroundColor: 'blue',
    },
    fixedHeaderRightItemSection: {
        flex: 1,
        alignItems: 'flex-end',
        marginTop: 12,
        marginRight: 14,
        // backgroundColor: 'blue',
    },
    rightItemText: {
        letterSpacing: 1,
        fontSize: 18,
        color: 'white',
    },
});


PureListView.propTypes = {
    haveParallaxView: PropTypes.bool,
    parallaxLeftItemType: PropTypes.string,
    parallaxViewType: PropTypes.string,
    renderEmptyList: PropTypes.func,
    minContentHeight: PropTypes.number,
    customStickyTitle: PropTypes.string
};

PureListView.defaultProps = {
    haveParallaxView: true,
    parallaxLeftItemType: PARALLAX_HEADER_LEFT_ITEM_BACK,
    parallaxViewType: PARALLAX_BACKGROUND_DYNAMIC_IMAGE,
    customStickyTitle: ""
};

module.exports = PureListView;
