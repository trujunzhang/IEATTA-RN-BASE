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

/**
 * The states were interested in
 */
const {
    SECTION_PHOTOS_BROWSER_FOR_RESTAURANT,
    HEADER_SVG_BUTTON_TAKE_PHOTO,
    HEADER_SVG_BUTTON_EDIT,
    HEADER_SVG_BUTTON_WRITE_REVIEW,
    MENU_ITEM_ADD_OR_EDIT_RESTAURANT,
    MODEL_FORM_TYPE_NEW,
    MODEL_FORM_TYPE_EDIT,
} = require('../../../lib/constants').default


class RLOrderedUserListViewHeaderView extends Component {

    onSVGButtonPress(tag) {

    }

    render() {
        return (
            <View style={{
                flex: 1,
                borderTopWidth: 1,
                borderTopColor: "#ccc",
                backgroundColor: F8Colors.controllerViewColor
            }}>
            </View>
        )
    }

}

module.exports = RLOrderedUserListViewHeaderView;

