const _ = require('underscore')
const md5 = require('blueimp-md5')
import moment from 'moment'


const {
    PARSE_RESTAURANTS,
    PARSE_USERS,
    PARSE_RECORDS,
    PARSE_EVENTS,
    PARSE_RECIPES,
    PARSE_PHOTOS,
    PARSE_REVIEWS,
} = require('../lib/constants').default


const Reviews = {
    config: {
        // 6/11/2017
        dateFormat: 'DD/MM/YYYY'
    },
    segmentedTableTitles: [
        {
            title: "Restaurant",
            tag: PARSE_RESTAURANTS,
        },
        {
            title: "Event",
            tag: PARSE_EVENTS,
        },
        {
            title: "Recipe",
            tag: PARSE_RECIPES,
        }
    ]
}

Reviews.getHtmlBody = function (review) {
    let html = review.body;
    if (html) {
        html = '<p>' + html.replace('\n' + '\n', '</p><p>') + '</p>';
    }
    const htmlBody = {__html: html};

    return htmlBody;
}

Reviews.toDateString = function (date) {
    return moment(date).format(Reviews.config.dateFormat)
}

Reviews.currentRating = function (array) {
    let sum = 0

    for (let i = 0; i < array.length; i++) {
        sum = array[i].get('rate')
    }

    let avg = (sum / array.length)
    if (avg < 1 && avg > 0) {
        return 1
    }

    return avg >> 0;
}


Reviews.checkCanEditReview = function ({review, currentUser}) {
    const user = review.user||{};
    if (!!currentUser.uniqueId && !!user.uniqueId) {
        if (user.uniqueId === currentUser.uniqueId) {
            return true;
        }
    }

    return false;
}


export default Reviews;
