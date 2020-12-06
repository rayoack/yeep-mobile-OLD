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
  NotificationContainer,
  NotificationBell,
} from './styles';

const Header = ({
  user,
  navigation
}) => {
  return (
    <HeaderView>
      <Container>
        <ProfileContainer>
          <ProfileImageContainer onPress={() => navigation.navigate('ProfileScreen')}>
            {(user.avatar && user.avatar.url) ? (
              <ProfileImage source={{ uri: user.avatar.url }}/>
            ) : (
              <ProfileImage source={Images.profile_boy}/>
            )}
          </ProfileImageContainer>

          {user.name ? <ProfileName>{user.name}</ProfileName> : null}
        </ProfileContainer>

        <NotificationContainer>
          <NotificationBell source={Images.notification_inactive}/>
        </NotificationContainer>
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