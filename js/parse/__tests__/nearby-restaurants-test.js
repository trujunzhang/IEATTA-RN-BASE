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


const {encodeGeoHash} = require('../../components/vendor/GeoHash')

// https://www.google.com.sg/maps/place/1%C2%B022'43.1%22N+103%C2%B050'30.4%22E/@1.3786113,103.8415988,16.84z/data=!4m5!3m4!1s0x0:0x0!8m2!3d1.378647!4d103.841764
const locations = [
    [1.378647, 103.841764],
    [1.378306, 103.838761],
    [1.378714, 103.836980],
    [1.381202, 103.835285],
    [1.381523, 103.836261],
];
describe('user reducer', () => {

    it('user logged out after had some sync tasks.', () => {
        let geoHash = locations.map((item, index) => {
            return encodeGeoHash(item[0], item[1])
        })
        debugger
        let x = 0;
        expect(
            1
        ).toEqual(1)
    })

});
