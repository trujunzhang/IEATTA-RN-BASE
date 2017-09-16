/**
 * # authInitialState.js
 *
 * This class is a Immutable object
 * Working *successfully* with Redux, requires
 * state that is immutable.
 * In my opinion, that can not be by convention
 * By using Immutable, it's enforced.  Just saying....
 *
 */
'use strict'
/**
 * ## Import
 */
const {Record, List} = require('immutable')
const {
    MENU_ITEM_ADD_OR_EDIT_RESTAURANT,
    // Model Form Type
    MODEL_FORM_TYPE_NEW,
    MODEL_FORM_TYPE_EDIT,
} = require('../../lib/constants').default

/**
 * ## Form
 * This Record contains the state of the form and the
 * fields it contains.
 */
const Form = Record({
    state: MENU_ITEM_ADD_OR_EDIT_RESTAURANT,
    editModelType: MODEL_FORM_TYPE_NEW,
    originModel: {},
    disabled: false,
    error: null,
    isValid: false,
    isFetching: false,
    fields: new (Record({
        displayName: '',
        displayNameHasError: false,
        displayNameErrorMsg: '',
        eventWhat: '',
        eventWhatHasError: false,
        eventWhatErrorMsg: '',
        start: new Date(),
        end: new Date(),
        price: '',
        priceHasError: false,
        priceErrorMsg: '',
        // The field 'reviewRating' only used for checking the form validate.
        reviewRating: 0,
        reviewBody: '',
        reviewBodyHasError: false,
        reviewBodyErrorMsg: '',
    }))()
})

/**
 * ## InitialState
 * The form is set
 */
let InitialState = Record({
    form: new Form(),
    takenPhotos: new List(),
})
export default InitialState

