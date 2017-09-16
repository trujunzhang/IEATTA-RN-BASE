/**
 * The components needed from React
 */
import React, {Component} from 'react'
import {
    TouchableOpacity,
    View,
    Image,
    StyleSheet,
    Dimensions,
    Platform
} from 'react-native'

import {Container, Header, Left, Item, Input, Icon, Button, Text} from 'native-base'

const F8SearchBar = require('F8SearchBar')

const PureListView = require('PureListView')

const RestaurantCell = require('../../home/layout/RestaurantCell')

const {queryNearRestaurant} = require('../../../actions')
const {delayEvent} = require('../../../lib/utils')

const {goBackPage} = require('../../../tabs/filter/navigatorApp')

/**
 * The states were interested in
 */
const {
    PARSE_ORIGINAL_IMAGES,
    PARSE_THUMBNAIL_IMAGES,
    SEARCH_NEAR_RESTAURANTS,
} = require('../../../lib/constants').default

class IEASearchRestaurants extends Component {
    static navigationOptions = ({navigation}) => ({
        header: null,
    });

    constructor(props) {
        super(props);

        this.state = {
            sections: {
                RESTAURANTS: []
            }
        }
    }

    componentWillReceiveProps(nextProps: Props) {
        this.setState({
            sections: {
                RESTAURANTS: nextProps.appModel.searchRestaurants
            }
        })
    }

    componentWillMount() {
        this.props.dispatch(queryNearRestaurant({}, SEARCH_NEAR_RESTAURANTS))
    }

    renderRow = (restaurant: Object,
                 sectionID: number | string,
                 rowID: number | string) => {
        return (<RestaurantCell key={restaurant.objectId} restaurant={restaurant} {...this.props}/>)
    }


    handleSearch(input) {
        const {dispatch} = this.props;

        delayEvent(function () {
            dispatch(queryNearRestaurant({search: input}, SEARCH_NEAR_RESTAURANTS))
        }, 700)
    }

    render() {
        return (
            <Container>
                <F8SearchBar
                    onBack={() => {
                        goBackPage(this.props)
                    }}
                    handleSearch={this.handleSearch.bind(this)}
                    placeholder={"Search Restaurants"}/>

                <PureListView
                    {...this.props}
                    haveParallaxView={false}
                    data={this.state.sections}
                    renderRow={this.renderRow.bind(this)}
                    renderFooter={this.renderFooter.bind(this)}
                />

            </Container>
        )
    }

    renderFooter() {
        return (<View style={{height: 60}}/>)
    }

}


const {connect} = require('react-redux')

function select(store) {
    return {
        appModel: store.appModel,
        currentUser: store.user,
    }
}

module.exports = connect(select)(IEASearchRestaurants)


