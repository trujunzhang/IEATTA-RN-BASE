import React, {Component} from "react";
import {connect} from "react-redux";
import {
    Container,
    Header,
    Title,
    Content,
    Text,
    Button,
    Icon,
    Left,
    Right,
    Body
} from "native-base";

const DetailedRestaurantListView = require('./layout/DetailedRestaurantListView')

class IEADetailedRestaurant extends Component {
    static navigationOptions = ({navigation}) => ({
        header: null,
    });

    render() {
        const {restaurant} = this.props.navigation.state.params;

        return (
            <DetailedRestaurantListView
                {...this.props.navigation.state.params}
                {...this.props}
                forRestaurant={restaurant}
            />
        );
    }
}

export default IEADetailedRestaurant;
