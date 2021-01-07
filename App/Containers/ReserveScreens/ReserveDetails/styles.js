import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image'
import { Colors } from 'App/Theme'

export const Container = styled.ScrollView`
    margin-top: 20px;
`;

export const BoxContainer = styled.View`
    border-bottom-width: 5px;
    border-bottom-color: ${Colors.ligthGray};
    padding: 20px 20px 30px;
`

export const BoxContainerTitle = styled.Text`
    font-size: 18px;
    font-family: 'Nunito Bold';
    color: ${Colors.labelGray};
`

export const BoxContainerText = styled.Text`
    font-size: 14px;
    font-family: 'Nunito Regular';
    color: ${Colors.textDefault};
`

export const BoxContainerDescriptionLabel = styled.Text`
    font-size: 14px;
    font-family: 'Nunito Semi Bold';
    color: ${Colors.labelGray};
`

export const BoxContainerDescriptionValue = styled.Text`
    font-size: 16px;
    font-family: 'Nunito Regular';
    color: ${Colors.textDefault};
`

export const SpaceImage = styled(FastImage)`
    width: 330px;
    height: 165px;
    margin-bottom: 10px;
`

export const SpaceImageNoFastImage = styled.Image`
    width: 330px;
    height: 165px;
    margin-bottom: 10px;
`

export const UserProfilePictureNoFastImage = styled.Image`
    width: 100px;
    height: 100px;
    border-radius: 50px;
    margin-bottom: 10px;
`

export const UserProfilePicture = styled(FastImage)`
    width: 100px;
    height: 100px;
    border-radius: 50px;
    margin-bottom: 10px;
`

export const BubbleImage = styled.Image`
    width: 100px;
    height: 100px;
    margin-bottom: 10px;
`