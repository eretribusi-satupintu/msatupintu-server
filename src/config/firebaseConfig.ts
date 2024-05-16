import * as admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

const app = admin.initializeApp({
  credential: admin.credential.cert({
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY,
    projectId: process.env.FIREBASE_PROJECT_ID,
  }),
  databaseURL: 'https://satupintu_app.firebaseio.com',
});

const messaging = admin.messaging();

export { app, messaging };
