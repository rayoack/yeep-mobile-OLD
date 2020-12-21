import { Images } from 'App/Theme';
import { store } from '../Stores/CreateStore'
const state = store.getState();

const user = state.auth.user;

export const mapReserves = (reserves = [], request_type = 'organizer') => {
  if(!reserves.length) return []

  const mappedReserves = reserves.map(reserve => {
      let subInfo = ''
      let image = getRoomImage(reserve, request_type)

      subInfo = `${reserve.Space.adress}, ${reserve.Space.city}, ${reserve.Space.state}, ${reserve.Space.country}`

      return {
        id: reserve.id,
        name: reserve.Space && reserve.Space.name ? reserve.Space.name : '',
        title: request_type == 'organizer' ? reserve.Space.name : reserve.organizer.name,
        subInfo,
        last_message_target_id: reserve.last_message_target_id,
        read: reserve.last_message_target_id == user.id ?
            reserve.last_message_target_read
            : true,
        image,
        status: reserve.status,
        updatedAt: reserve.updatedAt
        // users_id: []
      }
  })

  return _.orderBy(mappedReserves, ['updatedAt'],['asc'])
}

const getRoomImage = (reserve, request_type) => {

    if(request_type === 'organizer') {
      return reserve.host.avatar && reserve.host.avatar.url ? reserve.host.avatar.url : Images.image_background;
    }

    if(request_type === 'host') {
      return reserve.organizer.avatar && reserve.organizer.avatar.url ? reserve.organizer.avatar.url : Images.image_background;
    }
  }