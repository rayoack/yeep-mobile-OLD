import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { CardsList, Header } from '../../../Components'

export default class HostScheduleScreen extends Component {
    render() {
        return (
            <>
                <Header navigation={this.props.navigation}/>

                <View>
                    <Text> Host Schedule </Text>
                </View>
            </>
        )
    }
}
