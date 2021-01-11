import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux'
import DocumentPicker from 'react-native-document-picker';
import { translate } from '../../../Locales';
import Icon from 'react-native-vector-icons/Feather'
import { Colors } from 'App/Theme'
import api from '../../../Services/api'
import axios from 'axios';

import { HeaderWithBackButton, CustomToast } from '../../../Components'

import {
  Container,
  UploadDocumentTitle,
  UploadDocumentDescription,
  UploadDocumentButton,
  AcceptedDocumentExtensions
} from './styles';

const UploadDocumentScreen = ({
  navigation,
  JunoAccount,
  user
}) => {
  const [documentToUpload, setDocumentToUpload] = useState({})
  const [loading, setLoading] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [toastText, setToastText] = useState('')

  useEffect(() => {
    const document = navigation.getParam('document')

    setDocumentToUpload(document)
  }, [])

  const showToastError = (text) => {
    setShowToast(true)
    setToastText(text)

    let interval = setInterval(() => {
      setShowToast(false)
      clearInterval(interval)
    }, 3000);
  }

  const pickFile = async () => {
    setLoading(true)

    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
      });

      uploadFile(res)
    } catch (err) {
      setLoading(false)

      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        console.log({err})
        showToastError(translate('errorOnUploadDocument'))
      }
    }
  }

  const uploadFile = async (file) => {
    try {
      const { data } = await api.post('/payments/access-token', {}, {
          authorization: `Bearer ${user.token}`
      })
      
      let config = {
          headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${data.token}`,
              'X-Api-Version': 2,
              'X-Resource-Token': JunoAccount.resource_token
          }
      }
  
      const junoUrlBase = data.environment === 'development' ?
          'https://sandbox.boletobancario.com/api-integration' :
          'https://api.juno.com.br'
  
      let formData = new FormData()
  
      formData.append('files', {
        uri: file.uri,
        name: file.name,
        type: file.type,
      })
          
      const response = await axios.post(`${junoUrlBase}/documents/${documentToUpload.id}/files`, formData, config)

      setLoading(false)
      navigation.goBack()
      
    } catch (error) {
      setLoading(false)
      showToastError(translate('errorOnUploadDocument'))
      console.log({error})
    }
  }

  return (
    <>
      <CustomToast
          show={showToast} 
          text={toastText} 
          duration={3000}
          positionValue={50}
      />
            

      <HeaderWithBackButton navigation={navigation}/>
      <Container>

        <View style={{ marginBottom: 20, alignItems: 'center' }}>
          <UploadDocumentTitle>{translate('uploadDocumenteTitle')}</UploadDocumentTitle>
          <UploadDocumentDescription>{translate('uploadDocumentsDescription')}</UploadDocumentDescription>
        </View>

        <View style={{ marginBottom: 20, marginTop: 40, alignItems: 'center' }}>
          <UploadDocumentTitle documentTitle={true}>{documentToUpload.type}</UploadDocumentTitle>
          <UploadDocumentDescription>{documentToUpload.description}</UploadDocumentDescription>

            <UploadDocumentButton onPress={() => pickFile()}>
              {loading ? (
                <ActivityIndicator size={20} color={Colors.textDefault} />
              ) : (
                <>
                  <Icon 
                    name="upload-cloud" 
                    size={20} 
                    color={Colors.textDefault}
                  />

                  <UploadDocumentDescription marginLeft={10}>{translate('uploadDocumentsButtonText')}</UploadDocumentDescription>
                </>
              )}
            </UploadDocumentButton>

            <AcceptedDocumentExtensions>{translate('acceptedDocumentExtensions')}</AcceptedDocumentExtensions>
        </View>

      </Container>
    </>
  );
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  account: state.manageAccountReducer.account,
  JunoAccount: state.manageAccountReducer.JunoAccount,
})

export default connect(
  mapStateToProps,
  {}
)(UploadDocumentScreen)