/**
 * # Login.js
 *
 * This class is a little complicated as it handles multiple states.
 *
 */
'use strict'

/**
 * The necessary React components
 */
import React, {Component} from 'react'
import
{
    StyleSheet,
    Text,
    View,
} from 'react-native'

const F8Colors = require('F8Colors')
const F8Header = require('F8Header')

const F8PhotoHorizonSectionView = require('F8PhotoHorizonSectionView')

/**
 * The FormButton will change it's text between the 4 states as necessary
 */
const FormButton = require('FormButton')
/**
 *  The UserForm does the heavy lifting of displaying the fields for
 * textinput and displays the error messages
 */
const UserForm = require('./UserForm')

/**
 * ### Translations
 */
const I18n = require('react-native-i18n')
import Translations from '../../../lib/Translations'

I18n.translations = Translations

const {goBackPage} = require('../../../tabs/filter/navigatorApp')

/**
 * The states were interested in
 */
const {
    MENU_ITEM_ADD_OR_EDIT_USER,
    // Sections
    SECTION_PHOTOS_BROWSER_FOR_USER,
    // Model Form Type
    MODEL_FORM_TYPE_NEW,
    MODEL_FORM_TYPE_EDIT,
} = require('../../../lib/constants').default


import {Container, Content} from 'native-base'
import styles from '../editStyles'

class IEAEditUser extends Component {

    static navigationOptions = ({navigation}) => ({
        header: null,
    });

    constructor(props) {
        super(props)

        const {params} = this.props.navigation.state;
        const model = params.model;
        const modelType = params.modelType;

        this.state = {
            value: {
                displayName: props.editModel.form.fields.displayName,
            }
        }

        props.actions.toggleEditModelType(MENU_ITEM_ADD_OR_EDIT_USER, model, modelType);
        props.actions.onEditModelFormFieldChange('displayName', model.displayName || '', true)
    }

    /**
     * ### componentWillReceiveProps
     * As the properties are validated they will be set here.
     */
    componentWillReceiveProps(nextProps) {
        this.setState({
            value: {
                displayName: nextProps.editModel.form.fields.displayName,
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
        if (value.displayName !== '') {
            this.props.actions.onEditModelFormFieldChange('displayName', value.displayName)
        }
        this.setState(
            {value}
        )
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

    onButtonPress() {

    }

    renderContent() {
        const {params} = this.props.navigation.state;

        const editModelType = this.props.editModel.form.editModelType;

        const formTitle = (editModelType === MODEL_FORM_TYPE_NEW) ? "Add a User" : "Edit the User";

        return (
            <View style={{flex: 1, backgroundColor: F8Colors.controllerViewColor}}>
                <F8Header
                    style={{backgroundColor: F8Colors.primaryColor}}
                    foreground='dark'
                    leftItem={leftItem}
                    title={formTitle}/>
                <View>
                    <View style={styles.inputs}>
                        <UserForm
                            form={this.props.editModel.form}
                            value={this.state.value}
                            onChange={this.onChange.bind(this)}/>
                    </View>

                    <FormButton
                        isDisabled={!this.props.editModel.form.isValid || this.props.editModel.form.isFetching}
                        onPress={this.onButtonPress.bind(this)}
                        buttonText={"Save"}/>
                </View>


                <View style={{flexDirection: 'row'}}>
                    <F8PhotoHorizonSectionView
                        forItem={params.model}
                        sectionType={SECTION_PHOTOS_BROWSER_FOR_USER}
                        {...this.props}/>
                </View>
            </View>
        )
    }

}


import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import * as editModelActions from '../../../reducers/editModel/editModelActions'

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(editModelActions, dispatch)
    }
}

function select(store) {
    return {
        editModel: store.editModel
    };
}

module.exports = connect(select, mapDispatchToProps)(IEAEditUser)
