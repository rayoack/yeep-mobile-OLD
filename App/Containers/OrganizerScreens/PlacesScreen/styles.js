import styled from 'styled-components/native';
import { Colors } from 'App/Theme';

export const Container = styled.View`
  
`;


export const TextImageAdress = styled.Text `
  font-size: 25px;
  font-family: 'Nunito Semi Bold';
  text-align: center;
  width:300px;
  color: ${Colors.labelBlack};
`;
export const ImageAdress = styled.Image`
  height: 250px
  width: 250px;

`;

export const TouchableFilter = styled.TouchableOpacity`
  flex-direction: row;
  align-items:center;
  justify-content: center;
  width: 300px;
  height: 50px;
  background: ${Colors.white};
  border-radius: 20px;
  padding: 10px;  
  elevation: 1;
`;

export const TouchableFilterText = styled.Text`
  color: ${Colors.textDefault};
  margin-left: 5px;
  font-family: 'Nunito Semi Bold'
`;

export const Category = styled.TouchableOpacity `
   width: 140px;
   height: 140px;
   margin-top:40px;
   margin-right: 5px;
   margin-left: 20px;
   border-radius: 5px;
   elevation: 1;
`;
