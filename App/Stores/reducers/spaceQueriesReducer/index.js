
export const Types = {
  SET_SPACE_QUERIES: 'manageUserReducer/SET_SPACE_QUERIES',
  SET_SPACE_COUNTRY_QUERY: 'manageUserReducer/SET_SPACE_COUNTRY_QUERY',
  SET_SPACE_STATE_QUERY: 'manageUserReducer/SET_SPACE_STATE_QUERY',
  SET_SPACE_CATEGORY_QUERY: 'manageUserReducer/SET_SPACE_CATEGORY_QUERY',
  SET_SPACE_HAS_PARKING_QUERY: 'manageUserReducer/SET_SPACE_HAS_PARKING_QUERY',
  SET_SPACE_CHARGE_TYPE_QUERY: 'manageUserReducer/SET_SPACE_CHARGE_TYPE_QUERY',
  SET_SPACE_CAPACITY_MIN_QUERY: 'manageUserReducer/SET_SPACE_CAPACITY_MIN_QUERY',
  SET_SPACE_CAPACITY_MAX_QUERY: 'manageUserReducer/SET_SPACE_CAPACITY_MAX_QUERY',
  SET_SPACE_MONETARY_UNIT_QUERY: 'manageUserReducer/SET_SPACE_MONETARY_UNIT_QUERY',
  SET_SPACE_PRICE_MIN_QUERY: 'manageUserReducer/SET_SPACE_PRICE_MIN_QUERY',
  SET_SPACE_PRICE_MAX_QUERY: 'manageUserReducer/SET_SPACE_PRICE_MAX_QUERY',
  CLEAR_SPACE_QUERIES: 'manageUserReducer/CLEAR_SPACE_QUERIES',
}

export const Creators = {
  setSpaceQueries: (payload) => ({
    type: Types.SET_SPACE_QUERIES,
    payload
  }),
  setSpaceCountryQuery: (payload) => ({
    type: Types.SET_SPACE_COUNTRY_QUERY,
    payload
  }),
  setSpaceStateQuery: (payload) => ({
    type: Types.SET_SPACE_STATE_QUERY,
    payload
  }),
  setSpaceCategoryQuery: (payload) => ({
    type: Types.SET_SPACE_CATEGORY_QUERY,
    payload
  }),
  setSpaceHasParkingQuery: (payload) => ({
    type: Types.SET_SPACE_HAS_PARKING_QUERY,
    payload
  }),
  setSpaceChargeTypeQuery: (payload) => ({
    type: Types.SET_SPACE_CHARGE_TYPE_QUERY,
    payload
  }),
  setSpaceCapacityMinQuery: (payload) => ({
    type: Types.SET_SPACE_CAPACITY_MIN_QUERY,
    payload
  }),
  setSpaceCapacityMaxQuery: (payload) => ({
    type: Types.SET_SPACE_CAPACITY_MAX_QUERY,
    payload
  }),
  setSpaceMonetaryUnitQuery: (payload) => ({
    type: Types.SET_SPACE_MONETARY_UNIT_QUERY,
    payload
  }),
  setSpacePriceMinQuery: (payload) => ({
    type: Types.SET_SPACE_PRICE_MIN_QUERY,
    payload
  }),
  setSpacePriceMaxQuery: (payload) => ({
    type: Types.SET_SPACE_PRICE_MAX_QUERY,
    payload
  }),
  clearSpaceQueries: (payload) => ({
    type: Types.CLEAR_SPACE_QUERIES,
    payload
  }),
}

const INITIAL_STATE = {
  queries: {
    country: '',
    state: '',
    category: '',
    hasParking: '',
    chargeType: '',
    capacityMin: '',
    capacityMax: '',
    monetaryUnit: '',
    priceMin: '',
    priceMax: ''
  }
}

export default function spaceQueriesReducer(state = INITIAL_STATE, action) {
  const { queries } = state

  switch (action.type) {
    case Types.SET_SPACE_QUERIES:
      return {
        ...state,
          queries: action.payload
      }

    case Types.SET_SPACE_COUNTRY_QUERY:
      return {
        ...state,
          queries: {
            ...queries,
            country: action.payload
          }
      }

    case Types.SET_SPACE_STATE_QUERY:
      return {
        ...state,
          queries: {
            ...queries,
            state: action.payload
          }
      }

    case Types.SET_SPACE_CATEGORY_QUERY:
      return {
        ...state,
          queries: {
            ...queries,
            category: action.payload
          }
      }

    case Types.SET_SPACE_HAS_PARKING_QUERY:
      return {
        ...state,
          queries: {
            ...queries,
            hasParking: action.payload
          }
      }

    case Types.SET_SPACE_CHARGE_TYPE_QUERY:
      return {
        ...state,
          queries: {
            ...queries,
            chargeType: action.payload
          }
      }

    case Types.SET_SPACE_CAPACITY_MIN_QUERY:
      return {
        ...state,
          queries: {
            ...queries,
            capacityMin: action.payload
          }
      }

    case Types.SET_SPACE_CAPACITY_MAX_QUERY:
      return {
        ...state,
          queries: {
            ...queries,
            capacityMax: action.payload
          }
      }

    case Types.SET_SPACE_MONETARY_UNIT_QUERY:
      return {
        ...state,
          queries: {
            ...queries,
            monetaryUnit: action.payload
          }
      }

    case Types.SET_SPACE_PRICE_MIN_QUERY:
      return {
        ...state,
          queries: {
            ...queries,
            priceMin: action.payload
          }
      }

    case Types.SET_SPACE_PRICE_MAX_QUERY:
      return {
        ...state,
          queries: {
            ...queries,
            priceMax: action.payload
          }
      }
    case Types.SET_SPACE_PRICE_MAX_QUERY:
      return {
        ...state,
          queries: {
            ...queries,
            priceMax: action.payload
          }
      }

    case Types.CLEAR_SPACE_QUERIES:
      return INITIAL_STATE

    default:
      return state
  }
}