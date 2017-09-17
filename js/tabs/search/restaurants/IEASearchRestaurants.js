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


const F8Colors = require('F8Colors')
const F8SearchBar = require('F8SearchBar')

const RestaurantCell = require('../../home/layout/RestaurantCell')

const {queryNearRestaurant} = require('../../../actions')
const {delayEvent} = require('../../../lib/utils')

const {goBackPage, onCellItemPress} = require('../../../tabs/filter/navigatorApp')
import {Container, Header, Content, List, ListItem, Body} from 'native-base'

/**
 * The states were interested in
 */
const {
    SEARCH_NEAR_RESTAURANTS,
    MENU_DETAILED_RESTAURANT_PAGE,
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
        const {props, onPress} = this;
        const {sections} = this.state;
        const restaurants = sections.RESTAURANTS;
        return (
            <Container>
                <F8SearchBar
                    onBack={() => {
                        goBackPage(this.props)
                    }}
                    handleSearch={this.handleSearch.bind(this)}
                    placeholder={"Search Restaurants"}/>

                <List>
                    {
                        restaurants.map(function (restaurant) {
                            return (
                                <ListItem onPress={() => onPress(props, restaurant)}
                                          key={restaurant.objectId}
                                          style={{
                                              height: F8Colors.UserRowHeight,
                                          }}>

                                    <RestaurantCell key={restaurant.objectId} restaurant={restaurant} {...props}/>
                                </ListItem>
                            )
                        })
                    }
                </List>


            </Container>
        )
    }

    onPress(props, restaurant) {
        onCellItemPress(props,
            MENU_DETAILED_RESTAURANT_PAGE,
            {restaurant}
        )
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


