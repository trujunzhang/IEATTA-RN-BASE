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

const F8Header = require('F8Header')
const F8MessageBar = require('F8MessageBar')

const F8PhotoHorizonSectionView = require('F8PhotoHorizonSectionView')

/**
 * The FormButton will change it's text between the 4 states as necessary
 */
const FormButton = require('FormButton')
/**
 *  The RestaurantForm does the heavy lifting of displaying the fields for
 * textinput and displays the error messages
 */
const RestaurantForm = require('./RestaurantForm')


/**
 * The states were interested in
 */
const {
    PARSE_RESTAURANTS,
    MENU_ITEM_ADD_OR_EDIT_RESTAURANT,
    // Sections
    SECTION_PHOTOS_BROWSER_FOR_RESTAURANT,
    // Model Form Type
    MODEL_FORM_TYPE_NEW,
    MODEL_FORM_TYPE_EDIT,
} = require('../../../lib/constants').default

const {goBackPage} = require('../../../tabs/filter/navigatorApp')

const {
    queryNearRestaurant,
    writeRealmObject,
    timeout
} = require('../../../actions')

import {Container, Content} from 'native-base'
import styles from '../editStyles'

class IEAEditRestaurant extends Component {

    static navigationOptions = ({navigation}) => ({
        header: null,
    });

    constructor(props) {
        super(props)

        const {params} = this.props.navigation.state;
        const model = params.model;
        const modelType = params.modelType;

        debugger

        this.state = {
            value: {
                displayName: props.editModel.form.fields.displayName,
            },
            alert: null
        }
        props.actions.toggleEditModelType(MENU_ITEM_ADD_OR_EDIT_RESTAURANT, model, modelType);
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


    async onButtonPress() {
        const {writeEditModelAction, searchRestaurants} = this.props;

        const originalModel = this.props.editModel.form.originModel;
        const editModelType = this.props.editModel.form.editModelType;

        const {objectId, uniqueId} = originalModel;
        const displayName = this.props.editModel.form.fields.displayName;

        const lastPosition = this.props.location.position;

        this.setState({alert: null});
        if (!lastPosition) {
            this.setState({alert: {type: 'error', message: 'Not enable GPS location!'}})
            return
        }

        this.props.actions.writeModelRequest();
        let haveError = false;
        const _object = {
            objectSchemaName: PARSE_RESTAURANTS,
            editModelType,
            model: {
                objectId,
                uniqueId,
                displayName
            },
            lastPosition
        }

        try {
            await Promise.race([writeEditModelAction(_object), timeout(15000)]);
        } catch (e) {
            this.setState({alert: {type: 'error', message: e.message}})
            haveError = true;
        } finally {
            if (!haveError) {
                this.setState({alert: {type: 'success', message: "Saved successfully!"}})
                this.props.actions.writeModelSuccess();

                // Finally, update the nearby restaurants.
                searchRestaurants({lastPosition})
            }
        }
    }


    render() {
        const editModelType = this.props.editModel.form.editModelType;
        const formTitle = (editModelType === MODEL_FORM_TYPE_NEW) ? "Add a Restaurant" : "Edit the Restaurant";

        return (
            <Container>
                <F8Header title={formTitle} {...this.props}/>
                <Content>
                    <View style={{flexDirection: 'column'}}>
                        <View style={styles.inputs}>
                            <RestaurantForm
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
                    </View>

                    {
                        editModelType === MODEL_FORM_TYPE_EDIT &&
                        <View style={{flexDirection: 'row'}}>
                            <F8PhotoHorizonSectionView
                                forItem={this.props.model}
                                sectionType={SECTION_PHOTOS_BROWSER_FOR_RESTAURANT}
                                {...this.props}/>
                        </View>
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
        writeEditModelAction: (object) => dispatch(writeRealmObject(object)),
        searchRestaurants: (object) => dispatch(queryNearRestaurant(object))
    }
}

function select(store) {
    return {
        editModel: store.editModel,
        location: store.location,
    };
}

module.exports = connect(select, mapDispatchToProps)(IEAEditRestaurant)
