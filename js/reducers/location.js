'use strict'

/**
 * The states were interested in
 */
const {
    REDUX_SAGA_LOCATION_ACTION_SET_POSITION,
    REDUX_SAGA_LOCATION_ACTION_SET_ERROR,
    REDUX_SAGA_LOCATION_ACTION_REQUEST,
} = require('../lib/constants').default

import type {Action} from '../actions/types';

type Location = {
    position: Object,
    error: Object,
    fetching: boolean
};

const initialState: Location = {
    position: null,
    error: null,
    fetching: false
};

function locationReducer(state = initialState, action: Action): Location {

    switch (action.type) {
        case REDUX_SAGA_LOCATION_ACTION_REQUEST: {
            return {
                ...state,
                fetching: true
            }
        }

        case REDUX_SAGA_LOCATION_ACTION_SET_POSITION: {
            const {position} = action.payload;
            return {
                ...state,
                position,
                error: null,
                fetching: false
            }
        }

        case REDUX_SAGA_LOCATION_ACTION_SET_ERROR : {
            const {error} = action.payload;

            debugger

            return {
                ...state,
                error: error,
                fetching: false
            }
        }
    }

    return state;
}

module.exports = locationReducer;
