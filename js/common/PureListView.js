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

import AppConstants from '../lib/appConstants'

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
} = require('../lib/constants').default


type State = {
    contentHeight: number;
    dataSource: ListView.DataSource;
};

// FIXME: Android has a bug when scrolling ListView the view insertions
// will make it go reverse. Temporary fix - pre-render more rows
const LIST_VIEW_PAGE_SIZE = Platform.OS === 'android' ? 20 : 1;

class PureListView extends React.Component {
    props: Props;
    state: State;

    static defaultProps = {
        // TODO: This has to be scrollview height + fake header
        minContentHeight: Dimensions.get('window').height + 20,
        renderSeparator: (sectionID, rowID) => <View style={commonStyles.listRowSeparator} key={rowID}/>,
    };

    constructor(props: Props) {
        super(props);
        let dataSource = new ListView.DataSource({
            getRowData: (dataBlob, sid, rid) => dataBlob[sid][rid],
            getSectionHeaderData: (dataBlob, sid) => dataBlob[sid],
            rowHasChanged: (row1, row2) => row1 !== row2,
            sectionHeaderHasChanged: (s1, s2) => {
                // if (s1.length === 0 || s2.length === 0) {
                return true;
                // }
                // return s1.length !== s2.length;
            },
        });

        const _dataSource = cloneWithData(dataSource, props.data)
        // debugger
        this.state = {
            contentHeight: 0,
            dataSource: _dataSource
        };

        (this: any).onContentSizeChange = this.onContentSizeChange.bind(this);
    }

    componentWillReceiveProps(nextProps: Props) {
        if (this.props.data !== nextProps.data) {
            this.setState({
                dataSource: cloneWithData(this.state.dataSource, nextProps.data),
            });
        }
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
        return (
            <ListView
                key={"pureList"}
                initialListSize={10}
                pageSize={LIST_VIEW_PAGE_SIZE}
                {...this.props}
                style={{flex: 1, backgroundColor: F8Colors.controllerViewColor}}
                ref="listview"
                dataSource={this.state.dataSource}
                renderHeader={this.renderHeader.bind(this)}
                renderFooter={this.renderFooter.bind(this)}
                contentInset={{bottom: 40, top: 0}}
                onContentSizeChange={this.onContentSizeChange}
                stickySectionHeadersEnabled={false}
                enableEmptySections={true}
                {...parallaxProperty}
            />
        )
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
