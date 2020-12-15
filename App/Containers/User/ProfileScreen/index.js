import React from 'react'
import { Platform, Text, View, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import _ from 'lodash'
import axios from 'axios'
import { Creators as AuthActions } from '../../../Stores/reducers/auth'
import { HeaderWithBackButton } from '../../../Components'
import { ApplicationStyles, Helpers, Images, Metrics } from 'App/Theme'
import { translate } from '../../../Locales'

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

class ProfileScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {

  }

  logout = () => {
    this.props.setSignOut()
    this.props.navigation.navigate('AccessScreen');
  }

  render() {
    const optionsList = [
        { image: Images.idCard, text: translate('accounts'), navigateTo: () => this.props.navigation.navigate('AccountsScreen') }
    ];

    return (
        <>
            {this.props.user ? (

                <View style={{ flex: 1 }}>
                    <HeaderWithBackButton navigation={this.props.navigation}/>

                    <TopInfoContainer>
                        <ProfileImageContainer>
                        {(this.props.user.avatar && this.props.user.avatar.url) ? (
                            <ProfileImage source={{ uri: this.props.user.avatar.url }}/>
                            ) : (
                            <ProfileImage source={Images.profile_boy}/>
                        )}
                        </ProfileImageContainer>

                        <TopSubInfoContainer>
                            <TopLeftSubInfoContainer>
                                <TopInfoTitle>R$ 10.000</TopInfoTitle>
                                <TopInfoText>{translate('balance')}</TopInfoText>
                            </TopLeftSubInfoContainer>

                            <TopRightSubInfoContainer>
                                <TopInfoTitle>{this.props.user.name}</TopInfoTitle>
                                <TopInfoText>{translate(this.props.user.role)}</TopInfoText>
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
                        <OptionsListContainer onPress={() => this.logout()}>
                            <OptionsListIcon source={Images.logout}/>
                            <LogoutText>{translate('logoutText')}</LogoutText>
                        </OptionsListContainer>
                    </LogoutContainer>
                </View>
            ) : null}
        </>
    )
  }

}

ProfileScreen.propTypes = {
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
