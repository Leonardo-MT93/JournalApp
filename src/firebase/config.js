// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1JQXGsxe-9i0xvisFEKacTCf1zQRrPd8",
  authDomain: "journalapplication-b76eb.firebaseapp.com",
  projectId: "journalapplication-b76eb",
  storageBucket: "journalapplication-b76eb.appspot.com",
  messagingSenderId: "272335615901",
  appId: "1:272335615901:web:21f3008c00b668e5772174"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

export const FirebaseAuth = getAuth(FirebaseApp);

export const FirebaseDB = getFirestore(FirebaseApp);
