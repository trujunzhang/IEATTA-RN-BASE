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

import AppConstants from '../../../lib/appConstants'

const F8Colors = require('F8Colors')
const F8RatingReview = require('F8RatingReview')
const F8PhotoHorizonSectionView = require('F8PhotoHorizonSectionView')

const {onCellItemPress} = require('../../filter/navigatorApp')

/**
 * The states were interested in
 */
const {
    PARSE_RESTAURANTS,
    SECTION_PHOTOS_BROWSER_FOR_RESTAURANT,
    HEADER_SVG_BUTTON_TAKE_PHOTO,
    HEADER_SVG_BUTTON_EDIT,
    HEADER_SVG_BUTTON_WRITE_REVIEW,
    MENU_ITEM_ADD_OR_EDIT_EVENT,
    HEADER_SVG_BUTTON_ADD_EVENT_FOR_RESTAURANT,
    MENU_ITEM_ADD_OR_EDIT_RESTAURANT,
    MODEL_FORM_TYPE_NEW,
    MODEL_FORM_TYPE_EDIT,
    // Screen Tag
    MENU_TAKE_PHOTO_PAGE,
} = require('../../../lib/constants').default

class RLRestaurantListViewHeaderView extends Component {

    onSVGButtonPress(tag) {
        switch (tag) {
            case HEADER_SVG_BUTTON_TAKE_PHOTO:
                onCellItemPress(this.props,
                    MENU_TAKE_PHOTO_PAGE,
                    {
                        modelType: 'restaurant',
                        model: this.props.forRestaurant
                    }
                )
                break;
            case HEADER_SVG_BUTTON_EDIT:
                onCellItemPress(this.props,
                    MENU_ITEM_ADD_OR_EDIT_RESTAURANT,
                    {
                        model: this.props.forRestaurant,
                        modelType: MODEL_FORM_TYPE_EDIT
                    }
                )
                break;
            case HEADER_SVG_BUTTON_ADD_EVENT_FOR_RESTAURANT:
                onCellItemPress(this.props,
                    MENU_ITEM_ADD_OR_EDIT_EVENT,
                    {
                        model: AppConstants.generateNewEventRealmObject(this.props.forRestaurant),
                        modelType: MODEL_FORM_TYPE_NEW
                    }
                )
                break;
        }
    }

    render() {
        return (
            <View style={{
                flex: 1,
                borderTopWidth: 1,
                borderTopColor: "#ccc",
                backgroundColor: F8Colors.controllerViewColor
            }}>

                <F8RatingReview
                    showTopRatingPanel={true}
                    onSVGButtonPress={this.onSVGButtonPress.bind(this)}
                    forItem={this.props.forRestaurant}
                    objectSchemaName={PARSE_RESTAURANTS}
                    buttonsType={[
                        HEADER_SVG_BUTTON_TAKE_PHOTO,
                        HEADER_SVG_BUTTON_EDIT,
                        HEADER_SVG_BUTTON_ADD_EVENT_FOR_RESTAURANT
                    ]}
                    {...this.props}/>

                <View style={{flexDirection: 'row'}}>
                    <F8PhotoHorizonSectionView
                        key={"restaurant-list-view-photos-horizon"}
                        forItem={this.props.forRestaurant}
                        sectionType={SECTION_PHOTOS_BROWSER_FOR_RESTAURANT}
                        {...this.props}/>
                </View>
            </View>
        )
    }

}

module.exports = RLRestaurantListViewHeaderView;


