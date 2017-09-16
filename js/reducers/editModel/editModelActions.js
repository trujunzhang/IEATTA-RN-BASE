/**
 * # authActions.js
 *
 * All the request actions have 3 variations, the request, a success
 * and a failure. They all follow the pattern that the request will
 * set the ```isFetching``` to true and the whether it's successful or
 * fails, setting it back to false.
 *
 */
'use strict'


/**
 * ## Imports
 *
 * The actions supported
 */
const {
    ON_EDIT_MODEL_FORM_FIELD_CHANGE,
    EDIT_MODEL_TOGGLE_TYPE,
    WRITE_MODEL_REQUEST,
    WRITE_MODEL_SUCCESS,
    WRITE_MODEL_FAILURE,

    // Take photos
    TAKEN_PHOTOS_LIST_RESET,
    TAKEN_PHOTOS_LIST_ADD,
    TAKEN_PHOTOS_LIST_SAVED,
} = require('../../lib/constants').default


const _ = require('underscore')

/**
 * ## State actions
 * controls which form is displayed to the user
 */

export function toggleEditModelType(tag, model, editModelType) {
    return {
        type: EDIT_MODEL_TOGGLE_TYPE,
        payload: {tag, model, editModelType}
    }
}

/**
 * ## onAuthFormFieldChange
 * Set the payload so the reducer can work on it
 */
export function onEditModelFormFieldChange(field, value, ignoreValidation = false) {
    return {
        type: ON_EDIT_MODEL_FORM_FIELD_CHANGE,
        payload: {field: field, value: value, ignoreValidation: ignoreValidation}
    }
}

export function resetTakenPhotos() {
    return {
        type: TAKEN_PHOTOS_LIST_RESET
    }
}

/**
 * ## Login actions
 */
export function writeModelRequest() {
    return {
        type: WRITE_MODEL_REQUEST
    }
}

export function writeModelSuccess() {
    return {
        type: WRITE_MODEL_SUCCESS
    }
}

export function writeModelFailure(error) {
    return {
        type: WRITE_MODEL_FAILURE,
        payload: error
    }
}
