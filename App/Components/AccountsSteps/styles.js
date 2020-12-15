import styled from 'styled-components/native';
import { Colors } from 'App/Theme'

export const Container = styled.ScrollView`
  
`;

export const StepTitle = styled.Text`
    font-family: 'Nunito Semi Bold';
    font-size: 18px;
    color: ${Colors.labelBlack};
    margin-bottom: 10px;
`

export const StepDescription = styled.Text`
    font-family: 'Nunito Regular';
    font-size: 14px;
    color: ${Colors.text};
    margin-bottom: 25px;
`