import { combineReducers } from 'redux';

import auth from './auth';
import manageUserReducer from './manageUserReducer'
import manageEventReducer from './manageEventReducer'
import spaceQueriesReducer from './spaceQueriesReducer'

const reducers = combineReducers({
  auth,
  manageUserReducer,
  manageEventReducer,
  spaceQueriesReducer
});

export default reducers;