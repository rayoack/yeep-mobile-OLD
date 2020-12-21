export const Types = {
    START_CHAT: 'messagesReducer/START_CHAT',
    END_CHAT: 'messagesReducer/END_CHAT',
    SET_MESSAGES: 'messagesReducer/SET_MESSAGES',
};

export const Creators = {
    startChat: (payload) => ({
      type: Types.START_CHAT,
      payload
    }),
    endChat: (payload) => ({
      type: Types.END_CHAT,
      payload
    }),
    setMessages: (payload) => ({
      type: Types.SET_MESSAGES,
      payload
    }),
}

const INITIAL_STATE = {
    messages: []
};

export default function messagesReducer(state = INITIAL_STATE, action) {
    const { messages } = state

    switch (action.type) {
        case Types.SET_MESSAGES:
            return {
                ...state,
                messages: action.payload
            }

        default:
            return state;
    }
}
