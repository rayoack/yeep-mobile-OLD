import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image'
import { Colors } from 'App/Theme'

export const Container = styled.View`
    /* background-color: ${Colors.white}; */
    height: 100%;
`;

export const MessagesList = styled.FlatList`
    border-top-right-radius: 40px;
    border-top-left-radius: 40px;
    margin-top: -20px;
    background-color: ${Colors.white};
`;

export const TitleContainer = styled.View`
    height: 100px;
    width: 100%;
    background-color: ${Colors.lightSecondary};
    /* justify-content: center; */
    padding: 0 20px;
`

export const TitleText = styled.Text`
    font-size: 22px;
    margin-top: 20px;
    font-family: 'Nunito Bold';
    color: ${Colors.primary};
`