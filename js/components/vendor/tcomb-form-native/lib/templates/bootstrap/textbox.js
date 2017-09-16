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
    Dimensions,
    TextInput
} from 'react-native'

const {width, height} = Dimensions.get('window')


function renderText(locals, textboxStyle) {
    if (locals.hidden) {
        return null;
    }

    let stylesheet = locals.stylesheet;
    let formGroupStyle = stylesheet.formGroup.normal;
    let controlLabelStyle = stylesheet.controlLabel.normal;
    let textboxViewStyle = stylesheet.textboxView.normal;
    let helpBlockStyle = stylesheet.helpBlock.normal;
    let errorBlockStyle = stylesheet.errorBlock;

    if (locals.hasError) {
        formGroupStyle = stylesheet.formGroup.error;
        controlLabelStyle = stylesheet.controlLabel.error;
        textboxViewStyle = stylesheet.textboxView.error;
        helpBlockStyle = stylesheet.helpBlock.error;
    }

    if (locals.editable === false) {
        textboxViewStyle = stylesheet.textboxView.notEditable;
    }

    return (
        <TextInput
            style={[textboxStyle, locals.editStyle]}
            accessibilityLabel={locals.label}
            ref="input"
            autoCapitalize={locals.autoCapitalize}
            autoCorrect={locals.autoCorrect}
            autoFocus={locals.autoFocus}
            blurOnSubmit={locals.blurOnSubmit}
            editable={locals.editable}
            keyboardType={locals.keyboardType}
            maxLength={locals.maxLength}
            multiline={locals.multiline}
            onBlur={locals.onBlur}
            onEndEditing={locals.onEndEditing}
            onFocus={locals.onFocus}
            onLayout={locals.onLayout}
            onSelectionChange={locals.onSelectionChange}
            onSubmitEditing={locals.onSubmitEditing}
            onContentSizeChange={locals.onContentSizeChange}
            placeholderTextColor={locals.placeholderTextColor}
            secureTextEntry={locals.secureTextEntry}
            selectTextOnFocus={locals.selectTextOnFocus}
            selectionColor={locals.selectionColor}
            numberOfLines={locals.numberOfLines}
            underlineColorAndroid={locals.underlineColorAndroid}
            clearButtonMode={locals.clearButtonMode}
            clearTextOnFocus={locals.clearTextOnFocus}
            enablesReturnKeyAutomatically={locals.enablesReturnKeyAutomatically}
            keyboardAppearance={locals.keyboardAppearance}
            onKeyPress={locals.onKeyPress}
            returnKeyType={locals.returnKeyType}
            selectionState={locals.selectionState}
            onChangeText={(value) => locals.onChange(value)}
            textAlignVertical={locals.multiline ? 'top' : 'center'}
            onChange={locals.onChangeNative}
            placeholder={locals.placeholder}
            value={locals.value}
        />
    )
}

function textbox(locals) {

    if (locals.hidden) {
        return null;
    }


    let stylesheet = locals.stylesheet;
    let formGroupStyle = stylesheet.formGroup.normal;
    let controlLabelStyle = stylesheet.controlLabel.normal;
    let textboxStyle = stylesheet.textbox.normal;
    let textboxViewStyle = stylesheet.textboxView.normal;
    let helpBlockStyle = stylesheet.helpBlock.normal;
    let errorBlockStyle = stylesheet.errorBlock;

    if (locals.hasError) {
        formGroupStyle = stylesheet.formGroup.error;
        controlLabelStyle = stylesheet.controlLabel.error;
        textboxStyle = stylesheet.textbox.error;
        textboxViewStyle = stylesheet.textboxView.error;
        helpBlockStyle = stylesheet.helpBlock.error;
    }

    if (locals.editable === false) {
        textboxStyle = stylesheet.textbox.notEditable;
        textboxViewStyle = stylesheet.textboxView.notEditable;
    }

    let label = locals.label ? <Text style={controlLabelStyle}>{locals.label}</Text> : null;
    let help = locals.help ? <Text style={helpBlockStyle}>{locals.help}</Text> : null;
    let error = locals.hasError && locals.error ?
        <Text accessibilityLiveRegion="polite" style={errorBlockStyle}>{locals.error}</Text> : null;

    return (
        <View style={formGroupStyle}>
            {label}
            <View style={[textboxViewStyle]}>
                {renderText(locals, textboxStyle)}
            </View>
            {help}
            {error}
        </View>
    )

}


module.exports = textbox;
