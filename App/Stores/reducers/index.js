import { combineReducers } from 'redux';

import auth from './auth';
import manageUserReducer from './manageUserReducer'
import manageEventReducer from './manageEventReducer'
import spaceQueriesReducer from './spaceQueriesReducer'
import manageAccountReducer from './manageAccountReducer'
import manageReserveReducer from './manageReserveReducer'
import messagesReducer from './messagesReducer'
import chatRoomsReducer from './chatRoomsReducer'

const reducers = combineReducers({
  auth,
  manageUserReducer,
  manageEventReducer,
  spaceQueriesReducer,
  manageAccountReducer,
  manageReserveReducer,
  messagesReducer,
  chatRoomsReducer
});

export default reducers;