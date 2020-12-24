import { eventChannel } from 'redux-saga';
import { all, call, put, select, take, takeLatest, fork, cancelled, race, delay } from 'redux-saga/effects';
import { store } from '../Stores/CreateStore'
import api from '../Services/api'
import { Types as ReserveTypes } from '../Stores/reducers/chatRoomsReducer'
import { mapChatRooms } from '../Services/chatRooms'


export function* getChatRoomsList(action) {
    try {
        const state = store.getState();
        const user = state.auth.user;

        if(!user) return

        const request_type = user.role === 'organizer' ? 'organizer' : 'host' ;
        
        // const reserves = yield call(Api.fetchUser, action.payload.userId);
        const response = yield call([api, 'get'], `/room/${user.id}/${action.payload}`, { request_type }, { authorization: `Bearer ${user.token}` });

        const mappedChatRooms = yield mapChatRooms(response.data, request_type)
        console.log({mappedChatRooms})

        if(action.payload === 1) {
            yield put({type: ReserveTypes.SET_CHAT_ROOMS, payload: mappedChatRooms});
        } else {
            yield put({type: ReserveTypes.SET_MORE_CHAT_ROOMS, payload: mappedChatRooms});
        }

     } catch (e) {
        yield put({type: ReserveTypes.SET_CHAT_ROOMS_ERROR, payload: true});
     }
}