import React, { useRef, useEffect, useState } from 'react';
import { Platform, Text, View, ScrollView, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import api from '../../../Services/api'
import currencies from '../../../Services/currencies.json'
import { Creators as AuthActions } from '../../../Stores/reducers/auth'
import { HeaderWithBackButton, BottomModal } from '../../../Components'
import { Colors, Images } from 'App/Theme'
import { translate, toNumber } from '../../../Locales'

import {
    TopInfoContainer,
    ProfileImageContainer,
    ProfileImage,
    TopSubInfoContainer,
    TopLeftSubInfoContainer,
    TopRightSubInfoContainer,
    TopInfoTitle,
    TopInfoText,
    ProfileOptionsList,
    OptionsListContainer,
    OptionsListIcon,
    OptionsListText,
    LogoutContainer,
    LogoutText
} from './styles'

const ProfileScreen = ({
    user,
    setSignOut,
    navigation
}) => {

    const [balance, setBalance] = useState('-')
    const [loadingBalance, setLoadingBalance] = useState(false)

    const sheetRef = useRef()

    const getCurrencySymbol = (actualCurrency) => {
        const symbol = currencies.filter(currency => {
            if(currency.value == actualCurrency) {
            return currency
            }
        })
        
        return symbol[0].symbol
    }

    const checkBalance = async () => {
        setLoadingBalance(true)

        try {
            const { data } = await api.get('/payments/check-balance', {}, {
                authorization: `Bearer ${user.token}`
            })

            setBalance(`${getCurrencySymbol(user.monetary_unit)} ${toNumber(data.balance)}`)
            setLoadingBalance(false)
        } catch (error) {
            console.log(error.response.data)
            if(error.response.status == 404 &&
                user.role !== 'organizer' &&
                (error.response.data.type == 'accountNotFound' ||
                error.response.data.type == 'digitalAccountNotFound')) {
                sheetRef.current.snapTo(0)
            }
            
            setLoadingBalance(false)
        }
    }

    const logout = () => {
        setSignOut()
        navigation.navigate('AccessScreen');
    }

    useEffect(() => {
        checkBalance()
    }, [])

    const navigateToAccounts = () => {
        return navigation.navigate('AccountsScreen');
    }

    const renderContent = () => (
        <>
            <View
                style={{
                    backgroundColor: 'white',
                    padding: 16,
                    height: 470,
                }}
            >
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Image style={{ width: 60, height: 6, marginBottom: 30 }} source={Images.push_rectangle}/>

                    <Image style={{ width: 250, height: 250, marginBottom: 30 }} source={Images.profile_interface}/>
                    
                    <Text style={{ textAlign: 'center', fontSize: 16, fontFamily: 'Nunito Semi Bold', marginBottom: 30 }} >{translate('bottomModalRegisterAccount')}</Text>
                
                    <TouchableOpacity
                        onPressOut={navigateToAccounts}
                        style={{
                            height: 45,
                            width: 300,
                            borderRadius: 10,
                            backgroundColor: Colors.primary,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <Text style={{ color: Colors.white }}>{translate('bottomModalRegisterAccountButtonText')}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );

    const optionsList = [
        { image: Images.idCard, text: translate('accounts'), navigateTo: navigateToAccounts }
    ];

    return (
        <>
            <View style={{ flex: 1 }}>
                <HeaderWithBackButton
                    navigation={navigation}
                />

                {user ? (
                    <>
                        <TopInfoContainer>
                            <ProfileImageContainer>
                            {(user.avatar && user.avatar.url) ? (
                                <ProfileImage source={{ uri: user.avatar.url }}/>
                                ) : (
                                <ProfileImage source={Images.profile_boy}/>
                            )}
                            </ProfileImageContainer>

                            <TopSubInfoContainer>
                                <TopLeftSubInfoContainer>
                                        {loadingBalance ? (
                                            <ActivityIndicator size={10} color={Colors.primary} />
                                        ) : <TopInfoTitle>{balance}</TopInfoTitle>}
                                    <TopInfoText>{translate('balance')}</TopInfoText>
                                </TopLeftSubInfoContainer>

                                <TopRightSubInfoContainer>
                                    <TopInfoTitle>{user.name}</TopInfoTitle>
                                    <TopInfoText>{translate(user.role)}</TopInfoText>
                                </TopRightSubInfoContainer>
                            </TopSubInfoContainer>
                        </TopInfoContainer>

                        <ProfileOptionsList
                            // contentContainerStyle={styles.listContentContainerStyle}
                            data={optionsList}
                            renderItem={({ item, index }) => (
                                <OptionsListContainer onPress={item.navigateTo}>
                                    <OptionsListIcon source={item.image}/>
                                    <OptionsListText>{item.text}</OptionsListText>
                                </OptionsListContainer>
                            )}
                        />

                        <LogoutContainer>
                            <OptionsListContainer onPress={() => logout()}>
                                <OptionsListIcon source={Images.logout}/>
                                <LogoutText>{translate('logoutText')}</LogoutText>
                            </OptionsListContainer>
                        </LogoutContainer>
                    </>
                ) : null}
            </View>
            
            <BottomSheet
                ref={sheetRef}
                snapPoints={[470, 300, 0]}
                borderRadius={30}
                initialSnap={2}
                renderContent={renderContent}
            />
        </>
    )
}

const mapStateToProps = (state) => ({
  user: state.auth.user
})

export default connect(
  mapStateToProps,
  {
    ...AuthActions
  }
)(ProfileScreen)
