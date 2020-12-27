// import { eventChannel } from 'redux-saga';
// import { all, call, put, select, take, takeLatest, fork, cancelled, race, delay } from 'redux-saga/effects';
// // import { connect } from '../Services/socket'
// import io from 'socket.io-client'
// import BaseURL from '../Config/BaseURL'
// import { store } from '../Stores/CreateStore'
// import { Images } from '../Theme'
// // import { Types as ReserveTypes } from '../Stores/reducers/reservesReducer'
// import { Types as MessageTypes } from '../Stores/reducers/messagesReducer'
// import { Types as AuthTypes } from '../Stores/reducers/auth'

// export let connectedSocket

// export const connectToSocket = () => {
//     const state = store.getState();
//     const user = state.auth.user;

//     connectedSocket = io.connect(BaseURL.api,
//         {
//             forceNode: true,
//             query: {
//                 user_id: user.id
//             }
//         }
//     )

//     return new Promise(resolve => {
//         connectedSocket.on('connect', () => {
//             resolve(connectedSocket);
//         });
//     });
// }

// const disconnect = () => {
//     const state = store.getState();
//     const user = state.auth.user;

//     connectedSocket = io.connect(BaseURL.api,
//         {
//             forceNode: true,
//             query: {
//                 user_id: user.id
//             }
//         }
//     )

//     return new Promise((resolve) => {
//         connectedSocket.on('disconnect', () => {
//             resolve(connectedSocket);
//         });
//     });
// };
  
// const reconnect = () => {
//     const state = store.getState();
//     const user = state.auth.user;

//     connectedSocket = io.connect(BaseURL.api,
//         {
//             forceNode: true,
//             query: {
//                 user_id: user.id
//             }
//         }
//     )

//     return new Promise((resolve) => {
//         connectedSocket.on('reconnect', () => {
//         resolve(connectedSocket);
//         });
//     });
// };

// export function* subscribeUser(socket) {
//     return eventChannel((emitter) => {
      
//         const state = store.getState();
        
//         console.log('User connected on socket', socket)

//         socket.on('newMessageToRoom', newReserve => {
//             console.log('newMessageToRoom', newReserve)

//             const reserves = state.reservesReducer.reserves;

//             let reservesCopy = [...reserves]

//             let updatedReserves = reservesCopy.map(reserve => {
//                 if(reserve.id == newReserve.id) {
//                 reserve.read = newReserve.last_message_target_read
//                 reserve.last_message_target_id = newReserve.last_message_target_read
//                 reserve.updatedAt = newReserve.updatedAt
//                 }

//                 return reserve
//             })

//             return emitter({ type: ReserveTypes.SET_RESERVES, payload: [] })
//         });

//         socket.on('message', newMessage => {
//             console.log({newMessage})
//             const messages = state.messagesReducer.messages;

//             const mappedNewMessage = {
//                 _id: newMessage.id,
//                 text: newMessage.message,
//                 createdAt: newMessage.createdAt,
//                 user: {
//                 _id: newMessage.sender_id,
//                 name: newMessage.sender_name,
//                 avatar: newMessage.sender_avatar ? newMessage.sender_avatar : Images.profile_boy
//                 },
//                 Image: newMessage.Image
//             }

//             const updatedMessages = [mappedNewMessage, ...messages]

//             return emitter({ type: MessageTypes.SET_MESSAGES, payload: updatedMessages })
//         });

//         // socket.on('notification', notification => {
//         //     // this.updateReservesList(reserve)

//         //     return emitter({ type: , payload: })
//         // });

//         return () => {
//             socket.off();
//         };
//     })
// }

// // connection monitoring sagas
// const listenDisconnectSaga = function* () {
//     console.log('Disconnect socket')
//     while (true) {
//       yield call(disconnect);
//     }
// };
  
// const listenConnectSaga = function* () {
//     console.log('Reconnect socket')
//     while (true) {
//         yield call(reconnect);
//     }
// };

// export function* watchUserSubscription() {
//     try {
//         const {timeout} = yield race({
//             connected: call(connectToSocket),
//             timeout: delay(2000),
//         });
//         if (timeout) {
//             // yield put({type: SERVER_OFF});
//             console.log('Socket Time Out')
//         }

//         console.log('starting user subscription')

//         const socket = yield call(connectToSocket)
//         const socketChannel = yield call(subscribeUser, socket)

//         yield fork(listenDisconnectSaga);
//         yield fork(listenConnectSaga);
    
//         while (true) {
//             const action = yield take(socketChannel)
//             yield put(action)
//         }
        
//     } catch (error) {
//         console.log(error);
//     } finally {
//         if (yield cancelled()) {
//             console.log('Desconectado')
//             connectedSocket.disconnect(true);
//         }
//     }
// }

// export const startStopChannel = function* () {
//     while (true) {
//       yield take(AuthTypes.SUBSCRIBE_USER_REQUEST);
//       yield race({
//         task: call(watchUserSubscription),
//         cancel: take(AuthTypes.SIGN_OUT_REQUEST),
//       });
//     }
// };

// // ROOM FUNCTIONS
// export const startStopChat = function* () {
//     while (true) {
//         const action = yield take(MessageTypes.START_CHAT);
//         yield race({
//           task: call(watchChatRoom, action.payload),
//           cancel: take(MessageTypes.END_CHAT),
//         });
//       }
// };

// export function* watchChatRoom(roomName) {
//     try {
//         console.log('starting chat')

//         // const socket = yield call(connectToSocket)
//         // const socketChannel = yield call(subscribeUser, socket)

//         // yield fork(listenDisconnectSaga);
//         // yield fork(listenConnectSaga);
    
//         // while (true) {
//         //     const action = yield take(socketChannel)
//         //     yield put(action)
//         // }

//         connectedSocket.emit('joinRoom', roomName)
        
//     } catch (error) {
//         console.log(error);
//     } finally {
//         if (yield cancelled()) {
//             console.log('Leaving room')
//             connectedSocket.emit('leavesRoom', roomName)
//         }
//     }
// }