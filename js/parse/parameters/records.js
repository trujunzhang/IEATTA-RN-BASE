const {ParseRecord, ParseUser} = require('../objects').default

export default class RecordsParameters {
    constructor(query: Parse.Query) {
        this.query = query.ascending("updatedAt")
    }

    addParameters(terms: Any) {

        if (!!terms.lastUpdatedAt) { // related posts
            // greaterThanOrEqualTo
            this.query.greaterThan('updatedAt', terms.lastUpdatedAt)
        }

        return this
    }

    end() {
        return this.query
    }

}


