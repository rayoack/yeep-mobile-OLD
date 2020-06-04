import React, { Component } from 'react'
import { BackHandler, StatusBar } from 'react-native'
import { connect } from 'react-redux'
import { parseISO } from 'date-fns';
import isFuture from 'date-fns/isFuture'
import api from '../../../Services/api'
import {
  SelectionList,
  ScreensHeader,
  AnimationLoading,
  Feedback
} from '../../../Components'
import { SubTitle, Container } from './styles'
import { translate } from '../../../Locales'

export class MyEventsSelectScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      events: [],
    }
  }

  componentDidMount() {
    this.loadMyEvents()
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton = () => {
    this.props.navigation.goBack(null);
    return true;
  }

  loadMyEvents = async () => {
    const { page } = this.state

    this.setState({ loading: true })

    try {
      const { data } = await api.get(`/myEvents/${page}`, {}, {
        authorization: `Bearer ${this.props.user.token}`
      })

      let eventsWithDate = data.filter(event => event.dates.length)
      let eventsList = []
      console.log(eventsWithDate)

      if(eventsWithDate.length) {
        eventsList = eventsWithDate.filter(event => isFuture(parseISO(event.dates[0].full_date)))
      }

      this.setState({
        events: [...eventsList],
        loading: false
      })

    } catch (error) {
      this.setState({ loading: false })
      console.log({error})

    }
  }

  onItemPress = (item) => {
    const space = this.props.navigation.getParam('space', null)
    const service = this.props.navigation.getParam('service', null)

    this.props.navigation.push('ReserveForm', {
      event: item,
      space,
      service,
      isCreation: true
    })

  }

  goBack = () => {
    this.props.navigation.goBack(null)
  }

  render() {
    
    return (
      <>
      {this.state.loading ? (
        <AnimationLoading
          fullscreen={true}
          loading={this.state.loading}
        />
      ) : null}

      {!this.state.loading && this.state.events ? (
        <Container>
          <StatusBar translucent={false} backgroundColor="#F5F5F5" barStyle="dark-content"/>

          <ScreensHeader
            onPress={() => this.goBack()}
            title={translate('selectEvent')}
          />

          <SubTitle>{translate('selectEventInfo')}</SubTitle>

          <SelectionList
              onItemPress={this.onItemPress}
              multipleSelection={false}
              scrollEnabled={false}
              isAddSupplierSelectionScreen={true}
              items={this.state.events}
              ListEmptyComponent={
                <Feedback feedbackType={'no_events_with_dates'}/>
              } 
            />
        </Container>
      ) : null}
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user
})

export default connect(
  mapStateToProps,
  {}
)(MyEventsSelectScreen)