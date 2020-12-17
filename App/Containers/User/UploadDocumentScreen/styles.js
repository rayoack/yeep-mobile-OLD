import styled from 'styled-components/native';
import { Colors } from 'App/Theme'

export const Container = styled.View`
    padding-left: 20px;
    padding-right: 20px;
`;

export const UploadDocumentTitle = styled.Text`
    font-size: 18px;
    font-family: 'Nunito Bold';
    color: ${props => props.documentTitle ? Colors.primary : Colors.text};
`

export const UploadDocumentDescription = styled.Text`
    font-size: 14px;
    font-family: 'Nunito Regular';
    color: ${Colors.text};
    margin-left: ${props => props.marginLeft ? props.marginLeft : 0};
`

export const UploadDocumentButton = styled.TouchableOpacity`
    height: 50px;
    width: 200px;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    border-radius: 5px;
    border-width: 1;
    border-color: ${Colors.ligthGray2};
    flex-direction: row;
    padding: 5px;
`

export const AcceptedDocumentExtensions = styled.Text`
    font-size: 10px;
    font-family: 'Nunito Regular';
    color: ${Colors.text};
    margin-top: 10px;
`