import {
    Dimensions
} from 'react-native'

const {isImmutable, Map, List, Stack} = require('immutable')

/**
 * The states were interested in
 */
const {
    HEADER_SVG_BUTTON_TAKE_PHOTO,
    HEADER_SVG_BUTTON_EDIT,
    HEADER_SVG_BUTTON_WRITE_REVIEW,
    HEADER_SVG_BUTTON_ADD_EVENT_FOR_RESTAURANT,
    HEADER_SVG_BUTTON_ADD_USER_FOR_EVENT,
} = require('../lib/constants').default


// see: http://stackoverflow.com/questions/1909441/jquery-keyup-delay
const delay = (function () {
    let timer = 0;
    return function (callback, ms) {
        clearTimeout(timer);
        timer = setTimeout(callback, ms);
    };
})();

export function convertToObject(source: Any) {
    if (isImmutable(source)) {
        return source.toJS()
    }
    return source
}

export function delayEvent(callback, ms) {
    delay(() => {
        callback();
    }, ms);
}

export function getSvgButtonItem(type) {
    switch (type) {
        case HEADER_SVG_BUTTON_TAKE_PHOTO:
            return {
                title: 'Add Photo',
                icon: "M19 20H5a3 3 0 0 1-3-3V9a3 3 0 0 1 3-3h2.184A2.99 2.99 0 0 1 10 4h4a2.99 2.99 0 0 1 2.816 2H19a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3zM12.005 8.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9zM13 14v1a1 1 0 0 1-2 0v-1h-1a1 1 0 0 1 0-2h1v-1a1 1 0 0 1 2 0v1h1a1 1 0 0 1 0 2h-1z",
            }
        case HEADER_SVG_BUTTON_EDIT:
            return {
                title: 'Edit',
                icon: "M20.546 4.868l-1.414-1.414a1.994 1.994 0 0 0-1.415-.586c-.51 0-1.023.195-1.414.586L4.99 14.768l-2.122 6.364 6.364-2.122L20.546 7.697a2 2 0 0 0 0-2.83zM8.152 17.262l-2.12.707.706-2.123 8.858-8.86 1.414 1.416-8.858 8.858z",
            }
        case HEADER_SVG_BUTTON_WRITE_REVIEW:
            return {
                title: 'Write Review',
                icon: "M12 1.5l2.61 6.727 6.89.53-5.278 4.688 1.65 7.055L12 16.67 6.13 20.5l1.648-7.055L2.5 8.757l6.89-.53L12 1.5z"
            }
        case HEADER_SVG_BUTTON_ADD_USER_FOR_EVENT:
            return {
                title: 'Add User',
                icon: "M12 1.5l2.61 6.727 6.89.53-5.278 4.688 1.65 7.055L12 16.67 6.13 20.5l1.648-7.055L2.5 8.757l6.89-.53L12 1.5z"
            }
        case HEADER_SVG_BUTTON_ADD_EVENT_FOR_RESTAURANT:
            return {
                title: 'Add Event',
                icon: "M18 21H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3 1 1 0 0 1 2 0h8a1 1 0 0 1 2 0 3 3 0 0 1 3 3v12a3 3 0 0 1-3 3zm1-13H5v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1V8zm-5.634 7.723L12 18l-1.366-2.277a3.5 3.5 0 1 1 2.732 0zM12 11.25a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5z"
            }
    }
}

export function getSizeFullWidth(height) {
    return {
        width: Dimensions.get('window').width,
        height: height || Dimensions.get('window').height
    }
}

export function getScreenWidth(margin = 0) {
    return {
        width: Dimensions.get('window').width - margin,
    }
}
