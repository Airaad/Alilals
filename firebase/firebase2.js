import { initializeApp } from "firebase/app";

const userFirebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_USER_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_USER_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_USER_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_USER_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_USER_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_USER_FIREBASE_APP_ID,
  databaseURL: process.env.NEXT_PUBLIC_USER_FIREBASE_DATABASE_URL,
};


export const UserApp = initializeApp(userFirebaseConfig, "UserApp");
