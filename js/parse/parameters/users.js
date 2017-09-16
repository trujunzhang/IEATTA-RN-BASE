/**
 * Users Parameters:
 *
 */
export default class UsersParameters {
    constructor(query: Parse.Query) {
        this.query = query
    }

    addParameters(terms: Any) {

        this.query.notContainedIn('username', ['anonymous'])

        return this
    }

    end() {
        return this.query
    }

}


