import styled from 'styled-components/native';
import { Colors } from 'App/Theme'

export const Container = styled.TouchableOpacity`
    height: 93px;
    width: 100%;
    border-width: 1px;
    border-color: ${Colors.ligthGray2};
    border-radius: 5px;
    padding: 20px 17px;
    flex-direction: row;
    margin-top: 20px;
`;

export const Title = styled.Text`
    font-family: 'Nunito Bold';
    font-size: 18px;
    color: ${Colors.primary};
`

export const Description = styled.Text`
    font-family: 'Nunito Regular';
    font-size: 14px;
    color: ${Colors.textDefault};
`

export const SubDescription = styled.Text`
    font-family: 'Nunito Regular';
    font-size: 12px;
    color: ${Colors.textDefault};
`