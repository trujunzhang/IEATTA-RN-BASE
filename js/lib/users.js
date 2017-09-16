const _ = require('underscore')
const md5 = require('blueimp-md5')

import moment from 'moment'

const Users = {

    /**
     * Sometimes, If the users run the 'IEATTA' app, but network is unavailability.
     * So give the users the 'anonymous' user firstly to let them can use the app.
     *
     * The uniqueId and the password is the same as '12345654321'.
     *
     * @type {{id: null, name: string, slug: string, email: string, loginType: string, uniqueId: string}}
     */
    anonymousUser: {
        id: null,
        username: 'anonymous',
        displayName: 'anonymous',
        email: '',
        loginType: 'email',
        listPhotoId: '',
        uniqueId: 'anonymous'
    },
    config: {
        dateFormat: 'DD/MM/YYYY'
    }
}

/**
 * @summary Check if a user is an admin
 * @param {Object|string} user - The user or their userId
 */
Users.isAdmin = function (user) {
    try {
        return !!user && !!user.isAdmin
    } catch (e) {
        return false // user not logged in
    }
}

Users.getAnonymousUser = function () {
    return Users.anonymousUser;
}

Users.toDateString = function (date) {
    return moment(date).format(Users.config.dateFormat)
}


export default Users;
