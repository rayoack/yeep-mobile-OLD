import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'

import { Creators as ChatRoomsActions } from '../../../Stores/reducers/chatRoomsReducer'
import { translate } from '../../../Locales'
import { ChatList } from '../../../Components'

import {
    Container,
    MessagesList,
    TitleContainer,
    TitleText
} from './styles'

class ChatListScreen extends Component {
    constructor() {
        super();
        this.state = {
        };
    }

    render() {
        const { chatRooms, chatRoomsLoading } = this.props

        console.log({chatRoomsLoading})
        return (
            <Container>
                <TitleContainer>
                    <TitleText>{translate('chatListScreenTitle')}</TitleText>
                </TitleContainer>
                <ChatList
                    data={chatRooms}
                    loading={chatRoomsLoading}
                    onPress={() => null}
                    onRefresh={() => null}
                    refreshing={false}
                />
            </Container>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
    chatRooms: state.chatRoomsReducer.chatRooms,
    chatRoomsLoading: state.chatRoomsReducer.chatRoomsLoading
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, { ...ChatRoomsActions })(ChatListScreen)