import React, { Component } from 'react'
import { View, Text } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import api from '../../../Services/api'
import { translate } from '../../../Locales'
import { Images, Colors } from 'App/Theme'
import {
    HeaderWithBackButton
} from '../../../Components'

import {
    Container,
    BoxContainer,
    BoxContainerTitle,
    SpaceImage,
    SpaceImageNoFastImage,
    BoxContainerText,
    BoxContainerDescriptionLabel,
    BoxContainerDescriptionValue
} from './styles'

export class ReserveDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            reserve: null
        }
    }

    componentDidMount() {
        this.loadReserve()
    }

    loadReserve = async () => {
        try {
            this.setState({ loading: true })
            
            const reserveId = this.props.navigation.getParam('reserveId', null)

            const { data } = await api.get(`/reserve/${reserveId}`, {}, {
                authorization: `Bearer ${this.props.user.token}`
            })

            console.log({data})

            this.setState({
                loading: false,
                reserve: data
            })

        } catch (error) {
            console.log({error})
            this.setState({ loading: false })
        }
    }

    render() {
        const { reserve } = this.state

        return (
            <>
                {reserve ? (
                    <Container>
                        <HeaderWithBackButton navigation={this.props.navigation} />

                        {/* SPACE */}
                        <BoxContainer style={{ alignItems: 'center' }}>
                            {reserve.Space && reserve.Space.Images && reserve.Space.Images.length ? (
                                <SpaceImage source={{ uri: reserve.Space.Images[0].url }}/>
                            ) : (
                                <SpaceImageNoFastImage source={Images.image_background}/>
                            )}

                            <View style={{ width: '100%' }}>
                                <BoxContainerTitle>{reserve.Space.name}</BoxContainerTitle>
                                <BoxContainerText>{`${reserve.Space.adress}, ${reserve.Space.city}, ${reserve.Space.state}, ${reserve.Space.country}`}</BoxContainerText>
                            </View>
                        </BoxContainer>

                        {/* DATES */}
                        <BoxContainer>
                            <BoxContainerTitle style={{ marginBottom: 10 }}>{translate('eventDatesLabel')}</BoxContainerTitle>

                            {reserve.dates && reserve.dates.length ? (
                                reserve.dates.map((date, index) => (
                                    <View style={{
                                        paddingBottom: 15,
                                        borderBottomWidth: index + 1 === reserve.dates.length ? 0 : 1,
                                        borderBottomColor: Colors.ligthGray
                                    }}>
                                        <BoxContainerDescriptionLabel>
                                            {`${translate('dayLabel')} ${index + 1}`}
                                        </BoxContainerDescriptionLabel>

                                        <BoxContainerDescriptionValue style={{ marginBottom: 10 }}>
                                            {date.normalizedDate}
                                        </BoxContainerDescriptionValue>

                                        <View style={{ flexDirection: 'row' }}>
                                            <View style={{ marginRight: 30 }}>
                                                <BoxContainerDescriptionLabel>{translate('startHourLabel')}</BoxContainerDescriptionLabel>

                                                <BoxContainerDescriptionValue>{date.start_hour}</BoxContainerDescriptionValue>
                                            </View>

                                            <View>
                                                <BoxContainerDescriptionLabel>{translate('endHourLabel')}</BoxContainerDescriptionLabel>

                                                <BoxContainerDescriptionValue>{date.end_hour}</BoxContainerDescriptionValue>
                                            </View>
                                        </View>
                                    </View>
                                ))
                            ) : (
                                <BoxContainerText>{translate('noDateEventsLabel')}</BoxContainerText>
                            )}
                        </BoxContainer>
                    </Container>
                ) : null}
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(ReserveDetails)
