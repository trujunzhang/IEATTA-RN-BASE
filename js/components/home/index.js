/**
 * The components needed from React
 */
import React, {Component} from 'react'
import {
    TouchableOpacity,
    View,
    Image,
    StyleSheet,
    Platform,
} from 'react-native'

const F8Colors = require('F8Colors')
import {connect} from "react-redux";
import DrawBar from "../DrawBar";
import {DrawerNavigator, NavigationActions} from "react-navigation";
import {
    Container,
    Header,
    Title,
    Subtitle,
    Content,
    Text,
    Button,
    Icon,
    Left,
    Body,
    Right
} from "native-base";

import {setIndex} from "../../actions/list";
import {openDrawer} from "../../actions/drawer";
import styles from "./styles";


const IEANearRestaurantScene = require('../../tabs/home/IEANearRestaurantScene')

class Home extends Component {
    static navigationOptions = {
        header: null
    };

    static propTypes = {
        name: React.PropTypes.string,
        setIndex: React.PropTypes.func,
        openDrawer: React.PropTypes.func
    };

    renderTopHeader() {
        return (
            <Header style={{backgroundColor: F8Colors.primaryColor}}>
                <Left style={{flex: 1}}>
                    <Button
                        transparent
                        onPress={() => DrawerNav.navigate("DrawerOpen")}>
                        <Icon active name="menu"/>
                    </Button>
                </Left>

                <Body style={{flex: 4}}>
                <Title style={{color: '#fff'}}>{"IEATTA"}</Title>
                {Platform.OS === 'ios' && <Subtitle style={{color: '#fff'}}>{"Eating Experience Tracker"}</Subtitle>}
                </Body>

                <Right/>
            </Header>
        )
    }

    render() {
        return (
            <Container style={styles.container}>
                {this.renderTopHeader()}

                <IEANearRestaurantScene {...this.props}/>
            </Container>
        );
    }
}

function bindAction(dispatch) {
    return {
        setIndex: index => dispatch(setIndex(index)),
        openDrawer: () => dispatch(openDrawer())
    };
}

const mapStateToProps = state => ({
    name: state.user.name,
});

const HomeSwagger = connect(mapStateToProps, bindAction)(Home);
const DrawNav = DrawerNavigator(
    {
        Home: {screen: HomeSwagger},
    },
    {
        contentComponent: props => <DrawBar {...props} />
    }
);

const DrawerNav = null;
DrawNav.navigationOptions = ({navigation}) => {
    (DrawerNav) = navigation;
    return {
        header: null
    };
};

export default DrawNav;
