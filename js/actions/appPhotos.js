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

const {getLocalImagePath} = require('../parse/fsApi')

/**
 * The states were interested in
 */
const {
    PHOTO_BROWSER_OPEN,
    PHOTO_BROWSER_CLOSE,
    PARSE_ORIGINAL_IMAGES,
    PARSE_THUMBNAIL_IMAGES
} = require('../lib/constants').default

function closePhotosBrowser(): ThunkAction {
    return {
        type: PHOTO_BROWSER_CLOSE,
    };
}
function openPhotosBrowser(photos: Array, initialIndex: Int = 0): ThunkAction {
    let media = photos.results.map((item, index) => {
        return {
            photo: `file://${getLocalImagePath(item.objectId, PARSE_ORIGINAL_IMAGES)}`,
            // caption: 'Grotto of the Madonna',
        }
    })

    return {
        type: PHOTO_BROWSER_OPEN,
        payload: {
            media: media,
            initialIndex: initialIndex
        }
    };
}


export default {openPhotosBrowser, closePhotosBrowser}
