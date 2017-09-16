/**
 * # UserForm.js
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


class UserForm extends Component {
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
            label: I18n.t('editUser.displayName'),
            editable: !this.props.form.isFetching,
            hasError: this.props.form.fields.displayNameHasError,
            error: I18n.t(this.props.form.fields.displayNameErrorMsg)
        }

        const editUserForm = t.struct({
            displayName: t.String
        })
        options.fields['displayName'] = displayName
        options.fields['displayName'].placeholder = I18n.t('editUser.displayNamePlaceHolder')
        options.fields['displayName'].autoCapitalize = 'none'

        /**
         * ### Return
         * returns the Form component with the correct structures
         */
        return (
            <Form ref='form'
                  type={editUserForm}
                  options={options}
                  value={this.props.value}
                  onChange={this.props.onChange}
            />
        )
    }
}


UserForm.propTypes = {
    form: PropTypes.object,
    value: PropTypes.object,
    onChange: PropTypes.func
};


module.exports = UserForm;
