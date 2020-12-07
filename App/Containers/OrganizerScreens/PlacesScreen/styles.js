import styled from 'styled-components/native';

export const Container = styled.View`
  
`;


export const TextImageAdress = styled.Text `
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  width:250px;
`;
export const ImageAdress = styled.Image`
  height: 250px
  width: 250px;

`;

export const TouchableFilter = styled.TouchableOpacity`
  flex-direction: row;
  align-items:center;
  width: 350px;
  height:30px;
  background: #eeeeee;
  border-radius:5px;
  padding-left:10px;  
`;

export const TouchableFilterText = styled.Text`
  color: gray;
  margin-left: 5px;
`;

export const Category = styled.TouchableOpacity `
   width: 140px;
   height: 140px;
   margin-top:40px;
   margin-right: 5px;
   margin-left: 20px;
   border-radius: 5px;
`;
