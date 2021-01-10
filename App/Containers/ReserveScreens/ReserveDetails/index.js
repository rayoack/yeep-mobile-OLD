import React, { Component } from 'react'
import { View, Text } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { format, parseISO } from 'date-fns';
import subDays from 'date-fns/subDays'
import isValid from 'date-fns/isValid'
import Icon from 'react-native-vector-icons/MaterialIcons'

import api from '../../../Services/api'
import { translate, toNumber } from '../../../Locales'
import { Images, Colors } from 'App/Theme'
import { normalizeOneDate } from '../../../Services/datesHelpers'
import currencies from '../../../Services/currencies.json'
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
    BoxContainerDescriptionValue,
    UserProfilePicture,
    UserProfilePictureNoFastImage,
    BubbleImage,
    MoreInfoButton,
    MoreInfoIcon,
    PriceInfoContainer
} from './styles'

export class ReserveDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            reserve: null,
            otherUser: null,
            cancellationUntilDay: '',
            bookingAmountMoreFeeTax: 0
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

            this.setState({
                loading: false,
                reserve: data
            })

            this.setOtherUser()
            this.getCancellationDay()
            this.getValueTotalOfReservationWithFeeTax()

        } catch (error) {
            console.log({error})
            this.setState({ loading: false })
        }
    }

    setOtherUser = () => {
        const { reserve } = this.state
        const { user } = this.props

        console.log({reserve})

        if(user.id !== reserve.organizer.id) {
            let otherUserData = {
                role: 'organizer',
                ...reserve.organizer
            }

            this.setState({ otherUser: otherUserData })
        } else {
            let otherUserData = {
                role: 'owner',
                ...reserve.host
            }

            this.setState({ otherUser: otherUserData })
        }
    }

    getCancellationDay = () => {
        const { reserve } = this.state

        if(isValid(parseISO(reserve.dates[0].full_date))) {
            const dayUntilCancellation = subDays(parseISO(reserve.dates[0].full_date), reserve.Space.days_before_cancellation)

            const formattedDate = normalizeOneDate(dayUntilCancellation);
            this.setState({ cancellationUntilDay: formattedDate })
        }

        return null
    }
    
    getCurrencySymbol = (actualCurrency) => {
        const symbol = currencies.filter(currency => {
            if(currency.value == actualCurrency) {
                return currency
            }
        })
        
        return symbol[0].symbol
    }

    getValueTotalOfReservationWithFeeTax = () => {
        const { reserve } = this.state

        const bookingFee = reserve.amount * 0.03
        const bookingAmountMoreFeeTax = parseInt(reserve.amount) + bookingFee

        this.setState({ bookingAmountMoreFeeTax })
    }

    render() {
        const { reserve, otherUser, cancellationUntilDay, bookingAmountMoreFeeTax } = this.state
        const { user } = this.props

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

                        {/* ORGANIZER OR HOST INFORMATION */}
                        {otherUser ? (
                            <>

                                <BoxContainer>
                                    <BoxContainerTitle style={{ marginBottom: 20 }}>{translate(otherUser.role)}</BoxContainerTitle>
                                    
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{
                                            width: '50%',
                                            borderRightWidth: 1,
                                            borderRightColor: Colors.ligthGray,
                                            alignItems: 'center'
                                        }}>
                                            {otherUser.avatar && otherUser.avatar.url ? (
                                                <UserProfilePicture source={{ uri: otherUser.avatar.url }}/>
                                            ) : (
                                                <UserProfilePictureNoFastImage source={Images.profile_boy}/>
                                            )}

                                            <Text style={{ fontSize: 18, fontFamily: 'Nunito Regular' }}>{otherUser.name}</Text>
                                        </View>

                                        <View style={{
                                            width: '50%',
                                            alignItems: 'center'
                                        }}>
                                            <BubbleImage source={Images.conversation_bubble}/>

                                            <Text style={{ fontSize: 18, fontFamily: 'Nunito Regular' }}>{translate('sendMessage')}</Text>
                                        </View>
                                    </View>

                                </BoxContainer>
                            </>
                        ) : null}

                        {/* MORE INFO */}
                        <BoxContainer>
                            <BoxContainerTitle>{translate('moreInformations')}</BoxContainerTitle>

                            <BoxContainerText style={{ marginBottom: 20 }}>{`${translate('cancelationUntilText')} ${cancellationUntilDay}`}</BoxContainerText>
                        
                            {user && user.role !== 'owner' ? (
                                <MoreInfoButton onPress={() => null}>
                                    <MoreInfoIcon source={Images.calendar_edit}/>

                                    <Text style={{ fontSize: 18, fontFamily: 'Nunito Regular' }}>{translate('changeReservationText')}</Text>
                                
                                    <Icon name="keyboard-arrow-right" size={20} color={Colors.textDefault}/>   
                                </MoreInfoButton>
                            ) : null}
                        
                            <MoreInfoButton onPress={() => null}>
                                <MoreInfoIcon source={Images.calendar_cancel}/>

                                <Text style={{ fontSize: 18, fontFamily: 'Nunito Regular' }}>{translate('cancelReservationText')}</Text>
                            
                                <Icon name="keyboard-arrow-right" size={20} color={Colors.textDefault}/>   
                            </MoreInfoButton>
                        </BoxContainer>

                        {/* PAYMENT INFORMATION */}
                        <BoxContainer>
                            <BoxContainerTitle style={{ marginBottom: 20 }}>{translate('paymentInformationText')}</BoxContainerTitle>

                            <PriceInfoContainer>
                                <Text
                                    style={{
                                        fontColor: Colors.textDefault,
                                        fontFamily: 'Nunito Regular',
                                        fontSize: 14
                                    }}
                                >
                                    {translate('chargeType')}
                                </Text>

                                <Text
                                    style={{
                                        fontColor: Colors.textDefault,
                                        fontFamily: 'Nunito Regular',
                                        fontSize: 14
                                    }}
                                >
                                    {translate(reserve.Space.charge_type)}
                                </Text>
                            </PriceInfoContainer>

                            <PriceInfoContainer>
                                <Text
                                    style={{
                                        fontColor: Colors.textDefault,
                                        fontFamily: 'Nunito Regular',
                                        fontSize: 14
                                    }}
                                >
                                    {translate('quantity')}
                                </Text>

                                <Text
                                    style={{
                                        fontColor: Colors.textDefault,
                                        fontFamily: 'Nunito Regular',
                                        fontSize: 14
                                    }}
                                >
                                    {`${reserve.quantity} ${translate(reserve.Space.charge_type == 'perDay' ? 'daysText' : 'hoursText')}`}
                                </Text>
                            </PriceInfoContainer>
                            
                            <PriceInfoContainer>
                                <Text
                                    style={{
                                        fontColor: Colors.textDefault,
                                        fontFamily: 'Nunito Regular',
                                        fontSize: 14
                                    }}
                                >
                                    {translate('serviceChargeLabel')}
                                </Text>

                                <Text
                                    style={{
                                        fontColor: Colors.textDefault,
                                        fontFamily: 'Nunito Regular',
                                        fontSize: 14
                                    }}
                                >
                                    {`${this.getCurrencySymbol(reserve.Space.monetary_unit)}${toNumber(reserve.amount * 0.03)}`}
                                </Text>
                            </PriceInfoContainer>
                            
                            <PriceInfoContainer>
                                <Text
                                    style={{
                                        fontColor: Colors.textDefault,
                                        fontFamily: 'Nunito Bold',
                                        fontSize: 20
                                    }}
                                >
                                    {`${translate('totalLabel')} (${reserve.Space.monetary_unit})`}
                                </Text>

                                <Text
                                    style={{
                                        fontColor: Colors.textDefault,
                                        fontFamily: 'Nunito Bold',
                                        fontSize: 20
                                    }}
                                >
                                    {`${this.getCurrencySymbol(reserve.Space.monetary_unit)}${toNumber(bookingAmountMoreFeeTax)}`}
                                </Text>
                            </PriceInfoContainer>
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
