/**
 * # DriverBox.js
 *  This is the DriverBox app screen
 *
 */
'use strict'


/**
 * The components needed from React
 */
import React, {Component} from 'react'
import {
    Text,
    TouchableOpacity,
    View,
    TextInput,
    Image,
    ScrollView,
    StyleSheet,
    Dimensions
} from 'react-native'
const {width, height} = Dimensions.get('window')

import Icon from 'react-native-vector-icons/MaterialIcons'

import ModalPicker from 'react-native-modal-picker'

/**
 * ## App class
 */
class PickerButton extends Component {

    props: {
        style: any;
        dispatch: () => void;
    };

    constructor(props) {
        super(props);
        this.state = {};
    }


    render() {
        const {pickerData, pickerItem, pickerContainerStyle, onPickerChanged} = this.props;

        const icon = <Icon name='arrow-drop-down' size={16} style={{color: 'black',}}/>;
        return (
            <ModalPicker
                data={pickerData}
                initValue="Select something yummy!"
                onChange={onPickerChanged}>

                <View style={pickerContainerStyle}>
                    <View style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'row',}}>
                        <Text style={{color: '#000', fontSize: 12,}}>{pickerItem}</Text>
                        {icon}
                    </View>
                </View>

            </ModalPicker>
        )
    }


}


module.exports = PickerButton;
export default PickerButton;
