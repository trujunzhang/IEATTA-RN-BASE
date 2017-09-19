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
    View,
    Dimensions,
} from 'react-native'

const F8Header = require('F8Header')
const F8MessageBar = require('F8MessageBar')

/**
 * The FormButton will change it's text between the 4 states as necessary
 */
const FormButton = require('FormButton')
/**
 *  The EventForm does the heavy lifting of displaying the fields for
 * textinput and displays the error messages
 */
const EventForm = require('./EventForm')


/**
 * ### Translations
 */
const I18n = require('react-native-i18n')
import Translations from '../../../lib/Translations'

I18n.translations = Translations

const {goBackPage} = require('../../../tabs/filter/navigatorApp')

const {
    writeRealmObject,
    timeout
} = require('../../../actions')

import {Container, Content} from 'native-base'
import styles from '../editStyles'

/**
 * The states were interested in
 */
const {
    PARSE_EVENTS,
    MENU_ITEM_ADD_OR_EDIT_EVENT,
    // Model Form Type
    MODEL_FORM_TYPE_NEW,
    MODEL_FORM_TYPE_EDIT,
} = require('../../../lib/constants').default

class IEAEditEvent extends Component {

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
                eventWhat: props.editModel.form.fields.eventWhat,
                start: model.start || new Date(),
                end: model.end || new Date(),
            },
            alert: null
        }

        props.actions.toggleEditModelType(MENU_ITEM_ADD_OR_EDIT_EVENT, model, modelType);
        props.actions.onEditModelFormFieldChange('displayName', model.displayName || '', true)
        props.actions.onEditModelFormFieldChange('eventWhat', model.want || '', true)
        props.actions.onEditModelFormFieldChange('start', model.start || new Date(), true)
        props.actions.onEditModelFormFieldChange('end', model.end || new Date(), true)
    }

    /**
     * ### componentWillReceiveProps
     * As the properties are validated they will be set here.
     */
    componentWillReceiveProps(nextProps) {
        this.setState({
            value: {
                displayName: nextProps.editModel.form.fields.displayName,
                eventWhat: nextProps.editModel.form.fields.eventWhat,
                start: nextProps.editModel.form.fields.start,
                end: nextProps.editModel.form.fields.end,
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

        if (value.eventWhat !== '') {
            this.props.actions.onEditModelFormFieldChange('eventWhat', value.eventWhat)
        }

        if (value.start !== '') {
            this.props.actions.onEditModelFormFieldChange('start', value.start)
        }

        if (value.end !== '') {
            this.props.actions.onEditModelFormFieldChange('end', value.end)
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

    async onButtonPress() {
        const {writeEditModelAction} = this.props;

        const originalModel = this.props.editModel.form.originModel;
        const editModelType = this.props.editModel.form.editModelType;

        const {objectId, restaurant, uniqueId} = originalModel;

        const displayName = this.props.editModel.form.fields.displayName;

        const want = this.props.editModel.form.fields.eventWhat;
        const start = this.state.value.start;
        const end = this.state.value.end;


        this.setState({alert: null});

        this.props.actions.writeModelRequest();
        let haveError = false;
        const _object = {
            objectSchemaName: PARSE_EVENTS,
            editModelType,
            model: {
                objectId,
                uniqueId,
                restaurant,
                displayName,
                want,
                start,
                end,
            },
        }
        try {
            // await Promise.race([writeEditModelAction(_object), timeout(15000)]);
        } catch (e) {
            this.setState({alert: {type: 'error', message: e.message}})
            haveError = true;
            const message = e.message || e;
            if (message !== 'Timed out' && message !== 'Canceled by user') {
                alert(message);
                // console.warn(e);
            }
        } finally {
            if (!haveError) {
                this.setState({alert: {type: 'success', message: "Saved successfully!"}})
                this.props.actions.writeModelSuccess();
            }
        }
    }


    renderContent() {
        const editModelType = this.props.editModel.form.editModelType;
        const formTitle = (editModelType === MODEL_FORM_TYPE_NEW) ? "Add a Event" : "Edit the Event";

        return (
            <Container>
                <F8Header title={formTitle} {...this.props}/>
                <Content>

                    <View style={styles.inputs}>
                        <EventForm
                            form={this.props.editModel.form}
                            value={this.state.value}
                            onChange={this.onChange.bind(this)}/>
                    </View>

                    <FormButton
                        isDisabled={!this.props.editModel.form.isValid || this.props.editModel.form.isFetching}
                        onPress={this.onButtonPress.bind(this)}
                        buttonText={"Save"}/>

                    {
                        !!this.state.alert &&
                        <F8MessageBar {...this.state.alert}/>
                    }

                </Content>
            </Container>
        )
    }

}


import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import * as editModelActions from '../../../reducers/editModel/editModelActions'

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(editModelActions, dispatch),
        writeEditModelAction: (object) => dispatch(writeRealmObject(object))
    }
}

function select(store) {
    return {
        editModel: store.editModel,
        location: store.location,
    };
}

module.exports = connect(select, mapDispatchToProps)(IEAEditEvent)
