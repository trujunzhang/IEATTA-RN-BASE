/**
 * # authActions-test.js
 *
 * This test is for authActions
 *
 */
'use strict'

/**
 * ## Mocks
 *
 * We don't want to use the devices storage, nor actually call
 * the server
 *
 * Need to mock router so the "keys" are available (see src/__mocks__)
 */

/**
 * ## Mock Store
 *
 * The ```mockStore``` confirms the all the actions are dispatched and
 * in the correct order
 *
 */
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const middlewares = [thunk] // add your middlewares like `redux-thunk`
const mockStore = configureStore(middlewares)
/**
 * ## Class under test
 *
 */
const actions = require('../authActions')

/**
 * ## Imports
 *
 * actions under test
 */
const {
    SESSION_TOKEN_REQUEST,
    SESSION_TOKEN_SUCCESS,
    SESSION_TOKEN_FAILURE,

    DELETE_TOKEN_REQUEST,
    DELETE_TOKEN_SUCCESS,

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
    RESET_PASSWORD_FAILURE
} = require('../../../lib/constants').default

/**
 * ## Tests
 *
 * authActions
 */
describe('authActions', () => {
    /**
     * ### simple tests that prove the actions have the specific type
     */
    it('should set logoutState', () => {
        expect(actions.logoutState()).toEqual({type: LOGOUT})
    })

    it('should set registerState', () => {
        expect(actions.registerState()).toEqual({type: REGISTER})
    })

    it('should set loginState', () => {
        expect(actions.loginState()).toEqual({type: LOGIN})
    })

    it('should set forgotPasswordState', () => {
        expect(actions.forgotPasswordState()).toEqual({type: FORGOT_PASSWORD})
    })

    it('should set logoutRequest', () => {
        expect(actions.logoutRequest()).toEqual({type: LOGOUT_REQUEST})
    })

    it('should set logoutSuccess', () => {
        expect(actions.logoutSuccess()).toEqual({type: LOGOUT_SUCCESS})
    })

    it('should set logoutFailure', () => {
        let error = {error: 'test error'}
        expect(actions.logoutFailure(error)).toEqual({
            type:
            LOGOUT_FAILURE,
            payload: error
        })
    })

    it('should set signupRequest', () => {
        expect(actions.signupRequest()).toEqual({type: SIGNUP_REQUEST})
    })

    it('should set signupSuccess', () => {
        expect(actions.signupSuccess()).toEqual({type: SIGNUP_SUCCESS})
    })

    it('should set signupFailure', () => {
        let error = {error: 'thisistheerror'}
        expect(actions.signupFailure(error)).toEqual({
            type:
            SIGNUP_FAILURE,
            payload: error
        })
    })

    it('should set loginRequest', () => {
        expect(actions.loginRequest()).toEqual({type: LOGIN_REQUEST})
    })

    it('should set loginSuccess', () => {
        expect(actions.loginSuccess()).toEqual({type: LOGIN_SUCCESS})
    })

    it('should set loginFailure', () => {
        let error = {error: 'thisistheerror'}
        expect(actions.loginFailure(error)).toEqual({
            type: LOGIN_FAILURE,
            payload: error
        })
    })

    it('should set resetPasswordRequest', () => {
        expect(actions.resetPasswordRequest()).toEqual({type: RESET_PASSWORD_REQUEST})
    })

    it('should set resetPasswordSuccess', () => {
        expect(actions.resetPasswordSuccess()).toEqual({type: RESET_PASSWORD_SUCCESS})
    })

    it('should set resetPasswordFailure', () => {
        let error = {error: 'thisistheerror'}
        expect(actions.resetPasswordFailure(error)).toEqual({
            type:
            RESET_PASSWORD_FAILURE,
            payload: error
        })
    })

    it('should set onAuthFormFieldChange', () => {
        let field = 'field'
        let value = 'value'
        expect(actions.onAuthFormFieldChange(field, value)).toEqual({
            type: ON_AUTH_FORM_FIELD_CHANGE,
            payload: {field: field, value: value}
        })
    })


})
