
export default class RestaurantsParameters {
    constructor(query: Parse.Query) {
        this.query = query
    }

    addParameters(terms: Any) {

        return this
    }

    end() {
        return this.query
    }

}


