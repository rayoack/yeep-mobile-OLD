import styled from 'styled-components/native';
import { Dimensions } from 'react-native'
import { Colors } from 'App/Theme'

export const TopInfoContainer = styled.View`
    width: 100%;
    min-height: 260px;
    border: 1px solid ${Colors.grayTransparent};
    padding-top: 24px;
`;

export const ProfileImageContainer = styled.View`
    width: 100%;
    height: 196px;
    align-items: center;
`

export const ProfileImage = styled.Image`
    height: 150px;
    width: 150px;
    border-radius: 75px;
`

export const TopSubInfoContainer = styled.View`
    height: 53px;
    width: 100%;
    flex-direction: row;
    padding-bottom: 10px;
`

export const TopLeftSubInfoContainer = styled.View`
    width: ${Dimensions.get('window').width / 2};
    border-right-width: 1px;
    border-right-color: ${Colors.grayTransparent};
    align-items: center;
`

export const TopRightSubInfoContainer = styled.View`
    width: ${Dimensions.get('window').width / 2};
    align-items: center;
`

export const TopInfoTitle = styled.Text`
    font-size: 18px;
    font-family: 'Nunito Bold';
    color: ${Colors.primary};
`

export const TopInfoText = styled.Text`
    font-size: 14px;
    font-family: 'Nunito Bold';
    color: ${Colors.textDefault};
`

export const ProfileOptionsList = styled.FlatList`
    margin-top: 35px;
    padding-left: 40px;
    margin-bottom: 20px;
    border-bottom-width: 1px;
    border-bottom-color: ${Colors.grayTransparent};
`

export const OptionsListContainer = styled.TouchableOpacity`
    flex-direction: row;
    margin-bottom: 10px;
`

export const OptionsListIcon = styled.Image`
    height: 25px;
    width: 25px;
    margin-right: 10px;
`

export const OptionsListText = styled.Text`
    font-size: 18px;
    font-family: 'Nunito Bold';
    color: ${Colors.primary};
`

export const LogoutContainer = styled.View`
    padding-left: 40px;
    margin-bottom: 20px;
`

export const LogoutText = styled.Text`
    font-size: 18px;
    font-family: 'Nunito Bold';
    color: ${Colors.lightRed};
`