import styled from 'styled-components/native';
import { Colors } from 'App/Theme'

export const Container = styled.ScrollView`
  
`;

export const AccountTitle = styled.Text`
    font-family: 'Nunito Semi Bold';
    text-align: center;
    font-size: 20px;
    color: ${Colors.text};
    margin-bottom: 15px;
    margin-top: 20px;
`

export const AccountDescription = styled.Text`
    font-family: 'Nunito Regular';
    font-size: 16px;
    color: ${Colors.text};
    margin-bottom: 40px;
`

export const AccountsButton = styled.TouchableOpacity`
    width: 100%;
    height: 140px;
    border-radius: 5px;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.color};
    margin-bottom: 25px;
`

export const AccountsList = styled.FlatList``