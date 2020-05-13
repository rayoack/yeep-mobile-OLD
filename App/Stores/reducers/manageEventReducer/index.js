
export const Types = {
  SET_EVENT_FORM_DATA: 'manageUserReducer/SET_EVENT_FORM_DATA',
  SET_TITLE: 'manageUserReducer/SET_TITLE',
}

export const Creators = {
  setEventFormData: (payload) => ({
    type: Types.SET_EVENT_FORM_DATA,
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
    location_name: '',
    adress: '',
    city: '',
    state: '',
    country: '',
    nomenclature: '',
    visible: false,
    Tickets: [],
    event_images: [],
    event_logo: {},
    Reserves: [],
    register_step: 0
    // CONTINUE HERE
  }
}

export default function manageEventReducer(state = INITIAL_STATE, action) {
  const { event } = state

  switch (action.type) {
    case Types.SET_EVENT_FORM_DATA:
      return {
        ...state,
          event: action.payload
      }

    case Types.SET_TITLE:
      return {
        ...state,
          event: {
            ...event,
            title: action.payload
          }
      }

    default:
      return state
  }
}