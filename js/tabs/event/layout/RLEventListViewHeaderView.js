/**
 * The components needed from React
 */
import React, {Component} from 'react'
import {
    TouchableOpacity,
    View,
    Image,
    StyleSheet,
    Text,
    Platform,
    Dimensions
} from 'react-native'


const F8Colors = require('F8Colors')
const F8Button = require('F8Button')
const F8RatingReview = require('F8RatingReview')
const CaptionTextView = require('CaptionTextView')
const F8PhotoHorizonSectionView = require('F8PhotoHorizonSectionView')

const Events = require('../../../lib/events').default

const {getScreenWidth} = require('../../../lib/utils')

import Svg, {
    G,
    Path,
} from 'react-native-svg'

/**
 * The states were interested in
 */
const {
    PARSE_EVENTS,
    HEADER_SVG_BUTTON_EDIT,
    HEADER_SVG_BUTTON_WRITE_REVIEW,
    HEADER_SVG_BUTTON_ADD_USER_FOR_EVENT,

    SECTION_PHOTOS_BROWSER_FOR_EVENT,

    MENU_ITEM_ADD_OR_EDIT_EVENT,
    MODEL_FORM_TYPE_NEW,
    MODEL_FORM_TYPE_EDIT,
} = require('../../../lib/constants').default

import commonStyles from '../../../common/commonStyle'

const {onCellItemPress} = require('../../filter/navigatorApp')

/**
 * layout:
 *    @div: className="clearfix layout-block layout-a event-details_cards-container top-shelf_overlap column--responsive"
 *       @@div: className="event-details_info-card card card--horizontal"
 * @returns {XML}
 */
const styles = StyleSheet.create({
    eventHeaderContains: {
        flex: 1,
        paddingBottom: 5,
        justifyContent: 'center',
        backgroundColor: F8Colors.controllerViewColor
        // backgroundColor: 'red'
    },
    eventHeaderSection: {
        flex: 1,
        marginHorizontal: 30,
        backgroundColor: 'white',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: "#e6e6e6",
        flexDirection: 'column'
    },
    sectionMarginButton: {
        marginBottom: 10,
    },
    parallaxSection: {
        height: 60,
        backgroundColor: F8Colors.primaryColor,
    },
    rowPadding: {
        paddingTop: 15,
        paddingBottom: 18,
        marginLeft: 8,
    },
    row: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: "#ccc"
    },
    rowSection: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 8
    },
    whatRow: {
        flexDirection: 'column',
    },
    whatCaption: {
        fontWeight: 'bold',
        fontSize: 14,
        color: "#d32323"
    },
    whatTitle: {
        fontSize: 14,
        color: F8Colors.appTextColor,
        marginVertical: 4,
        paddingHorizontal: 8
    },

});

class RLEventListViewHeaderView extends Component {
    renderAddress() {
        const rows = this.props.forRestaurant.address.split(',')

        return (
            <View style={[styles.row, styles.rowPadding]}>
                <Svg width="24" height="24">
                    <Path fill="#666"
                          d="M12 2C8.13 2 5 5.13 5 9c0 2.61 1.43 4.88 3.54 6.08L12 22l3.46-6.92A6.987 6.987 0 0 0 19 9c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z"/>
                </Svg>
                <View style={styles.rowSection}>
                    {rows.map((item, index) => {
                        return (
                            <Text key={index}
                                  style={{fontSize: 14, color: F8Colors.appTextColor}}>
                                {item.trim()}
                            </Text>
                        )
                    })}
                </View>

            </View>
        )
    }

    renderEventDate() {
        const info = Events.getDateInfo(this.props.event);

        return (
            <View style={[styles.row, styles.rowPadding]}>
                <Svg width="24" height="24">
                    <Path fill="#666"
                          d="M18 21H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3 1 1 0 0 1 2 0h8a1 1 0 0 1 2 0 3 3 0 0 1 3 3v12a3 3 0 0 1-3 3zm1-13H5v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1V8zm-6 5h4v4h-4v-4z"/>
                </Svg>
                <View style={styles.rowSection}>
                    <CaptionTextView caption="From" title={info.startFormat}/>
                    <CaptionTextView caption="To" title={info.endFormat}/>
                </View>

            </View>
        )
    }

    onSVGButtonPress(tag) {
        switch (tag) {

            case HEADER_SVG_BUTTON_EDIT:
                onCellItemPress(this.props,
                    MENU_ITEM_ADD_OR_EDIT_EVENT,
                    {
                        model: this.props.event,
                        modelType: MODEL_FORM_TYPE_EDIT
                    }
                )
                break;
        }
    }

    renderEventInfo() {

        const {address} = this.props.forRestaurant;
        return (
            <View style={[styles.eventHeaderSection, styles.sectionMarginButton, getScreenWidth(30)]}>
                {!!address && address !== '' ? this.renderAddress() : null}
                {this.renderEventDate()}
                <View style={[styles.whatRow, styles.rowPadding]}>
                    <Text style={styles.whatCaption}>{'What/Why:'}</Text>
                    <Text style={styles.whatTitle}>{this.props.event.want || ''}</Text>
                </View>
            </View>
        )
    }

    render() {
        return (
            <View style={[styles.eventHeaderContains, commonStyles.columnDirection]}>
                {/*<View style={[commonStyles.absoluteFullSection, styles.parallaxSection]}/>*/}

                {/*{this.renderEventInfo()}*/}

                <F8RatingReview
                    showTopRatingPanel={true}
                    onSVGButtonPress={this.onSVGButtonPress.bind(this)}
                    forItem={this.props.event}
                    objectSchemaName={PARSE_EVENTS}
                    buttonsType={[
                        HEADER_SVG_BUTTON_ADD_USER_FOR_EVENT,
                        HEADER_SVG_BUTTON_EDIT,
                        HEADER_SVG_BUTTON_WRITE_REVIEW
                    ]}
                    {...this.props}/>

                <View style={{flexDirection: 'row'}}>
                    <F8PhotoHorizonSectionView
                        forItem={this.props.forRestaurant}
                        sectionType={SECTION_PHOTOS_BROWSER_FOR_EVENT}
                        {...this.props}/>
                </View>
            </View>
        )
    }
}


const {connect} = require('react-redux')

function select(store) {
    return {
        appModel: store.appModel,
        currentUser: store.user,
    }
}

module.exports = connect(select)(RLEventListViewHeaderView)


