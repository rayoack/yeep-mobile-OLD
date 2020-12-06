import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image'
import { Dimensions } from 'react-native';
import { Colors } from 'App/Theme'

export const HeaderView = styled.View`
  width: ${Dimensions.get('window').width};
  background-color: ${Colors.backgroundGray};
`

export const Container = styled.View`
  height: 90px;
  width: ${Dimensions.get('window').width};
  padding: 20px;
  border-bottom-left-radius: 60px;
  border-bottom-right-radius: 60px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom-width: 1px;
  border-bottom-color: ${Colors.ligthGray};
  /* background-color: ${Colors.primary}; */
`;

export const ProfileContainer = styled.View`
  flex-direction: row;
  align-items: center;
`

export const ProfileImageContainer = styled.TouchableOpacity`
  margin-right: 10px;
  height: 40px;
  width: 40px;
  border-radius: 20px;
  shadow-color: #000;
  shadow-offset: {
    height: 2,
  };
  shadow-opacity: 0.25;
  /* shadow-radius: 3.84; */
  elevation: 2;
`

export const ProfileImage = styled(FastImage)`
  height: 40px;
  width: 40px;
  border-radius: 20px;
  box-shadow: 3px 2px 10px rgba(0, 0, 0, 0.32);
  elevation: 10;
`

export const ProfileName = styled.Text`
  font-size: 20px;
  font-family: 'Nunito Semi Bold';
  color: ${Colors.textDefault};
`

export const NotificationContainer = styled.TouchableOpacity``

export const NotificationBell = styled.Image`
  height: 25px;
  width: 25px;
`