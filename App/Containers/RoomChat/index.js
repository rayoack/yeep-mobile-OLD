import React, { Component } from 'react'
import { View, Text, StatusBar } from 'react-native'
import { connect } from 'react-redux'
import io from 'socket.io-client'
import { GiftedChat, Bubble, Send } from 'react-native-gifted-chat'
import * as RNLocalize from "react-native-localize";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import LinearGradient from 'react-native-linear-gradient';
import ptBr from 'dayjs/locale/pt-br'
import _ from 'lodash'

import {
  AnimationLoading,
  CustomToast
} from '../../Components'

import { Creators as MessageActions } from '../../Stores/reducers/messagesReducer'

import { socket } from '../../Config/SocketManager'
import BaseURL from '../../Config/BaseURL'
import api from '../../Services/api'
import { Images, Colors } from 'App/Theme'
import { translate } from '../../Locales'
import {
  Container,
  ChatHeader,
  ChatInfoContainer,
  ChatSubTitle,
  ChatTitle,
  ChatImage,
  ChatButtonContainer
} from './styles'

export class RoomChat extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      room: {},
      chatName: '',
      chatSubInfo: '',
      reserveImage: Images.image_background,
      messages: [],
      users: [],
      activeUsers: {},
      refreshing: false,
      toastText: '',
      showToast: false,
      room_id: null,
    }

    this.socket = socket;
  }
  
  componentDidMount = async () => {
    const room = this.props.navigation.getParam('room', null)

    await this.socket.emit('joinRoom', room.roomName)

    this.socket.on('message', newMessage => {
      return this.insertNewMessage(newMessage)
    });

    this.setState({
      room_id: room.id,
      room,
    }, () => this.loadMessages())
  }

  componentWillUnmount = async () => {
    if(this.state.room && this.state.room.roomName) {
      await this.socket.emit('leavesRoom', this.state.room.roomName)
    }
    this.props.clearMessages()
  }

  getLanguageByDevice = () => {
    const locales = RNLocalize.getLocales();
    const language = locales[0].languageTag;

    const normalizeTranslate = {
      'en_US': 'en',
      'en-US': 'en',
      'pt_BR': 'pt-br',
      'pt-BR': 'pt-br',
      'en': 'en',
      'pt_US': 'pt-br',
      'pt_PT': 'pt-br',
      'pt-PT': 'pt-br',
      'pt': 'pt-br',      
    }
    
    const localeLanguage = normalizeTranslate[language] == 'en' ?
      require('dayjs/locale/en')
      : require('dayjs/locale/pt-br')

    const translateNormalize = normalizeTranslate.hasOwnProperty(language) ?
      localeLanguage
      : require('dayjs/locale/en')
  
    return translateNormalize
  }
  
  loadMessages = async () => {
    const room = this.props.navigation.getParam('room', null)
    this.setState({ loading: true })

    try {
      const { data } = await api.get(`/messages/${this.state.room.id}`, {}, {
        authorization: `Bearer ${this.props.user.token}`
      })

      const mappedMessages = this.mapMessages(data)

      await this.props.setMessages(mappedMessages)

      this.setState({
        // messages: mappedMessages,
        loading: false,
        chatName: room && room.name ? room.name : '',
        chatSubInfo: room.status ? room.status : '',
        reserveImage: room.image
      })

      this.updateRoom()

    } catch (error) {
      this.setState({ loading: false })
      this.setShowToast(translate('errorOnLoadMessages'))
      console.log({error})
    }
  }

  updateRoom = () => {
    // const room = this.props.navigation.getParam('room', null)
    const { room } = this.state
    
    if(!room.read && room.last_message_target_id == this.props.user.id) {

      const data = {
        last_message_target_read: true
      }
      
      api.put(`/room/${room.id}`, {
        ...data
      }, {
        authorization: `Bearer ${this.props.user.token}`
      }).then(response => {
        console.log('response', response)

      }).catch(error => console.log({error}))

    } else {
      return null
    }

  }

  insertNewMessage = async (message) => {
    const { messages } = this.props

    // let messagesCopy = [...messages]

    let sender = this.returnSenderUser(message.sender_id)

    const mappedMessage = {
      _id: message._id,
      text: message.message,
      createdAt: message.createdAt,
      user: {
        _id: message.sender_id,
        name: message.sender_name,
        avatar: (sender !== null && sender.avatar && sender.avatar.url) ? sender.avatar.url : Images.profile_boy
      },
      Image: message.Image
    }

    const updatedMessages = [mappedMessage, ...messages]

    await this.props.setMessages(updatedMessages)
  }

  returnSenderUser = (senderId) => {
    const { room } = this.state

    if(senderId === room.organizer.id) {
      return room.organizer
    } else if(senderId === room.otherUser.id) {
      return room.otherUser
    } else {
      return null
    }
  }

  mapMessages = (messages) => {
    console.log('MESSAGES', messages)
    
    const mappedMessages = messages.map((msg, index) => {
      if(index == 0) {
        this.setState({ users: [msg.sender_id, msg.receiver_id] })
      }

      let sender = this.returnSenderUser(msg.sender_id)

      return {
        _id: msg._id,
        text: msg.message,
        createdAt: msg.createdAt,
        user: {
          _id: msg.sender_id,
          name: msg.sender_name,
          avatar: (sender !== null && sender.avatar && sender.avatar.url) ? sender.avatar.url : Images.profile_boy
        },
        Image: msg.Image
      }
    })

    let messagesNoDuplicated = _.uniqBy(mappedMessages, function (msg) {
      return msg._id;
    });

    return messagesNoDuplicated
  }

  onSend = async (message) => {

    let usersCopy = [...this.state.users]
    const receiverUser =  usersCopy.filter(user => user != this.props.user.id)

    const newMessage = {
      message: message[0].text,
      room_id: this.state.room.id,
      sender_id: message[0].user._id,
      receiver_id: receiverUser[0],
      room_name: this.state.room.roomName
    }
    
    try {
      const { data } = await api.post(`/messages`, newMessage, {
        authorization: `Bearer ${this.props.user.token}`
      })

      // const mappedMessage = {
      //   _id: data.id,
      //   text: data.message,
      //   createdAt: data.createdAt,
      //   user: {
      //     _id: data.sender_id,
      //     name: data.sender_name,
      //     avatar: data.sender_avatar ? data.sender_avatar : Images.profile_boy
      //   },
      //   Image: data.Image
      // }

    } catch (error) {
      this.setShowToast(translate('errorOnSendMessage'))
      console.log({error})
    }
  }

  updateActiveUsers = activeUsers => this.setState({ activeUsers })

  setShowToast = (text) => {
    this.setState({ toastText: text, showToast: true })

    this.interval = setInterval(() => {
      this.setState({ showToast: false })
      clearInterval(this.interval)
    }, 2000);
  }

  renderBubble = props => {
    return (
      <Bubble
        {...props}
        textStyle={{
          left: {
            color: Colors.text,
          },
          right: {
            color: 'white',
          },
        }}
        wrapperStyle={{
          left: {
            backgroundColor: Colors.ligthGray,
          },
          right: {
            backgroundColor: Colors.saintBlue,
          },
        }}
      />
    );
  }

  renderSend = (props) => {
    return (
      <Send {...props}>
        <View style={{ justifyContent: 'center', alignItems: 'center', paddingRight: 10 }}>
         <Icon size={40} name="send-circle" color={Colors.primary} />
        </View>
      </Send>
    );
  }

 scrollToBottomComponent = () => {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Ionicons size={34} name="ios-arrow-down" color={Colors.primary} />
      </View>
    );
  }

  goBack = () => {
    
    // const newReserve = this.props.navigation.getParam('newReserve', false)

    // if(newReserve) {
    //   this.props.navigation.navigate('MyEventsScreen')
    // } else {
      this.props.navigation.goBack()
    // }
  }

  goToReserveDetails = () => {
    this.props.navigation.push('ReserveForm', {
      reserveId: this.state.room_id
    })
  }

  render() {
    const {
      loading,
      showToast,
      toastText,
      chatName,
      chatSubInfo,
      reserveImage
     } = this.state

     const { messages } = this.props
     
     const pattern = new RegExp('^(https?:\\/\\/)?'+
     '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ 
     '((\\d{1,3}\\.){3}\\d{1,3}))'+ 
     '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+
     '(\\?[;&a-z\\d%_.~+=-]*)?'+
     '(\\#[-a-z\\d_]*)?$','i')

    return (
      <>
        <StatusBar translucent backgroundColor={Colors.lightSecondary} barStyle="dark-content"/>

        <CustomToast
          show={showToast} 
          text={toastText} 
          duration={2000}
          positionValue={50}
        />

        {loading ? (
          <AnimationLoading
            loading={loading}/>
        ) : (
          <>
            <ChatHeader>
              <ChatInfoContainer
                onPress={() => this.goToReserveDetails()}
                activeOpacity={0.8}
              >
                {pattern.test(reserveImage) ? (
                  <ChatImage source={{ uri: reserveImage }}/>
                ) : (
                  <ChatImage source={reserveImage}/>
                )}

                <View>
                  <ChatTitle>{chatName}</ChatTitle>
                  <ChatSubTitle>{chatSubInfo}</ChatSubTitle>
                </View>
              </ChatInfoContainer>

              {/* <ChatButtonContainer>
                <MaterialIcons size={30} name="more-vert" color={Colors.white} />
              </ChatButtonContainer> */}
              
              <ChatButtonContainer
                activeOpacity={0.8}
                onPress={() => this.goBack()}
              >
                <Icon size={25} name="window-close" color={Colors.primary} />
              </ChatButtonContainer>
            </ChatHeader>

            <GiftedChat
              messages={messages}
              renderUsernameOnMessage={true}
              onSend={message => this.onSend(message)}
              renderBubble={this.renderBubble}
              locale={this.getLanguageByDevice()}
              placeholder={translate('messageInputLabel')}
              renderSend={this.renderSend}
              textInputStyle={{}}
              listViewProps={{
                style: {
                  backgroundColor: 'white',
                  borderBottomLeftRadius: 30,
                  borderBottomRightRadius: 30,
                  paddingTop: 20,
                  marginTop: -20
                },
              }}
              scrollToBottom
              scrollToBottomComponent={this.scrollToBottomComponent}
              user={{
                _id: this.props.user.id,
                name: this.props.user.name,
                avatar: this.props.user.avatar ? this.props.user.avatar.url : Images.profile_boy
              }}
            />
          </>
        )}
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  messages: state.messagesReducer.messages
})

export default connect(mapStateToProps, {
  ...MessageActions
})(RoomChat)
