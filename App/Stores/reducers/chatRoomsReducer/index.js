export const Types = {
    SET_MORE_CHAT_ROOMS: 'chatRoomsReducer/SET_MORE_CHAT_ROOMS',
    SET_CHAT_ROOMS: 'chatRoomsReducer/SET_CHAT_ROOMS',
    GET_CHAT_ROOMS: 'chatRoomsReducer/GET_CHAT_ROOMS',
    SET_CHAT_ROOMS_ERROR: 'chatRoomsReducer/SET_CHAT_ROOMS_ERROR',
    SET_CHAT_ROOMS_LOADING: 'chatRoomsReducer/SET_CHAT_ROOMS_LOADING',
    CLEAN_CHAT_ROOMS: 'chatRoomsReducer/CLEAN_CHAT_ROOMS',
};

export const Creators = {
    setMoreChatRooms: (payload) => ({
      type: Types.SET_MORE_CHAT_ROOMS,
      payload
    }),
    setChatRooms: (payload) => ({
      type: Types.SET_CHAT_ROOMS,
      payload
    }),
    getChatRooms: (payload) => ({
      type: Types.GET_CHAT_ROOMS,
      payload
    }),
    setChatRoomsError: (payload) => ({
      type: Types.SET_CHAT_ROOMS_ERROR,
      payload
    }),
    setChatRoomsLoading: (payload) => ({
      type: Types.SET_CHAT_ROOMS_LOADING,
      payload
    }),
    cleanChatRooms: (payload) => ({
      type: Types.CLEAN_CHAT_ROOMS,
      payload
    }),
}

const INITIAL_STATE = {
    chatRooms: [],
    chatRoomsError: false,
    chatRoomsLoading: false
};

export default function chatRoomsReducer(state = INITIAL_STATE, action) {
  const { chatRooms } = state

  switch (action.type) {
    case Types.SET_MORE_CHAT_ROOMS:
      return {
          ...state,
          chatRooms: [...chatRooms, ...action.payload]
      }

    case Types.SET_CHAT_ROOMS:
      return {
          ...state,
          chatRooms: action.payload
      }

    case Types.SET_CHAT_ROOMS_ERROR:
      return {
          ...state,
          chatRoomsError: action.payload
      }

    case Types.SET_CHAT_ROOMS_LOADING:
      return {
          ...state,
          chatRoomsLoading: action.payload
      }

    case Types.CLEAN_CHAT_ROOMS:
      return INITIAL_STATE
  
    default:
      return state;
  }
}
