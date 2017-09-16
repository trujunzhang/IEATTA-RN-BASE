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

jest.dontMock('../events')
const Events = require('../events').default

import moment from 'moment'

describe('events functions', () => {

    // it('format event date for start and end.', () => {
    //     const item = {
    //         "start": "2017-06-28T10:30:57.566Z",
    //         "end": "2017-06-28T11:30:57.566Z",
    //     }
    //
    //     expect(
    //         Events.getDateInfo(item)
    //     ).toEqual({
    //         "startFormat": "Wednesday, 28 Jun, 6:30 pm",
    //         "endFormat": "Wednesday, 28 Jun, 7:30 pm"
    //     })
    // })


    it('update event date.', () => {
        const item = {
            "time": moment("2017-06-28T10:30:57.566Z").toDate(),
            "date": moment("2017-06-28T11:30:57.566Z").toDate(),
        }

        // expect(
        //     Events.updateDate(item.time, {'hour': 4, 'minute': 30}, 'time')
        // ).toEqual(
        //     moment("2017-06-27T20:30:57.566Z").toDate()
        // )
        expect(
            Events.updateDate(item.date, {'year': 2111, 'month': 4, 'day': 4}, 'date')
        ).toEqual(
            moment("2111-05-04T11:30:57.566Z").toDate()
        )
    })
});
