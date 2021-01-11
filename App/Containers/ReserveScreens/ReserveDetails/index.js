import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { format, parseISO } from 'date-fns';
import subDays from 'date-fns/subDays'
import isValid from 'date-fns/isValid'
import Icon from 'react-native-vector-icons/MaterialIcons'
import LinearGradient from 'react-native-linear-gradient';

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
    PriceInfoContainer,
    BottomButton
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

        const bookingFee = parseFloat(reserve.amount * 0.03)
        const bookingAmountMoreFeeTax = parseFloat(reserve.amount) + bookingFee

        this.setState({ bookingAmountMoreFeeTax })
    }

    getReserveButtonAction = () => {
        const { user } = this.props
        
        if(user.role === 'owner') {
            return this.getHostBottomButtonAction()
        } else if (user.role === 'organizer') {
            return this.getOrganizerBottomButtonAction()
        }
    }

    getReserveButtonText = () => {
        const { user } = this.props
        
        if(user.role === 'owner') {
            return this.getHostBottomButtonText()
        } else if (user.role === 'organizer') {
            return this.getOrganizerBottomButtonText()
        }
    }

    // Bottom button actions
    getHostBottomButtonAction = () => {
        const { reserve } = this.state

        switch (reserve.status) {
            case 'waitingForApproval':
                return () => null;
        
            default:
                return () => null;
        }
    }

    getOrganizerBottomButtonAction = () => {
        const { reserve } = this.state

        switch (reserve.status) {
            case 'waitingForApproval':
                return () => null;
        
            default:
                return () => null;
        }
    }

    // Bottom button text
    getHostBottomButtonText = () => {
        const { reserve } = this.state

        switch (reserve.status) {
            case 'waitingForApproval':
                return translate('authorizePayment');
        
            default:
                return '';
        }
    }

    getOrganizerBottomButtonText = () => {
        const { reserve } = this.state

        switch (reserve.status) {
            case 'waitingForApproval':
                return translate('waitingForApproval');
        
            default:
                return '';
        }
    }

    navigateToSpaceDetails = () => {
        const { reserve } = this.state

        if(reserve && reserve.Space) {
            this.props.navigation.navigate('PlaceDetailsScreen', {
                comingReserveDetails: true,
                space_id: reserve.Space.id
            })
        }
    }

    navigateToChatRoom = () => {
        // INSERIR DEPOIS

        // const { reserve } = this.state

        // const room = {
        //     id: chatRoom.id,
        //     name: chatRoom.Reserve.Space && chatRoom.Reserve.Space.name ? chatRoom.Reserve.Space.name : '',
        //     roomName: chatRoom.room_name,
        //     title: request_type == 'organizer' ? chatRoom.Reserve.Space.name : chatRoom.organizer.name,
        //     subInfo: translate(chatRoom.type),
        //     last_message_target_id: chatRoom.last_message_target_id,
        //     read: chatRoom.last_message_target_id == user.id ?
        //         chatRoom.last_message_target_read
        //         : true,
        //     image,
        //     status: translate(chatRoom.Reserve.status),
        //     organizer: chatRoom.organizer,
        //     otherUser,
        //     updatedAt: chatRoom.updatedAt
        // }
    }

    render() {
        const { reserve, otherUser, cancellationUntilDay, bookingAmountMoreFeeTax } = this.state
        const { user } = this.props

        return (
            <>
                {reserve ? (
                    <>
                        <Container>
                            <HeaderWithBackButton navigation={this.props.navigation} />

                            {/* SPACE */}
                            <BoxContainer style={{ alignItems: 'center' }}>
                                <TouchableOpacity onPress={() => this.navigateToSpaceDetails()}>
                                    {reserve.Space && reserve.Space.Images && reserve.Space.Images.length ? (
                                        <SpaceImage source={{ uri: reserve.Space.Images[0].url }}/>
                                    ) : (
                                        <SpaceImageNoFastImage source={Images.image_background}/>
                                    )}
                                </TouchableOpacity>

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

                                            {/* INSERIR DEPOIS */}
                                            {/* <View style={{
                                                width: '50%',
                                                alignItems: 'center'
                                            }}>
                                                <BubbleImage source={Images.conversation_bubble}/>

                                                <Text style={{ fontSize: 18, fontFamily: 'Nunito Regular' }}>{translate('sendMessage')}</Text>
                                            </View> */}
                                        </View>

                                    </BoxContainer>
                                </>
                            ) : null}

                            {/* MORE INFO */}
                            <BoxContainer>
                                <BoxContainerTitle>{translate('moreInformations')}</BoxContainerTitle>

                                <BoxContainerText style={{ marginBottom: 20 }}>{`${translate('cancelationUntilText')} ${cancellationUntilDay}`}</BoxContainerText>
                            
                                {user && user.role !== 'owner' && reserve.status !== 'PAID' ? (
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
                            <BoxContainer style={{ marginBottom: 80, borderBottomWidth: 0 }}>
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
                        <LinearGradient
                            style={{ 
                                height: 90,
                                width: '100%',
                                // alignItems: 'center',
                                justifyContent: 'center',
                                position: 'absolute',
                                padding: 20,
                                zIndex: 99,
                                bottom: 0
                            }}
                            colors={['rgba(238, 238, 238, 0.0)', 'rgba(74, 74, 74, 0.2)']}
                        >
                            <BottomButton onPress={this.getReserveButtonAction()}>
                                <Text style={{
                                    fontFamily: 'Nunito Extra Bold',
                                    fontSize: 16,
                                    color: Colors.white
                                }}>
                                    {this.getReserveButtonText()}
                                </Text>
                            </BottomButton>
                        </LinearGradient>
                    </>
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
