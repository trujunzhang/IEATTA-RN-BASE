/**
 * # ReviewForm.js
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


class ReviewForm extends Component {

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

        let reviewBody = {
            label: I18n.t('editReview.reviewBody'),
            editable: !this.props.form.isFetching,
            hasError: this.props.form.fields.reviewBodyHasError,
            error: I18n.t(this.props.form.fields.reviewBodyErrorMsg),
            multiline: true,
            numberOfLines: 8,
            editStyle: {
                height: 300
            }
        }

        const editReviewForm = t.struct({
            reviewBody: t.String
        })
        options.fields['reviewBody'] = reviewBody
        options.fields['reviewBody'].placeholder = I18n.t('editReview.reviewBodyPlaceHolder')
        options.fields['reviewBody'].autoCapitalize = 'none'

        /**
         * ### Return
         * returns the Form component with the correct structures
         */
        return (
            <Form ref='form'
                  type={editReviewForm}
                  options={options}
                  value={this.props.value}
                  onChange={this.props.onChange}
            />
        )
    }
}


ReviewForm.propTypes = {
    form: PropTypes.object,
    value: PropTypes.object,
    onChange: PropTypes.func
};

module.exports = ReviewForm;
