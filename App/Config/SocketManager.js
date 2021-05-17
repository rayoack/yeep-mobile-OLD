import React, { Component } from 'react'
import { View, Text } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import io from 'socket.io-client'
import _ from 'lodash'
import BaseURL from '../Config/BaseURL'
import { Creators as ChatRoomsActions } from '../Stores/reducers/chatRoomsReducer'

export let socket = {};

class SocketManager extends Component {
    constructor() {
        super();
        this.state = {
        };

        // this.socket = {}
    }

    init = () => {
        if (!this.props.user) {
          this.props.cleanChatRooms()
          return null
        }

        if(socket.connected && !socket.disconnected) return null
        
        socket = io.connect(BaseURL.api,
            {
                forceNode: true,
                query: {
                    user_id: this.props.user.id
                }
            }
        );
            
        console.log({socket})
        this.props.getChatRooms(1)
        this.monitoringSocket()
        return null
    }

    monitoringSocket = () => {
        socket.on('newMessageToRoom', newMessage => {

            let chatRoomsCopy = [...this.props.chatRooms]

            let updatedchatRooms = chatRoomsCopy.map(chatRoom => {
                if(chatRoom.id == newMessage.id) {
                    chatRoom.read = newMessage.last_message_target_read
                    chatRoom.last_message_target_id = newMessage.last_message_target_read
                    chatRoom.updatedAt = newMessage.updatedAt
                }

                return chatRoom
            })

            let orderedChatRoom = _.orderBy(updatedchatRooms, ['updatedAt'],['desc'])

            this.props.setChatRooms(orderedChatRoom)
        });

        socket.on('newReserve', newReserve => {
            // ALTERAR DEVERÁ SER UMA NOVA ROOM PARA HOST
            console.log({newReserve})
        })

        socket.on('notification', notification => {
            console.log({notification})
        });
    }
    
    componentWillUnmount = () => {
        if (socket) {
            socket.off('newMessageToRoom')
            socket.off('newReserve')
            socket.off('notification')
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
