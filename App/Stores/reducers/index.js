import { combineReducers } from 'redux';

import auth from './auth';
// import establishments from './establishments'
// import camera from './camera'

const reducers = combineReducers({
  auth,
});

export default reducers;