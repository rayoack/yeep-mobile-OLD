import React, { Component } from 'react'
import { View, Text } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import io from 'socket.io-client'
import BaseURL from '../Config/BaseURL'
import { Creators as ChatRoomsActions } from '../Stores/reducers/chatRoomsReducer'

// let socket;

class SocketManager extends Component {
    constructor() {
        super();
        this.state = {
        };

        // socket = io.connect(BaseURL.api,
        //     {
        //         forceNode: true,
        //         query: {
        //             user_id: user.id
        //         }
        //     }
        // );
        this.socket = {}
    }

    init = () => {
        if (this.props.user == null) {
          this.props.cleanChatRooms()
          return null
        }

        this.socket = io.connect(BaseURL.api,
            {
                forceNode: true,
                query: {
                    user_id: this.props.user.id
                }
            }
        );

        this.props.getChatRooms(1)
        this.monitoringSocket()
        return null
    }

    componentWillUnmount = () => {
        if (this.timelineRoom) {
            this.socket.subscriptions.remove(this.timelineRoom)
        }
    }

    monitoringSocket = () => {
        this.socket.on('newMessageToRoom', newMessage => {
            console.log('newMessageToRoom', newMessage)

            let chatRoomsCopy = [...this.props.chatRooms]

            let updatedchatRooms = chatRoomsCopy.map(chatRoom => {
                if(chatRoom.id == newMessage.id) {
                    chatRoom.read = newMessage.last_message_target_read
                    chatRoom.last_message_target_id = newMessage.last_message_target_read
                    chatRoom.updatedAt = newMessage.updatedAt
                }

                return chatRoom
            })

            this.props.setChatRooms(updatedchatRooms)
        });

        this.socket.on('newReserve', newReserve => {
            // ALTERAR DEVERÁ SER UMA NOVA ROOM PARA HOST
            console.log({newReserve})
        })

        this.socket.on('notification', notification => {
            console.log({notification})
        });
    }
    
    componentWillUnmount = () => {
        if (this.socket) {
            this.socket.off('newMessageToRoom')
            this.socket.off('newReserve')
            this.socket.off('notification')
        }
    }

    render() {
        return this.init()
    }
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
    chatRooms: state.chatRoomsReducer.chatRooms
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, { ...ChatRoomsActions })(SocketManager)
