export const Types = {
    SET_RESERVES: 'reservesReducer/SET_RESERVES',
};

export const Creators = {
    setReserves: (payload) => ({
      type: Types.SET_RESERVES,
      payload
    }),
}

const INITIAL_STATE = {
    reserves: []
};

export default function reservesReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.SET_RESERVES:
        return {
            ...state,
            reserves: action.payload
        }

    default:
      return state;
  }
}
