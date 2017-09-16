/**
 * Copyright 2016 Facebook, Inc.
 *
 * You are hereby granted a non-exclusive, worldwide, royalty-free license to
 * use, copy, modify, and distribute this software in source code or binary
 * form for use in connection with the web services and APIs provided by
 * Facebook.
 *
 * As with any software that integrates with the Facebook platform, your use
 * of this software is subject to the Facebook Developer Principles and
 * Policies [http://developers.facebook.com/policy/]. This copyright notice
 * shall be included in all copies or substantial portions of the software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE
 *
 * @flow
 */

'use strict';

/**
 * The states were interested in
 */
const {
    SYNC_TASKS_BEGIN,
    SYNC_TASKS_END,
} = require('../lib/constants').default


import type {Action} from '../actions/types';

export type Config = {
    isSyncTask: boolean;
};

const initialState: Config = {
    isSyncTask: false,
};

function config(state: Config = initialState, action: Action): Config {

    if (action.type === SYNC_TASKS_BEGIN) {
        const nextState = Object.assign({}, state, {
            isSyncTask: true
        })
        return nextState
    }

    if (action.type === SYNC_TASKS_END) {
        const nextState = Object.assign({}, state, {
            isSyncTask: false
        })
        return nextState
    }

    return state;
}

module.exports = config;
