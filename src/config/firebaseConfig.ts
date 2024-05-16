import * as admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

const app = admin.initializeApp({
  credential: admin.credential.cert(require('./satupintu-otp-firebase-adminsdk-c9a8o-e058e28ec0.json')),
  databaseURL: 'https://satupintu_app.firebaseio.com',
});

const messaging = admin.messaging();

export { app, messaging };
