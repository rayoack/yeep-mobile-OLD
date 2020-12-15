import { Images } from 'App/Theme';

const imageBackground = [
    Images.image_background_1,
    Images.image_background_2,
    Images.image_background_3,
    Images.image_background_4,
    Images.image_background_5,
    Images.image_background_6,
    Images.image_background_7,
    Images.image_background_8,
    Images.image_background_9,
]

export const getRandomBackgroundImage = () => {
    let randomIndex = Math.floor(Math.random() * (9 - 0)) + 0

    return imageBackground[randomIndex]
}