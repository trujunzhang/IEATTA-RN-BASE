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
 * THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE
 *
 * @flow
 */

'use strict'

import type {Action, ThunkAction} from './types'

const AsyncParse = require('../parse/sync').default

/**
 * The states were interested in
 */
const {
    SYNC_TASKS_BEGIN,
    SYNC_TASKS_END
} = require('../lib/constants').default

async function _syncBetweenParseAndRealm(): Promise<Array<Action>> {
    await new AsyncParse().startScheduledTask()

    const action = {
        type: SYNC_TASKS_END,
    }

    return Promise.all([
        Promise.resolve(action)
    ])
}

function syncBetweenParseAndRealm(): ThunkAction {
    return (dispatch) => {
        const action = _syncBetweenParseAndRealm()

        // Loading friends schedules shouldn't block the login process
        action.then(
            ([result]) => {
                dispatch(result)
            }
        )
        return action
    }
}

export function startAsyncTask() {
    return {
        type: SYNC_TASKS_BEGIN
    }
}


export default {
    syncBetweenParseAndRealm,
    startAsyncTask,
}
