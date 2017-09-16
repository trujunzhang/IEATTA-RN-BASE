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
const F8RatingReview = require('F8RatingReview')
const F8PhotoHorizonSectionView = require('F8PhotoHorizonSectionView')


const {onCellItemPress} = require('../../filter/navigatorApp')
/**
 * The states were interested in
 */
const {
    PARSE_RECIPES,
    SECTION_PHOTOS_BROWSER_FOR_RECIPE,
    HEADER_SVG_BUTTON_TAKE_PHOTO,
    HEADER_SVG_BUTTON_EDIT,
    HEADER_SVG_BUTTON_WRITE_REVIEW,
    MENU_ITEM_ADD_OR_EDIT_RECIPE,
    MODEL_FORM_TYPE_NEW,
    MODEL_FORM_TYPE_EDIT,
} = require('../../../lib/constants').default


class RLRecipeListViewHeaderView extends Component {

    onSVGButtonPress(tag) {
        onCellItemPress(this.props,
            MENU_ITEM_ADD_OR_EDIT_RECIPE,
            {
                model: this.props.recipe,
                modelType: MODEL_FORM_TYPE_EDIT
            }
        )
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
                    forItem={this.props.recipe}
                    objectSchemaName={PARSE_RECIPES}
                    buttonsType={[
                        HEADER_SVG_BUTTON_TAKE_PHOTO,
                        HEADER_SVG_BUTTON_EDIT,
                        HEADER_SVG_BUTTON_WRITE_REVIEW
                    ]}
                    {...this.props}/>

                <View style={{flexDirection: 'row'}}>
                    <F8PhotoHorizonSectionView
                        forItem={this.props.recipe}
                        sectionType={SECTION_PHOTOS_BROWSER_FOR_RECIPE}
                        {...this.props}/>
                </View>
            </View>
        )
    }

}

module.exports = RLRecipeListViewHeaderView;


