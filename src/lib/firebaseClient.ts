/* Client-side Firebase initialization (safe for Next.js) */
import { initializeApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey:
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY ??
    "AIzaSyCQKyv8Au15v_tTrrxRfEmsdv5tcCynKsk",
  authDomain:
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ??
    "canakkaleustam.firebaseapp.com",
  projectId:
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? "canakkaleustam",
  storageBucket:
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ??
    "canakkaleustam.firebasestorage.app",
  messagingSenderId:
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? "141448602191",
  appId:
    process.env.NEXT_PUBLIC_FIREBASE_APP_ID ??
    "1:141448602191:web:e1eeb52cd2552a637d403a",
  measurementId:
    process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID ?? "G-P7DS3T3SD1",
};

let firebaseApp;
if (!getApps().length) {
  firebaseApp = initializeApp(firebaseConfig);
} else {
  firebaseApp = getApps()[0];
}

export const app = firebaseApp;

// Analytics is browser-only
export const analytics =
  typeof window !== "undefined" ? getAnalytics(firebaseApp) : undefined;

export default { app, analytics };

