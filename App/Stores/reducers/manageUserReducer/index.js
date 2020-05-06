
export const Types = {
  SET_USER: 'manageUserReducer/SET_USER',
  SET_NAME: 'manageUserReducer/SET_NAME',
  SET_EMAIL: 'manageUserReducer/SET_EMAIL',
  SET_PASSWORD: 'manageUserReducer/SET_PASSWORD',
  SET_ROLE: 'manageUserReducer/SET_ROLE',
  SET_ADRESS: 'manageUserReducer/SET_ADRESS',
  SET_CITY: 'manageUserReducer/SET_CITY',
  SET_STATE: 'manageUserReducer/SET_STATE',
  SET_COUNTRY: 'manageUserReducer/SET_COUNTRY',
  SET_MONETARY_UNIT: 'manageUserReducer/SET_MONETARY_UNIT',
}

export const Creators = {
  setUser: (payload) => ({
    type: Types.SET_USER,
    payload
  }),
  setName: (payload) => ({
    type: Types.SET_NAME,
    payload
  }),
  setEmail: (payload) => ({
    type: Types.SET_EMAIL,
    payload
  }),
  setPassword: (payload) => ({
    type: Types.SET_PASSWORD,
    payload
  }),
  setRole: (payload) => ({
    type: Types.SET_ROLE,
    payload
  }),
  setAdress: (payload) => ({
    type: Types.SET_ADRESS,
    payload
  }),
  setCity: (payload) => ({
    type: Types.SET_CITY,
    payload
  }),
  setState: (payload) => ({
    type: Types.SET_STATE,
    payload
  }),
  setCountry: (payload) => ({
    type: Types.SET_COUNTRY,
    payload
  }),
  setMonetaryUnit: (payload) => ({
    type: Types.SET_MONETARY_UNIT,
    payload
  }),
}

const INITIAL_STATE = {
  user: {
    name: '',
    email: '',
    password: '',
    role: '',
    adress: '',
    city: '',
    state: '',
    country: '',
    monetary_unit: ''
  }
}

export default function manageUserReducer(state = INITIAL_STATE, action) {
  const { user } = state

  switch (action.type) {
    case Types.SET_USER:
      return {
        ...state,
          user: action.payload
      }

    case Types.SET_NAME:
      return {
        ...state,
          user: {
            ...user,
            name: action.payload
          }
      }

    case Types.SET_EMAIL:
      return {
        ...state,
          user: {
            ...user,
            email: action.payload
          }
      }

    case Types.SET_PASSWORD:
      return {
        ...state,
          user: {
            ...user,
            password: action.payload
          }
      }

    case Types.SET_ROLE:
      console.log('redux', action.payload)
      return {
        ...state,
          user: {
            ...user,
            role: action.payload
          }
      }

    case Types.SET_ADRESS:
      return {
        ...state,
          user: {
            ...user,
            adress: action.payload
          }
      }

    case Types.SET_CITY:
      return {
        ...state,
          user: {
            ...user,
            city: action.payload
          }
      }

    case Types.SET_STATE:
      return {
        ...state,
          user: {
            ...user,
            state: action.payload
          }
      }

    case Types.SET_COUNTRY:
      return {
        ...state,
          user: {
            ...user,
            country: action.payload
          }
      }

    case Types.SET_MONETARY_UNIT:
      return {
        ...state,
          user: {
            ...user,
            monetary_unit: action.payload
          }
      }

    default:
      return state
  }
}