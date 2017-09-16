/**
 * # Login.js
 *
 * This class is a little complicated as it handles multiple states.
 *
 */
'use strict'

/**
 * The ErrorAlert displays an alert for both ios & android
 */
const ErrorAlert = require('ErrorAlert')
/**
 * The FormButton will change it's text between the 4 states as necessary
 */
const FormButton = require('FormButton')
/**
 *  The LoginForm does the heavy lifting of displaying the fields for
 * textinput and displays the error messages
 */
const LoginForm = require('./LoginForm')

/**
 * The necessary React components
 */
import React, {Component} from 'react'
import
{
    StyleSheet,
    ScrollView,
    Text,
    TouchableHighlight,
    View,
    Dimensions
} from 'react-native'

const {height, width} = Dimensions.get('window') // Screen dimensions in current orientation

/**
 * ### Translations
 */
const I18n = require('react-native-i18n')
import Translations from '../../../../lib/Translations'

I18n.translations = Translations

/**
 * The states were interested in
 */
const {
    LOGIN,
    REGISTER,
    FORGOT_PASSWORD,
    // Form Type
    LOGIN_FORM_TYPE_MAIN,
    LOGIN_FORM_TYPE_LOGIN,
    LOGIN_FORM_TYPE_REGISTER,
    LOGIN_FORM_TYPE_FORGOTPASSWORD
} = require('../../../../lib/constants').default

/**
 * ## Styles
 */
const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1,
        backgroundColor: 'white'
    },
    inputs: {
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10
    },
    forgotContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10
    }
})

class LoginRender extends Component {
    constructor(props) {
        super(props)
        this.errorAlert = new ErrorAlert()
        this.state = {
            value: {
                username: this.props.auth.form.fields.username,
                email: this.props.auth.form.fields.email,
                password: this.props.auth.form.fields.password,
                passwordAgain: this.props.auth.form.fields.passwordAgain
            }
        }
    }

    /**
     * ### componentWillReceiveProps
     * As the properties are validated they will be set here.
     */
    componentWillReceiveProps(nextprops) {
        this.setState({
            value: {
                username: nextprops.auth.form.fields.username,
                email: nextprops.auth.form.fields.email,
                password: nextprops.auth.form.fields.password,
                passwordAgain: nextprops.auth.form.fields.passwordAgain
            }
        })
    }

    /**
     * ### onChange
     *
     * As the user enters keys, this is called for each key stroke.
     * Rather then publish the rules for each of the fields, I find it
     * better to display the rules required as long as the field doesn't
     * meet the requirements.
     * *Note* that the fields are validated by the authReducer
     */
    onChange(value) {
        if (value.username !== '') {
            this.props.actions.onAuthFormFieldChange('username', value.username)
        }
        if (value.email !== '') {
            this.props.actions.onAuthFormFieldChange('email', value.email)
        }
        if (value.password !== '') {
            this.props.actions.onAuthFormFieldChange('password', value.password)
        }
        if (value.passwordAgain !== '') {
            this.props.actions.onAuthFormFieldChange('passwordAgain', value.passwordAgain)
        }
        this.setState(
            {value}
        )
    }

    /**
     *  Get the appropriate message for the current action
     *  @param messageType FORGOT_PASSWORD, or LOGIN, or REGISTER
     *  @param actions the action for the message type
     */
    getMessage(messageType, actions) {
        let forgotPassword =
            <TouchableHighlight
                onPress={() => {
                    actions.forgotPasswordState()
                    // Actions.ForgotPassword()
                    this.props.toggleEvent(LOGIN_FORM_TYPE_FORGOTPASSWORD)
                }}>
                <Text>{I18n.t('LoginRender.forgot_password')}</Text>
            </TouchableHighlight>

        let alreadyHaveAccount =
            <TouchableHighlight
                onPress={() => {
                    actions.loginState()
                    // Actions.Login()
                    this.props.toggleEvent(LOGIN_FORM_TYPE_LOGIN)
                }}>
                <Text>{I18n.t('LoginRender.already_have_account')}</Text>
            </TouchableHighlight>

        let register =
            <TouchableHighlight
                onPress={() => {
                    actions.registerState()
                    // Actions.Register()
                    this.props.toggleEvent(LOGIN_FORM_TYPE_REGISTER)
                }}>
                <Text>{I18n.t('LoginRender.register')}</Text>
            </TouchableHighlight>

        switch (messageType) {
            case FORGOT_PASSWORD:
                return forgotPassword
            case LOGIN:
                return alreadyHaveAccount
            case REGISTER:
                return register
        }
    }

    /**
     * ### render
     * Setup some default presentations and render
     */
    render() {
        return (
            <View style={styles.container}>
                {this.renderContent()}
            </View>
        )
    }

    renderContent() {
        let self = this

        let formType = this.props.formType
        let loginButtonText = this.props.loginButtonText
        let onButtonPress = this.props.onButtonPress

        let leftMessageType = this.props.leftMessageType
        let rightMessageType = this.props.rightMessageType

        let leftMessage = this.getMessage(leftMessageType, this.props.actions)
        let rightMessage = this.getMessage(rightMessageType, this.props.actions)

        let displayPasswordCheckbox = this.props.displayPasswordCheckbox
        /**
         * Toggle the display of the Password and PasswordAgain fields
         */
        let passwordCheckbox = <Text/>

        // display the login / register / change password screens
        this.errorAlert.checkError(this.props.auth.form.error)

        return (
            <View>
                <View style={styles.inputs}>
                    <LoginForm
                        formType={formType}
                        form={this.props.auth.form}
                        value={this.state.value}
                        onChange={self.onChange.bind(self)}/>
                    {passwordCheckbox}
                </View>

                <FormButton
                    isDisabled={!this.props.auth.form.isValid || this.props.auth.form.isFetching}
                    onPress={onButtonPress}
                    buttonText={loginButtonText}/>

                <View>
                    <View style={styles.forgotContainer}>
                        {leftMessage}
                        {rightMessage}
                    </View>
                </View>

            </View>
        )
    }
}

/**
 * ## Imports
 *
 * Redux
 */
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import * as authActions from '../../../../reducers/auth/authActions'

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(authActions, dispatch)
    }
}

module.exports = connect(null, mapDispatchToProps)(LoginRender)
