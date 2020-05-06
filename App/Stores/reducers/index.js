import { combineReducers } from 'redux';

import auth from './auth';
import manageUserReducer from './manageUserReducer'
// import establishments from './establishments'
// import camera from './camera'

const reducers = combineReducers({
  auth,
  manageUserReducer,
});

export default reducers;