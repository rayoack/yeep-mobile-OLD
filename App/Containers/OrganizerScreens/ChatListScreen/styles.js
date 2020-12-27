import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image'
import { Colors } from 'App/Theme'
import { Dimensions } from 'react-native';

export const Container = styled.View`
    /* background-color: ${Colors.white}; */
    height: 100%;
`;

export const ChatListContainer = styled.ScrollView`
    background-color: ${Colors.backgroundGray};
`;

export const TitleContainer = styled.View`
    height: 90px;
    width: ${Dimensions.get('window').width};
    justify-content: center;
    border-bottom-width: 1px;
    border-bottom-color: ${Colors.ligthGray};
    margin-left: 20px;
    margin-right: 20px;
    /* padding: 20px; */
`

export const TitleText = styled.Text`
    font-size: 30px;
    font-family: 'Nunito Semi Bold';
    color: ${Colors.primary};
`