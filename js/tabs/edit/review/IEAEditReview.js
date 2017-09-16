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


/**
 * The FormButton will change it's text between the 4 states as necessary
 */
const FormButton = require('FormButton')
/**
 *  The ReviewForm does the heavy lifting of displaying the fields for
 * textinput and displays the error messages
 */
const ReviewForm = require('./ReviewForm')

/**
 * The necessary React components
 */
import React, {Component} from 'react'
import
{
    TouchableOpacity,
    StyleSheet,
    Text,
    View,
    Dimensions
} from 'react-native'


const F8StarIcon = require('F8StarIcon')
const F8SVGButton = require('F8SVGButton')
const F8MessageBar = require('F8MessageBar')

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

/**
 * The states were interested in
 */
const {
    PARSE_REVIEWS,
    MENU_ITEM_ADD_OR_EDIT_REVIEW,
    // Sections
    SECTION_PHOTOS_BROWSER_FOR_REVIEW,
    // Model Form Type
    MODEL_FORM_TYPE_NEW,
    MODEL_FORM_TYPE_EDIT,
} = require('../../../lib/constants').default

import styles from '../editStyles'

class IEAEditReview extends Component {
    static navigationOptions = ({navigation}) => ({
        header: null,
    });

    constructor(props) {
        super(props)

        const {params} = this.props.navigation.state;
        const model = params.model;
        const modelType = params.modelType;

        this.state = {
            currentRate: model.rate,
            value: {
                reviewRating: props.editModel.form.fields.reviewRating,
                reviewBody: props.editModel.form.fields.reviewBody
            },
            alert: null
        }

        props.actions.toggleEditModelType(MENU_ITEM_ADD_OR_EDIT_REVIEW, model, modelType);
        props.actions.onEditModelFormFieldChange('reviewRating', model.rate, true)
        props.actions.onEditModelFormFieldChange('reviewBody', model.body, true)
    }

    /**
     * ### componentWillReceiveProps
     * As the properties are validated they will be set here.
     */
    componentWillReceiveProps(nextProps) {
        this.setState({
            value: {
                reviewRating: nextProps.editModel.form.fields.reviewRating,
                reviewBody: nextProps.editModel.form.fields.reviewBody
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
        if (value.reviewBody !== '') {
            this.props.actions.onEditModelFormFieldChange('reviewBody', value.reviewBody)
        }
        this.setState(
            {value}
        )
    }

    onStarButtonPress(tag) {
        this.setState({currentRate: tag})

        this.props.actions.onEditModelFormFieldChange('reviewRating', tag)
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
        const {dispatch} = this.props;

        const originalModel = this.props.editModel.form.originModel;
        const editModelType = this.props.editModel.form.editModelType;

        const {
            objectId, uniqueId,
            // Attributes
            reviewType,
            // Pointer
            user,
            // Relation
            restaurant,
            event,
            recipe,
        } = originalModel;

        const rate = this.state.currentRate;
        const body = this.props.editModel.form.fields.reviewBody;

        this.setState({alert: null});

        this.props.actions.writeModelRequest();
        let haveError = false;
        try {
            await Promise.race([
                dispatch(writeRealmObject(
                    PARSE_REVIEWS,
                    editModelType,
                    {
                        objectId,
                        uniqueId,
                        // Attributes
                        rate,
                        body,
                        reviewType,
                        // Pointer
                        user,
                        // Relation
                        restaurant,
                        event,
                        recipe,
                    }
                    )
                ),
                timeout(15000),
            ]);
        } catch (e) {
            this.setState({alert: {type: 'error', message: e.message}})
            haveError = true;
            const message = e.message || e;
            if (message !== 'Timed out' && message !== 'Canceled by user') {
            }
        } finally {
            if (!haveError) {
                this.setState({alert: {type: 'success', message: "Saved successfully!"}})
                this.props.actions.writeModelSuccess();
            }
        }
    }


    renderTopRatingButtons() {
        const starButtons = [1, 2, 3, 4, 5].map((t, index) => {
            // (132-{24*5||120}){12||(3*4)},{24,24}
            return (
                <TouchableOpacity
                    style={{
                        width: 48,
                        height: 48,
                        backgroundColor: 'transparent',
                        // backgroundColor: 'blue',
                        position: 'absolute',
                        left: (48 + 6) * index,
                        top: 0
                    }}
                    key={index}
                    onPress={() => {
                        this.onStarButtonPress(t)
                    }}>
                    <View style={{flex: 1}}/>
                </TouchableOpacity>
            )
        })

        return (
            <View style={{
                width: 264,
                height: 48,
                marginVertical: 12,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <F8StarIcon width={264} height={48} rate={this.state.currentRate}/>
                {starButtons}
            </View>
        )
    }


    renderContent() {
        const editModelType = this.props.editModel.form.editModelType;

        const leftItem = {
            icon: require('../../../common/img/back_white.png'),
            onPress: () => {
                if (this.props.onBackHook) this.props.onBackHook()
                goBackPage(this.props)
            }
        }

        const formTitle = (editModelType === MODEL_FORM_TYPE_NEW) ? "Add a Review" : "Edit the Review";

        return (
            <View style={{flex: 1, backgroundColor: F8Colors.controllerViewColor}}>
                <F8Header
                    style={{backgroundColor: F8Colors.primaryColor}}
                    foreground='dark'
                    leftItem={leftItem}
                    title={formTitle}/>

                <View style={{alignItems: 'center'}}>
                    {this.renderTopRatingButtons()}
                </View>

                <View>
                    <View style={styles.inputs}>
                        <ReviewForm
                            form={this.props.editModel.form}
                            value={this.state.value}
                            onChange={this.onChange.bind(this)}/>
                    </View>

                    <FormButton
                        isDisabled={!this.props.editModel.form.isValid || this.props.editModel.form.isFetching}
                        onPress={this.onButtonPress.bind(this)}
                        buttonText={"Post"}/>

                    {
                        !!this.state.alert &&
                        <F8MessageBar {...this.state.alert}/>
                    }


                </View>

            </View>
        )
    }

}

IEAEditReview.navigatorStyle = {
    navBarHidden: true,
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

module.exports = connect(select, mapDispatchToProps)(IEAEditReview)
