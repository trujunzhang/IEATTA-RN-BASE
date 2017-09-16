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
    LOGOUT,
    REGISTER,
    LOGIN,
    FORGOT_PASSWORD,

    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAILURE,

    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,

    ON_AUTH_FORM_FIELD_CHANGE,
    SIGNUP_REQUEST,
    SIGNUP_SUCCESS,
    SIGNUP_FAILURE,

    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILURE,

    SET_STATE

} = require('../../lib/constants').default


const _ = require('underscore')

/**
 * ## State actions
 * controls which form is displayed to the user
 * as in login, register, logout or reset password
 */

export function logoutState() {
    return {
        type: LOGOUT
    }
}

export function registerState() {
    return {
        type: REGISTER
    }
}

export function loginState() {
    return {
        type: LOGIN
    }
}

export function forgotPasswordState() {
    return {
        type: FORGOT_PASSWORD
    }
}

/**
 * ## Logout actions
 */
export function logoutRequest() {
    return {
        type: LOGOUT_REQUEST
    }
}

export function logoutSuccess() {
    return {
        type: LOGOUT_SUCCESS
    }
}

export function logoutFailure(error) {
    return {
        type: LOGOUT_FAILURE,
        payload: error
    }
}

/**
 * ## onAuthFormFieldChange
 * Set the payload so the reducer can work on it
 */
export function onAuthFormFieldChange(field, value) {
    return {
        type: ON_AUTH_FORM_FIELD_CHANGE,
        payload: {field: field, value: value}
    }
}

/**
 * ## Signup actions
 */
export function signupRequest() {
    return {
        type: SIGNUP_REQUEST
    }
}

export function signupSuccess(json) {
    return {
        type: SIGNUP_SUCCESS,
        payload: json
    }
}

export function signupFailure(error) {
    return {
        type: SIGNUP_FAILURE,
        payload: error
    }
}


/**
 * ## Login actions
 */
export function resetAuthorForm() {
    return {
        type: SET_STATE
    }
}

/**
 * ## Login actions
 */
export function loginRequest() {
    return {
        type: LOGIN_REQUEST
    }
}

export function loginSuccess() {
    return {
        type: LOGIN_SUCCESS
    }
}

export function loginFailure(error) {
    return {
        type: LOGIN_FAILURE,
        payload: error
    }
}

/**
 * ## ResetPassword actions
 */
export function resetPasswordRequest() {
    return {
        type: RESET_PASSWORD_REQUEST
    }
}

export function resetPasswordSuccess() {
    return {
        type: RESET_PASSWORD_SUCCESS
    }
}

export function resetPasswordFailure(error) {
    return {
        type: RESET_PASSWORD_FAILURE,
        payload: error
    }
}
