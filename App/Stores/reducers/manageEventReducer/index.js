
export const Types = {
  SET_EVENT: 'manageUserReducer/SET_EVENT',
  SET_TITLE: 'manageUserReducer/SET_TITLE',
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
  setEvent: (payload) => ({
    type: Types.SET_EVENT,
    payload
  }),
  setTitle: (payload) => ({
    type: Types.SET_TITLE,
    payload
  }),
}

const INITIAL_STATE = {
  event: {
    title: '',
    category: '',
    estimated_audience: '',
    logo: '',
    description: '',
    dates: [],
    online: false,
    adress: '',
    city: '',
    state: '',
    country: '',
    visible: false,
    Tickets: [],
    event_images: [],
    event_logo: {},
    reserves: []
    // CONTINUE HERE
  }
}

export default function manageUserReducer(state = INITIAL_STATE, action) {
  const { event } = state

  switch (action.type) {
    case Types.SET_EVENT:
      return {
        ...state,
          event: action.payload
      }

    case Types.SET_TITLE:
      return {
        ...state,
          event: {
            ...event,
            name: action.payload
          }
      }

    default:
      return state
  }
}