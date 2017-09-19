/**
 * # EventForm.js
 *
 * This class utilizes the ```tcomb-form-native``` library and just
 * sets up the options required for the 3 states of Login, namely
 * Login, Register or Reset Password
 *
 */
'use strict'
/**
 * ## Import
 *
 * React
 */
import React, {Component, PropTypes} from 'react'
import {
    Text,
    TouchableHighlight,
    View,
    Image,
    TextInput,
    StyleSheet,
    Dimensions
} from 'react-native'

/**
 * ### Translations
 */
const I18n = require('react-native-i18n')
import Translations from '../../../lib/Translations'

I18n.translations = Translations

/**
 *  The fantastic little form library
 */
const t = require('../../../components/vendor/tcomb-form-native')
let Form = t.form.Form

import DatePicker from 'react-native-datepicker'

import commonStyles from '../../../common/commonStyle'

function myCustomTemplate(locals) {
    const {stylesheet} = locals;
    let formGroupStyle = stylesheet.formGroup.normal;
    let controlLabelStyle = stylesheet.controlLabel.normal;

    const label = locals.label ? <Text style={controlLabelStyle}>{locals.label}</Text> : null;

    return (
        <View style={formGroupStyle}>
            {label}
            <View style={commonStyles.rowDirection}>
                <DatePicker
                    style={{height: 40, flex: 1}}
                    date={locals.value}
                    mode="datetime"
                    format="YYYY-MM-DD HH:mm"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    showIcon={false}
                    onDateChange={(datetime) => {
                        locals.onChange(new Date(datetime))
                    }}
                />
            </View>
        </View>
    )
}

class EventForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            startDateMode: 'date',
            endDateMode: 'date',
        }

    }

    /**
     * ## render
     *
     * setup all the fields using the props and default messages
     *
     */
    render() {
        let options = {
            fields: {}
        }

        let displayName = {
            label: I18n.t('editEvent.displayName'),
            editable: !this.props.form.isFetching,
            hasError: this.props.form.fields.displayNameHasError,
            error: I18n.t(this.props.form.fields.displayNameErrorMsg)
        }

        let eventWhat = {
            label: I18n.t('editEvent.eventWhat'),
            editable: !this.props.form.isFetching,
            hasError: this.props.form.fields.eventWhatHasError,
            error: I18n.t(this.props.form.fields.eventWhatErrorMsg),
            multiline: true,
            numberOfLines: 4,
            editStyle: {
                height: 120
            }
        }

        let start = {
            label: I18n.t('editEvent.start'),
            mode: this.state.startDateMode,
            onComponentPress: () => { // only for android
                this.setState({startDateMode: (this.state.startDateMode === "date" ? "time" : "date")})
            }
        }
        let end = {
            label: I18n.t('editEvent.end'),
            mode: this.state.endDateMode,
            onComponentPress: () => { // only for android
                this.setState({endDateMode: (this.state.endDateMode === "date" ? "time" : "date")})
            }
        }
        const editEventForm = t.struct({
            displayName: t.String,
            eventWhat: t.String,
            start: t.Date,
            end: t.Date
        })
        options.fields['displayName'] = displayName;
        options.fields['displayName'].placeholder = I18n.t('editEvent.displayNamePlaceHolder')
        options.fields['displayName'].autoCapitalize = 'none'
        options.fields['eventWhat'] = eventWhat;
        options.fields['eventWhat'].placeholder = I18n.t('editEvent.eventWhatPlaceHolder')
        options.fields['eventWhat'].autoCapitalize = 'none'
        options.fields['start'] = start;
        options.fields['start'].template = myCustomTemplate;
        options.fields['end'] = end;
        options.fields['end'].template = myCustomTemplate;

        /**
         * ### Return
         * returns the Form component with the correct structures
         */
        return (
            <Form ref='form'
                  type={editEventForm}
                  options={options}
                  value={this.props.value}
                  onChange={this.props.onChange}
            />
        )
    }
}

EventForm.propTypes = {
    form: PropTypes.object,
    value: PropTypes.object,
    onChange: PropTypes.func
};

module.exports = EventForm;
