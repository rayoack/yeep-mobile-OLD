import * as React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { ApplicationStyles, Colors, Images, Metrics } from 'App/Theme'
import { translate } from '../../Locales'

const BottomModal = () => {

  return (
    <>

        <View
            style={{
                backgroundColor: 'white',
                padding: 16,
                height: 470,
            }}
        >
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Image style={{ width: 60, height: 6, marginBottom: 30 }} source={Images.push_rectangle}/>

                <Image style={{ width: 250, height: 250, marginBottom: 30 }} source={Images.profile_interface}/>
                
                <Text style={{ textAlign: 'center', fontSize: 16, fontFamily: 'Nunito Semi Bold', marginBottom: 30 }} >{translate('bottomModalRegisterAccount')}</Text>
            
                <TouchableOpacity style={{
                    height: 45,
                    width: 300,
                    borderRadius: 10,
                    backgroundColor: Colors.primary,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Text style={{ color: Colors.white }}>{translate('bottomModalRegisterAccountButtonText')}</Text>
                </TouchableOpacity>
            </View>
        </View>
    </>
  );
}

export default BottomModal;