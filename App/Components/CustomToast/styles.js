import styled from 'styled-components/native'
import { StyleSheet } from 'react-native'

export const Container = styled.SafeAreaView`
  flex: 1;
  background: #343434;
  align-items: center;
  justify-content: center;
`
export const TextView = styled.Text`
  font-size: 18px;
  color: #fff;
  font-weight: bold;
`

export const styles = StyleSheet.create({
  toastContainer: {
    maxWidth: '80%',
    padding: 0,
    borderRadius: 10,
    backgroundColor: 'rgb(48, 49, 51)'
  },
  toastText: {
    paddingVertical: 11,
    paddingHorizontal: 16,
    padding: 0,
    fontSize: 16,
    color: 'white', 
    textAlign: 'center',
    fontFamily: 'SFProText-Medium',
  }
})
