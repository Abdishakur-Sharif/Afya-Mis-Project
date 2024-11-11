import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyA5gUrLkV_vv4E_agTFLvaoxlxs2beAsws",
  authDomain: "afya-mis.firebaseapp.com",
  projectId: "afya-mis",
  storageBucket: "afya-mis.firebasestorage.app",
  messagingSenderId: "581258350164",
  appId: "1:581258350164:web:78b76d7bf99b214e0127c1"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
export const db = getFirestore(app);


