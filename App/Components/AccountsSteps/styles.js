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

export const AccountDataSessionContainer = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${Colors.ligthGray};
  margin-bottom: 20px;
`

export const AccountDataContainer = styled.View`
    flex-direction: row;
    margin-bottom: 10px;
`

export const AccountDataSessionTitle = styled.Text`
    font-family: 'Nunito Semi Bold';
    font-size: 18px;
    color: ${Colors.ligthGray2};
    margin-bottom: 10px;
`

export const AccountDataField = styled.Text`
    font-family: 'Nunito Bold';
    font-size: 14px;
    color: ${Colors.text};
    margin-right: 10px;
`

export const AccountDataFieldValue = styled.Text`
    font-family: 'Nunito Regular';
    font-size: 14px;
    color: ${Colors.textDefault};
`