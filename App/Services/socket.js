// import io from 'socket.io-client'
// import BaseURL from '../Config/BaseURL'

// import { store } from '../Stores/CreateStore'
// const state = store.getState();

// const user = state.auth.user;

// export function connect() {
//     const socket = io(BaseURL.api,
//         {
//             query: {
//                 user_id: user.id
//             }
//         }
//     )

//     return new Promise(resolve => {
//         socket.on('connect', () => {
//             resolve(socket);
//         });
//     });
// }
