
export const Types = {
    SET_RESERVE_FORM_DATA: 'manageReserveReducer/SET_RESERVE_FORM_DATA',
    SET_RESERVE_ID: 'manageReserveReducer/SET_RESERVE_ID',
    SET_RESERVE_MESSAGE: 'manageReserveReducer/SET_RESERVE_MESSAGE',
    SET_RESERVE_ESTIMATED_AUDIENCE: 'manageReserveReducer/SET_RESERVE_ESTIMATED_AUDIENCE',
    SET_RESERVE_STATUS: 'manageReserveReducer/SET_RESERVE_STATUS',
    SET_RESERVE_DATES: 'manageReserveReducer/SET_RESERVE_DATES',
    SET_RESERVE_SPACE_ID: 'manageReserveReducer/SET_RESERVE_SPACE_ID',
    SET_RESERVE_EVENT_ID: 'manageReserveReducer/SET_RESERVE_EVENT_ID',
    SET_EVENT_OF_RESERVE: 'manageReserveReducer/SET_EVENT_OF_RESERVE',
    SET_SPACE_OF_RESERVE: 'manageReserveReducer/SET_SPACE_OF_RESERVE',
    SET_SELECTED_DAY_INDEX: 'manageReserveReducer/SET_SELECTED_DAY_INDEX',
    SET_HOUR_TYPE: 'manageReserveReducer/SET_HOUR_TYPE',
    SET_SHOW_TOAST: 'manageReserveReducer/SET_SHOW_TOAST',
    SET_TOAST_TEXT: 'manageReserveReducer/SET_TOAST_TEXT',
    SET_TIME_PICKER_VISIBLE: 'manageReserveReducer/SET_TIME_PICKER_VISIBLE',
    CLEAR_RESERVE_FORM: 'manageReserveReducer/CLEAR_RESERVE_FORM',
  }
  
  export const Creators = {
    setReserveFormData: (payload) => ({
      type: Types.SET_RESERVE_FORM_DATA,
      payload
    }),
    setReserveId: (payload) => ({
      type: Types.SET_RESERVE_ID,
      payload
    }),
    setReserveMessage: (payload) => ({
      type: Types.SET_RESERVE_MESSAGE,
      payload
    }),
    setReserveEstimatedAudience: (payload) => ({
      type: Types.SET_RESERVE_ESTIMATED_AUDIENCE,
      payload
    }),
    setReserveStatus: (payload) => ({
      type: Types.SET_RESERVE_STATUS,
      payload
    }),
    setReserveDates: (payload) => ({
      type: Types.SET_RESERVE_DATES,
      payload
    }),
    setReserveSpaceId: (payload) => ({
      type: Types.SET_RESERVE_SPACE_ID,
      payload
    }),
    setReserveEventId: (payload) => ({
      type: Types.SET_RESERVE_EVENT_ID,
      payload
    }),
    setEventOfReserve: (payload) => ({
      type: Types.SET_EVENT_OF_RESERVE,
      payload
    }),
    setSpaceOfReserve: (payload) => ({
      type: Types.SET_SPACE_OF_RESERVE,
      payload
    }),
    setSelectedDayIndex: (payload) => ({
      type: Types.SET_SELECTED_DAY_INDEX,
      payload
    }),
    setHourType: (payload) => ({
      type: Types.SET_HOUR_TYPE,
      payload
    }),
    setShowToast: (payload) => ({
      type: Types.SET_SHOW_TOAST,
      payload
    }),
    setToastText: (payload) => ({
      type: Types.SET_TOAST_TEXT,
      payload
    }),
    setTimePickerVisible: (payload) => ({
      type: Types.SET_TIME_PICKER_VISIBLE,
      payload
    }),
    clearReserveForm: (payload) => ({
      type: Types.CLEAR_RESERVE_FORM,
      payload
    }),
  }
  
  const INITIAL_STATE = {
    reserve: {
      id: null,
      message: null,
      dates: [],
      estimated_audience: null,
      amount: 0,
      quantity: 0,
      space_id: null,
      event_id: null,
      status: "waitingForApproval",
    },
    eventOfReserve: null,
    spaceOfReserve: null,
    selectedDayIndex: null,
    hourType: null,
    showToast: false,
    toastText: '',
    isTimePickerVisible: false
  }
  
  export default function manageReserveReducer(state = INITIAL_STATE, action) {
    const { reserve } = state
  
    switch (action.type) {
      case Types.SET_RESERVE_FORM_DATA:
        return {
          ...state,
            reserve: action.payload
        }
  
      case Types.SET_RESERVE_ID:
        return {
          ...state,
            reserve: {
              ...reserve,
              id: action.payload
            }
        }
  
      case Types.SET_RESERVE_MESSAGE:
        return {
          ...state,
            reserve: {
              ...reserve,
              message: action.payload
            }
        }
  
      case Types.SET_RESERVE_ESTIMATED_AUDIENCE:
        return {
          ...state,
            reserve: {
              ...reserve,
              estimated_audience: action.payload
            }
        }
  
      case Types.SET_RESERVE_STATUS:
        return {
          ...state,
            reserve: {
              ...reserve,
              status: action.payload
            }
        }
  
      case Types.SET_RESERVE_DATES:
        return {
          ...state,
            reserve: {
              ...reserve,
              dates: action.payload
            }
        }
  
      case Types.SET_RESERVE_SPACE_ID:
        return {
          ...state,
            reserve: {
              ...reserve,
              space_id: action.payload
            }
        }
  
      case Types.SET_RESERVE_EVENT_ID:
        return {
          ...state,
            reserve: {
              ...reserve,
              event_id: action.payload
            }
        }
  
      case Types.SET_EVENT_OF_RESERVE:
        return {
          ...state,
          eventOfReserve: action.payload
        }
  
      case Types.SET_SPACE_OF_RESERVE:
        return {
          ...state,
          spaceOfReserve: action.payload
        }
  
      case Types.SET_SELECTED_DAY_INDEX:
        return {
          ...state,
          selectedDayIndex: action.payload
        }
  
      case Types.SET_HOUR_TYPE:
        return {
          ...state,
          hourType: action.payload
        }
  
      case Types.SET_SHOW_TOAST:
        return {
          ...state,
          showToast: action.payload
        }
  
      case Types.SET_TOAST_TEXT:
        return {
          ...state,
          toastText: action.payload
        }
  
      case Types.SET_TIME_PICKER_VISIBLE:
        return {
          ...state,
          isTimePickerVisible: action.payload
        }

      case Types.CLEAR_RESERVE_FORM:
        return INITIAL_STATE
  
      default:
        return state
    }
  }