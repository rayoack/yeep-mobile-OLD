import { combineReducers } from 'redux';

import auth from './auth';
import manageUserReducer from './manageUserReducer'
import manageEventReducer from './manageEventReducer'

const reducers = combineReducers({
  auth,
  manageUserReducer,
  manageEventReducer
});

export default reducers;