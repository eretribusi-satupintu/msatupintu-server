import { Message } from 'firebase-admin/lib/messaging/messaging-api';
import { messaging } from '../config/firebaseConfig';

export const sendNotification = async (title: string, body: string, token: string) => {
  const message: Message = {
    notification: {
      title: title,
      body: body,
    },
    android: {
      priority: 'high',
    },

    token: token,
  };
  console.log(message);
  return messaging
    .send(message)
    .then((response) => {
      console.log('Successfully sent message:', response);
      return response;
    })
    .catch((error) => {
      console.log('Error sending message:', error);
      return error;
    });
};
