/**
 * The components needed from React
 */
import React, {Component} from 'react'
import {
    TouchableOpacity,
    View,
    Image,
    ScrollView,
    StyleSheet,
    StatusBar,
    Navigator,
    Dimensions,
    AppRegistry
} from 'react-native'

import {
    Button,
    Text,
    Container,
    List,
    ListItem,
    Content,
    Icon,
} from "native-base";

const styles = StyleSheet.create({
    drawer: {
        flex: 1,
        backgroundColor: 'white',
    },
    content: {
        flex: 1,
    },
    header: {
        padding: 20,
        justifyContent: 'flex-end',
    },
    name: {
        marginTop: 10,
        color: 'white',
        fontSize: 12,
    },
    loginPrompt: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingBottom: 10,
    },
    loginText: {
        fontSize: 12,
        color: F8Colors.lightText,
        textAlign: 'center',
        marginBottom: 10,
    },
});


export default class DrawBar extends React.Component {
    static navigationOptions = {
        header: null
    };

    render() {
        return (
            <Container>

                <List
                    dataArray={routes}
                    renderRow={data => {
                        return (
                            <ListItem
                                button
                                onPress={() => this.props.navigation.navigate(data)}
                            >
                                <Text>{data}</Text>
                            </ListItem>
                        );
                    }}
                />
            </Content>
            < /Container>
        );
    }
}
