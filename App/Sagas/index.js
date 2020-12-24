import { takeLatest, all } from 'redux-saga/effects'
import { ExampleTypes } from 'App/Stores/Example/Actions'
import { StartupTypes } from 'App/Stores/Startup/Actions'
import { fetchUser } from './ExampleSaga'
import { startup } from './StartupSaga'
import { getChatRoomsList } from './ChatRoomsSaga'
import { Types as AuthTypes } from 'App/Stores/reducers/auth'
import { Types as ChatRoomsTypes } from 'App/Stores/reducers/chatRoomsReducer'

export default function* root() {
  yield all([
    /**
     * @see https://redux-saga.js.org/docs/basics/UsingSagaHelpers.html
     */
    takeLatest(ChatRoomsTypes.GET_CHAT_ROOMS, getChatRoomsList),
    // Run the startup saga when the application starts
    takeLatest(StartupTypes.STARTUP, startup),
    // Call `fetchUser()` when a `FETCH_USER` action is triggered
    takeLatest(ExampleTypes.FETCH_USER, fetchUser),
  ])
}
