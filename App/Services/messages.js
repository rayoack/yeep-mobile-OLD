
import { Images } from 'App/Theme'

export const mapMessages = (messages) => {
    const mappedMessages = messages.map((msg, index) => {
        return {
            _id: msg.id,
            text: msg.message,
            createdAt: msg.createdAt,
            user: {
                _id: msg.sender.id,
                name: msg.sender.name,
                avatar: msg.sender.avatar ? msg.sender.avatar.url : Images.profile_boy
            },
            Image: msg.Image
        }
    })

    return mappedMessages
}