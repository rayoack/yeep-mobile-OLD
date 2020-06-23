import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import io from 'socket.io-client'
import { GiftedChat, Bubble } from 'react-native-gifted-chat'
import LinearGradient from 'react-native-linear-gradient';

import {
  AnimationLoading
} from '../../Components'

import BaseURL from '../../Config/BaseURL'
import api from '../../Services/api'
import { Images, Colors } from 'App/Theme'

export class RoomChat extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      messages: [],
      refreshing: false
    }

  }
  
  componentDidMount = () => {
    this.socket = io(BaseURL.api,
      {
        query: {
          user_id: this.props.user.id
        }
      }
    )

    this.socket.on('connected', () => { 
      console.log('connected to socket server'); 
    }); 

    this.socket.emit('joinRoom', 'reserve31')

    this.socket.on('message', msg => {
      console.log('I received a private message by: ', msg);
    });

    this.loadMessages()
  }

  loadMessages = async () => {
    const room_id = this.props.navigation.getParam('room_id', null)

    this.setState({ loading: true })

    try {
      const { data } = await api.get(`/messages/${room_id}`, {}, {
        authorization: `Bearer ${this.props.user.token}`
      })

      const mappedMessages = this.mapMessages(data)

      this.setState({
        messages: mappedMessages,
        loading: false
      })

    } catch (error) {
      this.setState({ loading: false })
      console.log({error})
    }
  }

  mapMessages = (messages) => {
    
    const mappedMessages = messages.map(msg => {

      return {
        _id: msg.id,
        text: msg.message,
        createdAt: msg.createdAt,
        user: {
          _id: msg.sender.id,
          name: msg.sender.name,
          avatar: msg.sender.avatar ? msg.sender.avatar.url : Images.profile_boy
        },
        Image: msg.Image
      }
    })

    return mappedMessages
  }

  renderBubble = props => {
    return (
      <Bubble
        {...props}
        textStyle={{
          left: {
            color: 'white',
          },
          right: {
            color: 'white',
          },
        }}
        wrapperStyle={{
          left: {
            backgroundColor: Colors.lightGreen,
          },
          right: {
            backgroundColor: Colors.saintBlue,
          },
        }}
      />
    );
  }

  onSend = (messages) => {
    console.log(messages)
  }

  render() {
    const { messages, loading } = this.state

    return (
      <>
        {loading ? (
          <AnimationLoading
            loading={loading}/>
        ) : (
          <GiftedChat
            messages={messages}
            onSend={messages => this.onSend(messages)}
            renderBubble={this.renderBubble}
            user={{
              _id: this.props.user.id,
            }}
          />
        )}
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomChat)
