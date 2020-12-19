import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/AntDesign'
import FeatherIcon from 'react-native-vector-icons/Feather'

export const Container = styled.View`
    height: 70px;
    width: 100%;
    border: 1px solid rgba(155, 155, 155, 0.3);
    padding-left: 20px;
    padding-right: 10px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const IconContainer = styled.TouchableOpacity`
    height: 40px;
    width: 40px;
    justify-content: center;
`

export const ArrowBack = styled(Icon)`
`

export const EditIcon = styled(FeatherIcon)`
`