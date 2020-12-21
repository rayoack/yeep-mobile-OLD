import { takeLatest, all } from 'redux-saga/effects'
import { ExampleTypes } from 'App/Stores/Example/Actions'
import { StartupTypes } from 'App/Stores/Startup/Actions'
import { fetchUser } from './ExampleSaga'
import { startup } from './StartupSaga'
import { startStopChannel, watchChatRoom } from './SocketSaga'
import { Types as AuthTypes } from 'App/Stores/reducers/auth'

export default function* root() {
  yield all([
    /**
     * @see https://redux-saga.js.org/docs/basics/UsingSagaHelpers.html
     */
    startStopChannel(),
    watchChatRoom(),
    // Run the startup saga when the application starts
    takeLatest(StartupTypes.STARTUP, startup),
    // Call `fetchUser()` when a `FETCH_USER` action is triggered
    takeLatest(ExampleTypes.FETCH_USER, fetchUser),
  ])
}
