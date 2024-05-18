import * as admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

const app = admin.initializeApp({
  credential: admin.credential.cert({
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/gm, '\n') : undefined,
    projectId: process.env.FIREBASE_PROJECT_ID,
  }),
  databaseURL: 'https://satupintu_app.firebaseio.com',
});

const messaging = admin.messaging();

export { app, messaging };
