import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'

import { Creators as ChatRoomsActions } from '../../../Stores/reducers/chatRoomsReducer'
import { translate } from '../../../Locales'
import { ChatList } from '../../../Components'

import {
    Container,
    TitleContainer,
    TitleText,
    ChatListContainer
} from './styles'

class ChatListScreen extends Component {
    constructor() {
        super();
        this.state = {
        };
    }

    refreshChatList = () => {
        return this.props.getChatRooms(1)
    }

    navigateToChatRoom = async (room) => {
        this.props.navigation.push('RoomChat', {
          room: room
        })
    }

    render() {
        const { chatRooms, chatRoomsLoading } = this.props

        console.log({chatRoomsLoading})
        return (
            <Container>
                <TitleContainer>
                    <TitleText>{translate('chatListScreenTitle')}</TitleText>
                </TitleContainer>
                <ChatListContainer
                    contentContainerStyle={{ minHeight: '100%', paddingTop: 10 }}
                >
                    <ChatList
                        data={chatRooms}
                        loading={chatRoomsLoading}
                        onPress={this.navigateToChatRoom}
                        onRefresh={() => this.refreshChatList()}
                        refreshing={false}
                    />
                </ChatListContainer>
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