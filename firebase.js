// firebase.js
import { initializeApp, getApps } from 'firebase/app';
import { firebaseConfig } from './firebaseConfig';

// Ensure Firebase is initialized only once
let firebaseApp;

if (getApps().length === 0) {
  firebaseApp = initializeApp(firebaseConfig);
} else {
  firebaseApp = getApps()[0];
}

export default firebaseApp;
