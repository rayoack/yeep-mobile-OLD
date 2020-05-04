import { combineReducers } from 'redux'
import configureStore from './CreateStore'
import rootSaga from 'App/Sagas'
import reducers from './reducers'

export default () => {
  // const rootReducer = combineReducers({
  //   /**
  //    * Register your reducers here.
  //    * @see https://redux.js.org/api-reference/combinereducers
  //    */
  //   example: ExampleReducer,
  // })

  return configureStore(reducers, rootSaga)
}
