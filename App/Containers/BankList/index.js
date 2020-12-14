import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import SearchInput, { createFilter } from 'react-native-search-filter';
import { connect } from 'react-redux'
import { JUNO_BASIC_AUTHORIZATION, JUNO_PRIVATE_TOKEN } from 'react-native-dotenv';
import axios from 'axios';

import { Colors } from 'App/Theme';
import { HeaderWithBackButton, AnimationLoading } from '../../Components'

import api from '../../Services/api'
import { Creators as ManagerAccountActions } from '../../Stores/reducers/manageAccountReducer'
import { translate } from '../../Locales';

const KEYS_TO_FILTERS = ['name'];

class BankList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: '',
            loading: '',
            banks: [],
            loading: false,
        }
    }

    componentDidMount() {
        this.loadBanksList()
    }

    loadBanksList = async () => {
        try {
            this.setState({ loading: true })

            const { data } = await api.post('/payments/access-token', {}, {
                authorization: `Bearer ${this.props.user.token}`
            })
            
            let config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${data.token}`,
                    'X-Api-Version': 2,
                }
            }

            const junoUrlBase = data.environment === 'development' ?
                'https://sandbox.boletobancario.com' :
                'https://api.juno.com.br'

            
                
            const response = await axios.get(`${junoUrlBase}/api-integration/data/banks`, config)

            this.setState({ banks: response.data._embedded.banks, loading: false })
        } catch (error) {
            console.log(error)
            this.setState({ loading: false })
        } 
    }

    selectBank = async (bank) => {
        const setFieldValue = this.props.navigation.getParam('setFieldValue', () => null)
        console.log(this.props.setBankNumber)
        await this.props.setBankNumber(bank.number)
        await setFieldValue('bank_number', bank.number)
        this.props.navigation.goBack()
    }

    searchUpdated(term) {
        this.setState({ searchTerm: term })
    }

    render() {
        const filteredBanks = this.state.banks.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))
        return (
        <View style={styles.container}>
            <HeaderWithBackButton navigation={this.props.navigation}/>
            <SearchInput 
                onChangeText={(term) => { this.searchUpdated(term) }} 
                style={styles.searchInput}
                placeholder={translate('bankSearch')}
            />
            {this.state.loading ? (
                <AnimationLoading
                    loading={this.state.loading}
                />
            ) : (
                <ScrollView>
                {filteredBanks.map(bank => {
                    return (
                    <TouchableOpacity
                        key={bank.id}
                        style={styles.bankItem}
                        onPress={() => this.selectBank(bank)}
                    >
                        <View>
                            <Text style={{ fontFamily: 'Nunito Semi Bold' }}>{bank.name}</Text>
                            <Text style={styles.bankSubject}>{bank.number}</Text>
                        </View>
                    </TouchableOpacity>
                    )
                })}
                </ScrollView>
            )}
        </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start'
  },
  bankItem:{
    borderBottomWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.3)',
    padding: 10
  },
  bankSubject: {
    color: 'rgba(0,0,0,0.5)'
  },
  searchInput:{
    padding: 10,
    height: 60,
    borderColor: '#CCC',
    borderWidth: 1,
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    borderRadius: 20,
    fontSize: 14,
    fontFamily: 'Nunito Semi Bold',
    backgroundColor: Colors.white,
    color: Colors.textDefault,
    elevation: 1
  }
});

const mapStateToProps = (state) => ({
    user: state.auth.user
})

export default connect(mapStateToProps, {
    ...ManagerAccountActions
})(BankList)