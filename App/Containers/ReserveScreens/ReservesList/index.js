import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
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
    this.loadMyReserves()
  }

  redirectToLoginScreen = () => {
    this.props.navigation.navigate('LoginScreen')
  }

  loadMyReserves = async () => {
    const { page, forApproval, awaitingPayment, completed } = this.state
    const targetId = this.props.navigation.getParams('targetId', null)
    const request_type = this.props.navigation.getParams('request_type', null)

    this.setState({ loading: true })

    try {
      const { data } = await api.get(`/reserves/${targetId}/${page}`, {
        request_type
      }, {
        authorization: `Bearer ${this.props.user.token}`
      })

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
