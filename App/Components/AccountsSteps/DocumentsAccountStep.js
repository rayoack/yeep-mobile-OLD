import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux'
import { NavigationEvents } from 'react-navigation';

import {
    AnimationLoading,
    MiniCard
} from '../index'

import api from '../../Services/api'
import { translate } from '../../Locales'
import { Creators as ManagerAccountActions } from '../../Stores/reducers/manageAccountReducer'

import {
    Container,
    StepTitle,
    StepDescription,
    DocumentsList
} from './styles';

const DocumentsAccountStep = ({
    user,
    JunoAccount,
    navigation
}) => {
    const [loading, setLoading] = useState(false)
    const [documents, setDocuments] = useState([])

    const loadDocumentsList = async () => {
        try {
            setLoading(true)

            const { data } = await api.get(`/payments/check-documents/${JunoAccount.id}`, {}, {
                authorization: `Bearer ${user.token}`
            })
            
            const documentsMapped = data.map(document => {
                if(document.type === 'ID' ||
                document.type === 'MEI_DOC') {
                    document.type = translate(document.type)
                }

                if(document.type === 'SELFIE') {
                    document.description = translate(document.description)
                }

                return document
            })

            setLoading(false)
            setDocuments(documentsMapped)
        } catch (error) {
            console.log({error})
            setLoading(false)
        } 
    }

    navigateToUpload = (document) => {
        navigation.push('UploadDocumentScreen', {
            document
        })
    }

    useEffect(() => {
        loadDocumentsList()
    }, [])

  return (
    <Container contentContainerStyle={{ paddingLeft: 20, paddingRight: 20, marginBottom: 30 }}>
        <NavigationEvents
          onWillFocus={() => loadDocumentsList()}
        />

        <StepTitle>{translate('verificationDocumentsStepTitle')}</StepTitle>
        <StepDescription>{translate('verificationDocumentsStepDescription')}</StepDescription>

        {loading ? (
            <AnimationLoading
                fullscreen={false}
                loading={loading}/>
        ) : (
            <>
                <DocumentsList
                    data={documents}
                    onRefresh={() => this.loadDocumentsList()} 
                    refreshing={false}
                    renderItem={({item}) => (
                        <MiniCard
                            title={item.type}
                            description={item.description}
                            subDescription={`${translate('status')}: ${translate(item.approvalStatus)}`}
                            onPress={(item.approvalStatus !== 'VERIFYING' && item.approvalStatus !== 'APPROVED') ?
                                () => navigateToUpload(item) :
                                () => null}
                        />
                    )}
                />
            </>
        )}
    </Container>
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
)(DocumentsAccountStep)
