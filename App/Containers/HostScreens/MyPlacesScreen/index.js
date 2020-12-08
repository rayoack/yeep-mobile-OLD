import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { CardsList, Header } from '../../../Components'

export default class MyPlacesScreen extends Component {
    render() {
        return (
            <>
                <Header navigation={this.props.navigation}/>

                <View>
                    <Text> My Places </Text>
                </View>
            </>
        )
    }
}
