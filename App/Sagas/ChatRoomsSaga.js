import { eventChannel } from 'redux-saga';
import { all, call, put, select, take, takeLatest, fork, cancelled, race, delay } from 'redux-saga/effects';
import { store } from '../Stores/CreateStore'
import api from '../Services/api'
import { Types as ChatRoomsTypes } from '../Stores/reducers/chatRoomsReducer'
import { mapChatRooms } from '../Services/chatRooms'


export function* getChatRoomsList({payload}) {
    try {
        console.log('okkkk')
        yield put({type: ChatRoomsTypes.SET_CHAT_ROOMS_LOADING, payload: true});

        const state = store.getState();
        const user = state.auth.user;

        if(!user) return

        const request_type = user.role === 'organizer' ? 'organizer' : 'host' ;
        
        const response = yield call([api, 'get'], `/room/${user.id}/${payload}`, { request_type }, { authorization: `Bearer ${user.token}` });
        
        const mappedChatRooms = yield mapChatRooms(response.data, request_type)

        console.log({mappedChatRooms})
        
        if(payload === 1) {
            yield put({type: ChatRoomsTypes.SET_CHAT_ROOMS, payload: mappedChatRooms});
            yield put({type: ChatRoomsTypes.SET_CHAT_ROOMS_LOADING, payload: false});
        } else {
            yield put({type: ChatRoomsTypes.SET_MORE_CHAT_ROOMS, payload: mappedChatRooms});
            yield put({type: ChatRoomsTypes.SET_CHAT_ROOMS_LOADING, payload: false});
        }
        

     } catch (e) {
        console.log({e})
        yield put({type: ChatRoomsTypes.SET_CHAT_ROOMS_ERROR, payload: true});
        yield put({type: ChatRoomsTypes.SET_CHAT_ROOMS_LOADING, payload: false});
     }
}