const _ = require('underscore')
const md5 = require('blueimp-md5')
import moment from 'moment'

const Recipes = {
    config: {}
}

Recipes.getUpdatedAtFormat = function (recipe) {
    const start = recipe.updatedAt;

    //for example: "Saturday, 1 Jul, 12:00 am"
    const day = moment(start).format('MM/DD/YYYY')

    return day;
}


export default Recipes;
