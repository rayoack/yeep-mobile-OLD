
export const Types = {
  SET_EVENT_FORM_DATA: 'manageUserReducer/SET_EVENT_FORM_DATA',
  SET_EVENT_ID: 'manageUserReducer/SET_EVENT_ID',
  SET_TITLE: 'manageUserReducer/SET_TITLE',
  SET_COVER_ID: 'manageUserReducer/SET_COVER_ID',
  SET_COVER: 'manageUserReducer/SET_COVER',
  SET_IMAGES: 'manageUserReducer/SET_IMAGES',
  SET_FIRST_STEP: 'manageUserReducer/SET_FIRST_STEP',
  CLEAR_EVENT_FORM: 'manageUserReducer/CLEAR_EVENT_FORM',
}

export const Creators = {
  setEventFormData: (payload) => ({
    type: Types.SET_EVENT_FORM_DATA,
    payload
  }),
  setEventId: (payload) => ({
    type: Types.SET_EVENT_ID,
    payload
  }),
  setTitle: (payload) => ({
    type: Types.SET_TITLE,
    payload
  }),
  setCoverId: (payload) => ({
    type: Types.SET_COVER_ID,
    payload
  }),
  setCover: (payload) => ({
    type: Types.SET_COVER,
    payload
  }),
  setImages: (payload) => ({
    type: Types.SET_IMAGES,
    payload
  }),
  setFirstStep: (payload) => ({
    type: Types.SET_FIRST_STEP,
    payload
  }),
  clearEventForm: (payload) => ({
    type: Types.CLEAR_EVENT_FORM,
    payload
  }),
}

const INITIAL_STATE = {
  event: {
    id: null,
    title: '',
    category: '',
    estimated_audience: 0,
    logo: null,
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

    case Types.SET_EVENT_ID:
      return {
        ...state,
          event: {
            ...event,
            id: action.payload
          }
      }

    case Types.SET_TITLE:
      return {
        ...state,
          event: {
            ...event,
            title: action.payload
          }
      }

    case Types.SET_COVER_ID:
      return {
        ...state,
          event: {
            ...event,
            logo: action.payload
          }
      }

    case Types.SET_COVER:
      return {
        ...state,
          event: {
            ...event,
            event_logo: action.payload
          }
      }

    case Types.SET_IMAGES:
      return {
        ...state,
          event: {
            ...event,
            event_images: action.payload
          }
      }

    case Types.SET_FIRST_STEP:
      return {
        ...state,
          event: {
            ...event,
            title: action.payload.title,
            category: action.payload.category,
            estimated_audience: action.payload.estimated_audience,
          }
      }

    case Types.CLEAR_EVENT_FORM:
      return INITIAL_STATE

    default:
      return state
  }
}