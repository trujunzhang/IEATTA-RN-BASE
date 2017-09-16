/**
 * # Login.js
 *
 * This class is a little complicated as it handles multiple states.
 *
 */
'use strict'

const F8Colors = require('F8Colors')
const F8Header = require('F8Header')
const F8Button = require('F8Button')

const F8PhotoHorizonSectionView = require('F8PhotoHorizonSectionView')


/**
 * The FormButton will change it's text between the 4 states as necessary
 */
const FormButton = require('FormButton')
/**
 *  The RecipeForm does the heavy lifting of displaying the fields for
 * textinput and displays the error messages
 */
const RecipeForm = require('./RecipeForm')

import {TextInputMask} from 'react-native-masked-text';

/**
 * The necessary React components
 */
import React, {Component} from 'react'
import
{
    StyleSheet,
    ScrollView,
    Text,
    View,
    Dimensions,
    Platform
} from 'react-native'

const {
    writeRealmObject,
    timeout
} = require('../../../actions')


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
    PARSE_RECIPES,
    MENU_ITEM_ADD_OR_EDIT_RECIPE,
    // Sections
    SECTION_PHOTOS_BROWSER_FOR_RECIPE,
    // Model Form Type
    MODEL_FORM_TYPE_NEW,
    MODEL_FORM_TYPE_EDIT,
} = require('../../../lib/constants').default

import styles from '../editStyles'

class IEAEditRecipe extends Component {
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
                price: props.editModel.form.fields.price,
            },
            alert: null
        }

        props.actions.toggleEditModelType(MENU_ITEM_ADD_OR_EDIT_RECIPE, model, modelType);
        props.actions.onEditModelFormFieldChange('displayName', model.displayName || '', true)
        props.actions.onEditModelFormFieldChange('price', model.price || 0, true)
    }

    /**
     * ### componentWillReceiveProps
     * As the properties are validated they will be set here.
     */
    componentWillReceiveProps(nextProps) {
        this.setState({
            value: {
                displayName: nextProps.editModel.form.fields.displayName,
                price: nextProps.editModel.form.fields.price,
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

    async onButtonPress() {
        const {dispatch, model} = this.props;

        const originalModel = this.props.editModel.form.originModel;
        const editModelType = this.props.editModel.form.editModelType;

        const {objectId, uniqueId} = originalModel;

        const displayName = this.props.editModel.form.fields.displayName;
        const price = this.props.editModel.form.fields.price.replace('$', '').replace(',', '');

        this.props.actions.writeModelRequest();
        let haveError = false;
        try {
            await Promise.race([
                dispatch(writeRealmObject(
                    PARSE_RECIPES,
                    editModelType,
                    {
                        objectId,
                        uniqueId,
                        displayName,
                        price
                    })),
                timeout(15000),
            ]);
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


    onPriceChangeText(value) {
        if (value !== '') {
            this.props.actions.onEditModelFormFieldChange('price', value)
        }
        this.setState({
            value:
                Object.assign({}, this.state.value, {
                    price: value
                })
        })
    }

    renderContent() {
        const editModelType = this.props.editModel.form.editModelType;

        const leftItem = {
            icon: require('../../../common/img/back_white.png'),
            onPress: () => {
                goBackPage(this.props)
            }
        }

        const formTitle = (editModelType === MODEL_FORM_TYPE_NEW) ? "Add a Recipe" : "Edit the Recipe";

        return (
            <View style={{flex: 1, backgroundColor: F8Colors.controllerViewColor}}>
                <F8Header
                    style={{backgroundColor: F8Colors.primaryColor}}
                    foreground='dark'
                    leftItem={leftItem}
                    title={formTitle}/>
                <View>
                    <View style={styles.inputs}>
                        <RecipeForm
                            form={this.props.editModel.form}
                            value={this.state.value}
                            onChange={this.onChange.bind(this)}/>
                    </View>

                    <View style={styles.inputs}>

                        <Text style={
                            {
                                color: 'black',
                                fontSize: 14,
                                marginBottom: 7,
                                fontWeight: '500'
                            }
                        }>{'price'}</Text>
                        <TextInputMask
                            style={{
                                fontSize: 14,
                                paddingVertical: (Platform.OS === 'ios') ? 7 : 0,
                                paddingHorizontal: 7,
                                height: 36,
                                borderRadius: 4,
                                borderWidth: 1,
                                marginBottom: 5
                            }}
                            ref={'recipePriceText'}
                            type={'money'}
                            value={this.state.value.price}
                            options={{
                                unit: '$',
                                precision: 0,
                                separator: '.',
                                delimiter: ','
                            }}
                            onChangeText={this.onPriceChangeText.bind(this)}
                            placeholder="Enter price"
                        />

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


                <View style={{flexDirection: 'row'}}>
                    <F8PhotoHorizonSectionView
                        forItem={this.props.model}
                        sectionType={SECTION_PHOTOS_BROWSER_FOR_RECIPE}
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

module.exports = connect(select, mapDispatchToProps)(IEAEditRecipe)
