
export const Types = {
    SET_ACCOUNT_FORM_DATA: 'manageAccountReducer/SET_ACCOUNT_FORM_DATA',
    SET_ACCOUNT_ID: 'manageAccountReducer/SET_ACCOUNT_ID',
    SET_ACCOUNT_TYPE: 'manageAccountReducer/SET_ACCOUNT_TYPE',
    SET_ACCOUNT_USER_ID: 'manageAccountReducer/SET_ACCOUNT_USER_ID',
    SET_ACCOUNT_REGISTER_STEP: 'manageAccountReducer/SET_ACCOUNT_REGISTER_STEP',
    SET_ACCOUNT_DATE_OF_BIRTH: 'manageAccountReducer/SET_ACCOUNT_DATE_OF_BIRTH',
    CLEAR_ACCOUNT_FORM: 'manageAccountReducer/CLEAR_ACCOUNT_FORM',
    SET_PF_ACCOUNT_FIRST_STEP: 'manageAccountReducer/SET_PF_ACCOUNT_FIRST_STEP',
    SET_PJ_ACCOUNT_FIRST_STEP: 'manageAccountReducer/SET_PJ_ACCOUNT_FIRST_STEP',
    SET_PF_ACCOUNT_SECOND_STEP: 'manageAccountReducer/SET_PF_ACCOUNT_SECOND_STEP',
    SET_PJ_ACCOUNT_SECOND_STEP: 'manageAccountReducer/SET_PJ_ACCOUNT_SECOND_STEP',
    SET_PJ_ADRESS_STEP: 'manageAccountReducer/SET_PJ_ADRESS_STEP',
    SET_BANK_ACCOUNT_STEP: 'manageAccountReducer/SET_BANK_ACCOUNT_STEP',
    SET_BANK_ID: 'manageAccountReducer/SET_BANK_ID',
    SET_BANK_NUMBER: 'manageAccountReducer/SET_BANK_NUMBER',
    SET_BANK_FORM: 'manageAccountReducer/SET_BANK_FORM',
  }
  
  export const Creators = {
    setAccountFormData: (payload) => ({
      type: Types.SET_ACCOUNT_FORM_DATA,
      payload
    }),
    setAccountId: (payload) => ({
      type: Types.SET_ACCOUNT_ID,
      payload
    }),
    setAccountType: (payload) => ({
      type: Types.SET_ACCOUNT_TYPE,
      payload
    }),
    setAccountUserId: (payload) => ({
      type: Types.SET_ACCOUNT_USER_ID,
      payload
    }),
    setAccountRegisterStep: (payload) => ({
      type: Types.SET_ACCOUNT_REGISTER_STEP,
      payload
    }),
    setAccountDateOfBirth: (payload) => ({
      type: Types.SET_ACCOUNT_DATE_OF_BIRTH,
      payload
    }),
    setPFAccountFirstStep: (payload) => ({
      type: Types.SET_PF_ACCOUNT_FIRST_STEP,
      payload
    }),
    setPJAccountFirstStep: (payload) => ({
      type: Types.SET_PJ_ACCOUNT_FIRST_STEP,
      payload
    }),
    setPFAccountSecondStep: (payload) => ({
      type: Types.SET_PF_ACCOUNT_SECOND_STEP,
      payload
    }),
    setPJAccountSecondStep: (payload) => ({
      type: Types.SET_PJ_ACCOUNT_SECOND_STEP,
      payload
    }),
    setPJAdressStep: (payload) => ({
      type: Types.SET_PJ_ADRESS_STEP,
      payload
    }),
    clearAccountForm: (payload) => ({
      type: Types.CLEAR_ACCOUNT_FORM,
      payload
    }),
    setBankId: (payload) => ({
      type: Types.SET_BANK_ID,
      payload
    }),
    setBankNumber: (payload) => ({
      type: Types.SET_BANK_NUMBER,
      payload
    }),
    setBankForm: (payload) => ({
      type: Types.SET_BANK_FORM,
      payload
    }),
  }
  
  const INITIAL_STATE = {
    account: {
        id: null,
        user_id: null,
        account_type: 0,
        cpf_cnpj: '',
        date_of_birth: '',
        phone_number: '',
        post_code: '',
        adress: '',
        adress_number: '',
        city: '',
        state: '',
        country: '',
        complement: '',
        business_area: null,
        business_url: null,
        company_type: null,
        trading_name: null,
        line_of_business: null,
        legal_representative_name: '',
        legal_representative_document: null,
        legal_representative_date_of_birth: null,
        account_status: '',
        default: false,
        register_step: 0,
    },
    bank: {
        id: null,
        bank_number: null,
        agency_number: null,
        account_number: null,
        account_complement_number: null,
        account_type: null,
        account_holder_name: null,
        account_holder_document: null,
        account_id: null,
    }
  }
  
  export default function manageAccountReducer(state = INITIAL_STATE, action) {
    const { account, bank } = state
  
    switch (action.type) {
      case Types.SET_ACCOUNT_FORM_DATA:
        return {
          ...state,
            account: action.payload
        }
  
      case Types.SET_ACCOUNT_ID:
        return {
          ...state,
            account: {
              ...account,
              id: action.payload
            }
        }
  
      case Types.SET_ACCOUNT_USER_ID:
        return {
          ...state,
            account: {
              ...account,
              user_id: action.payload
            }
        }
  
      case Types.SET_ACCOUNT_TYPE:
        return {
          ...state,
            account: {
              ...account,
              account_type: action.payload
            }
        }
  
      case Types.SET_ACCOUNT_REGISTER_STEP:
        return {
          ...state,
            account: {
              ...account,
              register_step: action.payload
            }
        }
  
      case Types.SET_ACCOUNT_DATE_OF_BIRTH:
        return {
          ...state,
            account: {
              ...account,
              date_of_birth: action.payload
            }
        }
  
      case Types.SET_BANK_ID:
        return {
            ...state,
            bank: {
                ...bank,
                id: action.payload
            }
        }
  
      case Types.SET_BANK_NUMBER:
        return {
            ...state,
            bank: {
                ...bank,
                bank_number: action.payload
            }
        }
        
      case Types.SET_BANK_FORM:
        return {
          ...state,
          bank: action.payload
        }
  
      case Types.SET_PF_ACCOUNT_FIRST_STEP:
        return {
          ...state,
            account: {
              ...account,
              legal_representative_name: action.payload.legal_representative_name,
              cpf_cnpj: action.payload.cpf_cnpj,
              date_of_birth: action.payload.date_of_birth,
              phone_number: action.payload.phone_number,
              register_step: account.register_step >= 1 ? account.register_step : 1
            }
        }
  
      case Types.SET_PJ_ACCOUNT_FIRST_STEP:
        return {
          ...state,
            account: {
              ...account,
              cpf_cnpj: action.payload.cpf_cnpj,
              trading_name: action.payload.trading_name,
              business_area: action.payload.business_area,
              company_type: action.payload.company_type,
              line_of_business: action.payload.line_of_business,
              register_step: account.register_step >= 1 ? account.register_step : 1
            }
        }
  
      case Types.SET_PF_ACCOUNT_SECOND_STEP:
        return {
          ...state,
            account: {
              ...account,
              adress: action.payload.adress,
              country: action.payload.country,
              state: action.payload.state,
              city: action.payload.city,
              adress_number: action.payload.adress_number,
              post_code: action.payload.post_code,
              complement: action.payload.complement,
              register_step: account.register_step >= 2 ? account.register_step : 2
            }
        }
  
      case Types.SET_PJ_ACCOUNT_SECOND_STEP:
        return {
          ...state,
            account: {
              ...account,
              legal_representative_name: action.payload.legal_representative_name,
              legal_representative_document: action.payload.legal_representative_document,
              legal_representative_date_of_birth: action.payload.legal_representative_date_of_birth,
              phone_number: action.payload.phone_number,
              register_step: account.register_step >= 2 ? account.register_step : 2
            }
        }
  
      case Types.SET_PJ_ADRESS_STEP:
        return {
          ...state,
            account: {
              ...account,
              adress: action.payload.adress,
              country: action.payload.country,
              state: action.payload.state,
              city: action.payload.city,
              adress_number: action.payload.adress_number,
              post_code: action.payload.post_code,
              complement: action.payload.complement,
              register_step: account.register_step >= 3 ? account.register_step : 3
            }
        }
  
      case Types.CLEAR_ACCOUNT_FORM:
        return INITIAL_STATE
  
      default:
        return state
    }
  }