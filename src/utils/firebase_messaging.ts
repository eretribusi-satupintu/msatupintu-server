import { Message } from 'firebase-admin/lib/messaging/messaging-api';
import { messaging } from '../config/firebaseConfig';

export const sendNotification = async (title: string, body: string, token: string) => {
  const message: Message = {
    notification: {
      title: title,
      body: body,
      imageUrl: '../../public/assets/images/img_logo.png',
    },

    token: token,
  };
  console.log(message);
  return messaging
    .send(message)
    .then((response) => {
      console.log('Successfully sent message:', response);
    })
    .catch((error) => {
      console.log('Error sending message:', error);
    });
};
