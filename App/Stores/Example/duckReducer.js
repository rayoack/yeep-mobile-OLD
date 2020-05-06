
export const Types = {
  SIGN_IN_REQUEST: 'auth/SIGN_IN_REQUEST',
}

export const Creators = {
  sigInRequest: (email, password) => ({
    type: Types.SIGN_IN_REQUEST,
    payload: {
      email,
      password
    }
  }),
}

const INITIAL_STATE = {
  user: {}
}

export default function auth(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.SET_AUTH_LOADING:
      return {
        ...state,
          loading: action.payload
      }

    default:
      return state
  }
}