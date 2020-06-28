import React, { Component } from 'react'
import { View, StatusBar } from 'react-native'
import { connect } from 'react-redux'
import _ from 'lodash'
import io from 'socket.io-client'

import { Images, Colors } from 'App/Theme'
import { ScreensHeader } from '../../../Components'
import BaseURL from '../../../Config/BaseURL'
import { translate } from '../../../Locales'
import api from '../../../Services/api'
import ViewComponent from './ViewComponent'

class ReservesList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      reserves: [],
      page: 1,
      refreshing: false
    }

  }

  componentDidMount = () => {
    this.socket = io(BaseURL.api,
      {
        forceNode: true,
        query: {
          user_id: this.props.user.id
        }
      }
    )

    this.socket.on('newMessageToRoom', reserve => {
      this.updateReservesList(reserve)
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
      const response = await api.get(`/reserves/${targetId}/${page}`, {
        request_type
      }, {
        authorization: `Bearer ${this.props.user.token}`
      })

      const mappedReserves = this.mapReserves(response.data, request_type)

      this.setState({
        reserves: mappedReserves,
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

  updateReservesList = (updatedReserve = {}) => {
    const { reserves } = this.state

    let reservesCopy = [...reserves]

    reservesCopy.map(reserve => {
      if(reserve.id == updatedReserve.id) {
        reserve.read = updatedReserve.last_message_target_read
        reserve.last_message_target_id = updatedReserve.last_message_target_read
        reserve.updatedAt = updatedReserve.updatedAt
      }

      return reserve
    })

    this.setState({ reserves: reservesCopy })
  }

  navigateToReserveChat = async (reserve) => {
    this.props.navigation.push('RoomChat', {
      room: reserve
    })
  }

  goBack = () => {
    this.props.navigation.goBack(null)
  }

  mapReserves = (reserves = [], request_type = 'event') => {
    if(!reserves.length) return []

    const mappedReserves = reserves.map(reserve => {
      let subInfo = ''
      let image = request_type == 'event' ?
        reserve.Space.Images ? reserve.Space.Images[0].url : Images.image_background
        : reserve.Event.event_logo ? reserve.Space.event_logo.url : Images.image_background

      if(request_type == 'event' && reserve.Space.adress != null) {
        subInfo = `${reserve.Space.adress}, ${reserve.Space.city}, ${reserve.Space.state}, ${reserve.Space.country}`
      } else if(request_type == 'space' && reserve.Event.category != null) {
        subInfo = reserve.Event.category
      }

      return {
        id: reserve.id,
        title: request_type == 'event' ? reserve.Space.name : reserve.Event.title,
        subInfo,
        last_message_target_id: reserve.last_message_target_id,
        read: reserve.last_message_target_id == this.props.user.id ?
          reserve.last_message_target_read
          : true,
        image,
        status: reserve.status,
        updatedAt: reserve.updatedAt
        // users_id: []
      }
    })

    return _.orderBy(mappedReserves, ['updatedAt'],['asc'])
  }

  render() {
    const { loading, refreshing, reserves } = this.state

    const forApproval = reserves.length ? reserves.filter(reserve => reserve.status == 'waitingForApproval') : []
    const awaitingPayment = reserves.length ? reserves.filter(reserve => reserve.status == 'awaitingPayment') : []
    const completed = reserves.length ? reserves.filter(reserve => reserve.status == 'completed') : []

    return (
      <>
        <StatusBar translucent={false} barStyle="dark-content"/>

        <ScreensHeader
          onPress={() => this.goBack()}
          title={translate('negociationsListLabel')}
        />

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
