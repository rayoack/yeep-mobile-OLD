import React from 'react';
import { Images } from 'App/Theme'
import { connect } from 'react-redux'

import {
  HeaderView,
  Container,
  ProfileContainer,
  ProfileImageContainer,
  ProfileImage,
  ProfileName,
  HeaderContainer,
  HeaderIcon,
} from './styles';

const Header = ({
  user,
  navigation
}) => {
  return (
    <HeaderView>
      <Container>
        <ProfileContainer>
          <ProfileImageContainer>
            {(user.avatar && user.avatar.url) ? (
              <ProfileImage source={{ uri: user.avatar.url }}/>
            ) : (
              <ProfileImage source={Images.profile_boy}/>
            )}
          </ProfileImageContainer>

          {user.name ? <ProfileName>{user.name}</ProfileName> : null}
        </ProfileContainer>

        {/* <HeaderContainer>
          <HeaderIcon source={Images.notification_inactive}/>
        </HeaderContainer> */}

        <HeaderContainer onPress={() => navigation.navigate('ProfileScreen')}>
          <HeaderIcon source={Images.settings}/>
        </HeaderContainer>
      </Container>
    </HeaderView>
  );
}

const mapStateToProps = (state) => ({
  user: state.auth.user
})

export default connect(
  mapStateToProps
)(Header)