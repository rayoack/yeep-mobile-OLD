import { Images } from 'App/Theme';
import { store } from '../Stores/CreateStore'
import { translate } from '../Locales'
import _ from 'lodash'

export const mapChatRooms = (chatRooms = [], request_type = 'organizer') => {
  if(!chatRooms.length) return []
  
  const state = store.getState();
  const user = state.auth.user;

  const mappedChatRooms = chatRooms.map(chatRoom => {
      let image = getRoomImage(chatRoom, request_type)

      let otherUser = chatRoom.host

      return {
        id: chatRoom.id,
        name: chatRoom.Reserve.Space && chatRoom.Reserve.Space.name ? chatRoom.Reserve.Space.name : '',
        roomName: chatRoom.room_name,
        title: request_type == 'organizer' ? chatRoom.Reserve.Space.name : chatRoom.organizer.name,
        subInfo: translate(chatRoom.type),
        last_message_target_id: chatRoom.last_message_target_id,
        read: chatRoom.last_message_target_id == user.id ?
            chatRoom.last_message_target_read
            : true,
        image,
        status: translate(chatRoom.Reserve.status),
        organizer: chatRoom.organizer,
        otherUser,
        updatedAt: chatRoom.updatedAt
        // users_id: []
      }
  })

  console.log({mappedChatRooms})

  return _.orderBy(mappedChatRooms, ['updatedAt'],['desc'])
}

const getRoomImage = (chatRoom, request_type) => {

    if(request_type === 'organizer') {
      return chatRoom.host.avatar && chatRoom.host.avatar.url ? chatRoom.host.avatar.url : Images.image_background;
    }

    if(request_type === 'host') {
      return chatRoom.organizer.avatar && chatRoom.organizer.avatar.url ? chatRoom.organizer.avatar.url : Images.image_background;
    }
  }