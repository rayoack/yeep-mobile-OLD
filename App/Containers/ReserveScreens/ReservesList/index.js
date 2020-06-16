import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import io from 'socket.io-client'
import BaseURL from '../../../Config/BaseURL'
import { translate } from '../../../Locales'
import api from '../../../Services/api'

import ViewComponent from './ViewComponent'

class ReservesList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      forApproval: [],
      awaitingPayment: [],
      completed: [],
      page: 1,
      refreshing: false
    }

  }

  componentDidMount = () => {
    this.socket = io(BaseURL.api,
      {
        transports: ['websocket'],
        agent: false,
        secure: true,
        reconnection: true,
        rejectUnauthorized: false,
        query: {
          user_id: this.props.user.id
        }
      }
    )

    console.log(this.socket.on)
    // this.socket.connect();

    this.socket.on('connected', () => { 
      console.log('connected to socket server'); 
    }); 

    this.socket.emit('joinRoom', 'reserve31')

    this.socket.on('message', msg => {
      console.log('I received a private message by: ', msg);
    });

    this.socket.on('notification', noti => {
      console.log('I received a notification: ', noti);
    });

    this.loadMyReserves()
  }

  redirectToLoginScreen = () => {
    this.props.navigation.navigate('LoginScreen')
  }

  loadMyReserves = async () => {
    const { page, forApproval, awaitingPayment, completed } = this.state
    const targetId = this.props.navigation.getParam('targetId', null)
    const request_type = this.props.navigation.getParam('request_type', null)

    this.setState({ loading: true })

    try {
      const { data } = await api.get(`/reserves/${targetId}/${page}`, {
        request_type
      }, {
        authorization: `Bearer ${this.props.user.token}`
      })

      // const mappedReserves = data.map(reserve => {
      //   let adress = ''
      //   let images = (space['Images'] && space['Images'].length) ? space.Images : ''
  
      //   if(space.adress != null && space.adress.length) {
      //     adress = `${space.adress}, ${space.city}, ${space.state}`
      //   }

      //   let adress = ''
      //   let final_adress = ''
      //   let image = reserve.event_logo ? reserve.event_logo.url : ''
      //   let dates = reserve.dates != null ? reserve.dates : []
  
      //   if(reserve.adress != null) {
      //     adress = `${reserve.adress}, ${reserve.city}`
      //     final_adress = `${reserve.state}, ${reserve.country}`
      //   }
  
      //   return {
      //     id: reserve.id,
      //     title: reserve.title,
      //     category: reserve.category,
      //     dates,
      //     adress,
      //     final_adress,
      //     image,
      //     online: reserve.online
      //   }
      // })
  
      let forApprovalList = data.filter(reserve => reserve.status == 'waitingForApproval')
      let awaitingPaymentList = data.filter(reserve => reserve.status == 'awaitingPayment')
      let completedList = data.filter(reserve => reserve.status == 'completed')

      this.setState({
        forApproval: [...forApprovalList],
        awaitingPayment: [...awaitingPaymentList],
        completed: [...completedList],
        loading: false
      })

    } catch (error) {
      this.setState({ loading: false })
      console.log({error})

      if(error.response.status == 401) {
        this.redirectToLoginScreen()
      }
    }
  }

  navigateToReserveChat = (reserveId) => {
    this.props.navigation.navigate('RoomChat', {
      room_id: reserveId
    })
  }

  render() {
    const { loading, forApproval, awaitingPayment, completed, refreshing } = this.state

    return (
      <>
        <ViewComponent
          forApproval={forApproval}
          awaitingPayment={awaitingPayment}
          completed={completed}
          loading={loading}
          translate={translate}
          navigateToReserveChat={this.navigateToReserveChat}
          refreshMyReserves={this.loadMyReserves}
          refreshing={refreshing}
        />
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(ReservesList)
