// https://medium.com/integra%C3%A7%C3%A3o-de-pagamentos-com-mercado-pago-e-react/integra%C3%A7%C3%A3o-de-pagamentos-com-react-native-node-js-e-smartcheckout-do-mercado-pago-64eedbb0eae9

// import React, { useState } from 'react';
// import { Text, Alert, View, ActivityIndicator, TouchableOpacity } from 'react-native';
// import { MainContainer, Title, InputText, PersonalButton, HeaderCheckout } from './styles';
// import { WebView } from 'react-native-webview';

// export default function Checkout() {

//     const [idPagamento, setIdPagamento] = useState("1")
//     const [emailPagamento, setEmailPagamento] = useState("meuemail@gmail.com")
//     const [descricaoPagamento, setDescricaoPagamento] = useState("Venda de produto digital")
//     const [vlrPagamento, setVlrPagamento] = useState("5.00")
//     const [showCheckout, setShowCheckout] = useState(false)

//     const stateChange = (state) => {
//         switch (state.title) {
//             case 'success':
//                 setShowCheckout(false)
//                 Alert.alert("Pagamento aprovado!", `Recebemos seu pagamento de ${vlrPagamento}`)
//                 break;
//             case 'pending':
//                 setShowCheckout(false)
//                 Alert.alert("Pagamento pendente!", `Seu pagamento de ${vlrPagamento} está pendente de processamento, assim que for processado seguiremos com o pedido!`)
//                 break;
//             case 'failure':
//                 setShowCheckout(false)
//                 Alert.alert("Pagamento não aprovado!", 'Verifique os dados e tente novamente')
//                 break;
//         }
//     }

//     if (!showCheckout) {
//         return (

//             <MainContainer>
//                 <Title>Protótipo de pagamento</Title>
//                 <InputText value={idPagamento} onChangeText={(text) => setIdPagamento(text)} placeholder={'Informe o id do produto'} keyboardType={'numeric'}></InputText>
//                 <InputText value={emailPagamento} onChangeText={(text) => setEmailPagamento(text)} placeholder={'Informe o e-mail do comprador'} keyboardType={'email-address'}></InputText>
//                 <InputText value={descricaoPagamento} onChangeText={(text) => setDescricaoPagamento(text)} placeholder={'Informe a descrição da venda'}></InputText>
//                 <InputText value={vlrPagamento} onChangeText={(text) => setVlrPagamento(text)} placeholder={'Informe o valor do produto'} keyboardType={'numeric'}></InputText>
//                 <PersonalButton onPress={() => setShowCheckout(true)}><Text>Pagar R$ {vlrPagamento}</Text></PersonalButton>

//             </MainContainer>
//         )
//     } else {

//         return (
//             <View style={{ flex: 1, justifyContent: 'center' }}>
//                 <HeaderCheckout>
//                     <TouchableOpacity onPress={() => setShowCheckout(false)}><Text style={{ fontSize: 20, color: 'white' }}>{"<<"}</Text></TouchableOpacity>
//                     <Title>Pagamento do pedido</Title>
//                 </HeaderCheckout>
//                 <WebView
//                     source={{ uri: `<url_api_git_pod>/payments/checkout/${idPagamento}/${emailPagamento}/${descricaoPagamento}/${vlrPagamento}` }}
//                     onNavigationStateChange={state => stateChange(state)}
//                     startInLoadingState={true}
//                     renderLoading={() => <ActivityIndicator></ActivityIndicator>}
//                 />

//             </View>
//         )

//     }
// }