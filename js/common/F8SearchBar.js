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
 * @providesModule F8SearchBar
 * @flow
 * @github https://github.com/localz/react-native-searchbar
 */

'use strict';


import React, {Component, PropTypes} from 'react';
import {
    StyleSheet,
    Dimensions,
    Platform,
    View,
    TextInput,
    TouchableOpacity,
    Keyboard,
    Animated,
} from 'react-native';

import commonStyles from './commonStyle'

const F8Colors = require('F8Colors')
import {Container, Header, Left, Right, Item, Input, Icon, Button, Text} from 'native-base'

class F8SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: '',
            top: 0,
        };
    }

    _handleX() {
        const {onX} = this.props;
        this._clearInput()
        if (onX) onX()
    }

    _handleBlur() {
        const {onBlur, clearOnBlur} = this.props;
        if (onBlur) {
            onBlur();
        }
        if (clearOnBlur) {
            this._clearInput();
        }

        Keyboard.dismiss();
    }

    _clearInput() {
        this.setState({input: ''});
        this._onChangeText('');
    }

    _onChangeText(input) {
        const {handleChangeText, handleSearch, handleResults} = this.props;
        this.setState({input});
        if (handleChangeText) {
            handleChangeText(input);
        }
        if (handleSearch) {
            handleSearch(input);
        }
    }

    render() {
        const {
            placeholder,
            placeholderTextColor,
            keyboardAppearance,
            autoCorrect,
            hideBack,
            searchBarMarginTop,
        } = this.props;

        const leftArrow = (
            <Left style={{flex:3}}>
                {
                    !hideBack &&
                    <Button transparent onPress={this.props.onBack}>
                        <Icon active name="arrow-back"/>
                    </Button>
                }
            </Left>
        )
        const rightArrow = (
            <Right style={{flex:3}}>
                {
                    this.state.input !== '' &&
                    <Button transparent
                            onPress={this.state.input === '' ? null : this._handleX.bind(this)}>
                        <Icon active name="close-circle"/>
                    </Button>
                }
            </Right>
        );

        const middleItem = (
            <Item style={{flex: 12}}>
                <Icon name="ios-search"/>
                <Input
                    placeholder={placeholder}
                    placeholderTextColor={placeholderTextColor}
                    value={this.state.input}
                    underlineColorAndroid='transparent'
                    returnKeyType='search'
                    autoCorrect={autoCorrect}
                    keyboardAppearance={keyboardAppearance}
                    autoCapitalize={'none'}
                    onChangeText={(input) => this._onChangeText(input)}
                />
            </Item>
        )

        return (
            <Header searchBar rounded
                    style={{backgroundColor: F8Colors.primaryColor, marginTop: searchBarMarginTop}}>
                {leftArrow}
                {middleItem}
                {rightArrow}
            </Header>
        )
    }

}


F8SearchBar.propTypes = {
    data: PropTypes.array,
    placeholder: PropTypes.string,
    handleChangeText: PropTypes.func,
    handleSearch: PropTypes.func,
    handleResults: PropTypes.func,
    onSubmitEditing: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onHide: PropTypes.func,
    onBack: PropTypes.func,
    onX: PropTypes.func,
    backButton: PropTypes.object,
    backButtonAccessibilityLabel: PropTypes.string,
    closeButton: PropTypes.object,
    closeButtonAccessibilityLabel: PropTypes.string,
    backCloseSize: PropTypes.number,
    fontSize: PropTypes.number,
    heightAdjust: PropTypes.number,
    backgroundColor: PropTypes.string,
    iconColor: PropTypes.string,
    textColor: PropTypes.string,
    selectionColor: PropTypes.string,
    placeholderTextColor: PropTypes.string,
    animate: PropTypes.bool,
    animationDuration: PropTypes.number,
    showOnLoad: PropTypes.bool,
    hideBack: PropTypes.bool,
    hideX: PropTypes.bool,
    iOSPadding: PropTypes.bool,
    iOSHideShadow: PropTypes.bool,
    clearOnShow: PropTypes.bool,
    clearOnHide: PropTypes.bool,
    clearOnBlur: PropTypes.bool,
    focusOnLayout: PropTypes.bool,
    autoCorrect: PropTypes.bool,
    keyboardAppearance: PropTypes.string,
    fontFamily: PropTypes.string,
    allDataOnEmptySearch: PropTypes.bool,
    searchBarMarginTop: PropTypes.number,
}

F8SearchBar.defaultProps = {
    data: [],
    placeholder: 'Search',
    backButtonAccessibilityLabel: 'Navigate up',
    closeButtonAccessibilityLabel: 'Clear search text',
    heightAdjust: 0,
    backgroundColor: 'white',
    iconColor: 'gray',
    textColor: 'gray',
    selectionColor: 'lightskyblue',
    placeholderTextColor: 'lightgray',
    animate: true,
    animationDuration: 200,
    showOnLoad: true,
    hideBack: false,
    hideX: false,
    iOSPadding: true,
    iOSHideShadow: false,
    clearOnShow: false,
    clearOnHide: true,
    clearOnBlur: false,
    focusOnLayout: true,
    autoCorrect: true,
    keyboardAppearance: 'default',
    fontFamily: 'System',
    allDataOnEmptySearch: false,
    backCloseSize: 28,
    fontSize: 20,
    searchBarMarginTop: 0,
}


module.exports = F8SearchBar;
