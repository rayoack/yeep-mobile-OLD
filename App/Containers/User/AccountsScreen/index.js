import React, { Component } from 'react'
import { Text, View, BackHandler } from 'react-native'
import { connect } from 'react-redux'
import { NavigationEvents } from 'react-navigation';
import { HeaderWithBackButton } from '../../../Components'
import api from '../../../Services/api'
import { translate } from '../../../Locales'
import { Colors } from 'App/Theme'

import { Creators as ManagerAccountActions } from '../../../Stores/reducers/manageAccountReducer'

import {
    AnimationLoading,
    MiniCard
} from '../../../Components'

import {
    Container,
    AccountsList,
    AccountTitle,
    AccountDescription,
    AccountsButton
} from './styles'

class AccountsScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            accounts: []
        }
    }
    
    componentDidMount = () => {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);

        this.loadUserAccounts()
    }

    handleBackButton = () => {
        this.props.navigation.goBack()
        return true;
    }

    loadUserAccounts = async () => {
        try {
            this.setState({ loading: true })
            
            const { data } = await api.get('/accounts', {}, {
                authorization: `Bearer ${this.props.user.token}`
            })

            this.setState({ accounts: data, loading: false })

        } catch (error) {
            this.setState({ loading: false })
            console.log({error})
        }
    }

    navigateToCreationAccount = (type) => {
        this.props.clearAccountForm();
        if(type === 'PF') {
            this.props.setAccountType('PF')
            this.props.navigation.navigate('RegisterAccountsSteps');
        }
    }

    navigateToEditAccount = (account) => {
        
        this.props.clearAccountForm();
        if(account.account_type === 'PF') {
            this.props.navigation.navigate('EditPFAccountScreen', {
                account
            });
        }
    }

    render() {
        return (
            <>
                <NavigationEvents
                    onWillFocus={() => this.loadUserAccounts()}
                    // onDidFocus={() => this.redirectIfLogged()}
                />
                {this.state.loading ? (
                    <AnimationLoading
                        fullscreen={true}
                        loading={this.state.loading}/>
                ) : (
                    <>
                        <HeaderWithBackButton navigation={this.props.navigation}/>
                        <Container contentContainerStyle={{ paddingLeft: 30, paddingRight: 30 }}>
                            <AccountsList
                                data={this.state.accounts}
                                onRefresh={() => this.loadUserAccounts()} 
                                refreshing={false}
                                renderItem={({item}) => (
                                    <MiniCard
                                        title={item.legal_representative_name}
                                        description={`${translate('type')}: ${item.account_type}`}
                                        subDescription={`${translate('status')}: ${(item.JunoAccount && item.JunoAccount.account_status) ? translate(item.JunoAccount.account_status) : translate('noStatusYet')}`}
                                        onPress={() => this.navigateToEditAccount(item)}
                                    />
                                )}
                                ListEmptyComponent={() => {
                                    return (
                                        <>
                                            <AccountTitle>{translate('accountsScreenTitle')}</AccountTitle>
                                            <AccountDescription>{translate('accountsScreenDescription')}</AccountDescription>
                                            <AccountsButton
                                                color={Colors.primary}
                                                onPress={() => this.navigateToCreationAccount('PF')}
                                            >
                                                <Text style={{ fontFamily:'Nunito Bold', fontSize: 18, color: Colors.white }}>
                                                    {translate('accountsScreenRegisterPFButtonText')}
                                                </Text>
                                            </AccountsButton>
                                            <AccountsButton
                                                color={Colors.terciary}
                                            >
                                                <Text style={{ fontFamily:'Nunito Bold', fontSize: 18, color: Colors.white }}>
                                                    {translate('accountsScreenRegisterPJButtonText')}
                                                </Text>
                                            </AccountsButton>
                                        </>
                                    )
                                }}
                            />
                        </Container>
                    </>
                )}
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.auth.user
  })
  
  export default connect(
    mapStateToProps,
    {
        ...ManagerAccountActions
    }
  )(AccountsScreen)
  