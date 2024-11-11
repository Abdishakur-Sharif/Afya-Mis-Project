import { auth, db } from "./firebase";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  GoogleAuthProvider, 
  signInWithPopup, 
  sendPasswordResetEmail, 
  updatePassword,
  signOut
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

// --------------------- Authentication Functions ---------------------

export function doCreateUserWithEmailAndPassword(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function doSignInWithEmailAndPassword(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export const doSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  return result;
};

export const doSignOut = () => {
  return signOut(auth);
};

export const doPasswordReset = (email) => {
  return sendPasswordResetEmail(auth, email);
};

export const doPasswordChange = (password) => {
  return updatePassword(auth.currentUser, password);
};

// --------------------- Firestore Functions for User Role ---------------------

// Function to set user role in Firestore after sign-up
export const setUserRole = async (user, role) => {
  try {
    await setDoc(doc(db, 'users', user.uid), {
      email: user.email,
      role: role
    });
    console.log('User role set successfully');
  } catch (error) {
    console.error('Error setting user role:', error);
  }
};

// Function to get user role from Firestore
export const getUserRole = async (user) => {
  try {
    const docRef = doc(db, 'users', user.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data().role;
    } else {
      console.log('No such document!');
      return null;
    }
  } catch (error) {
    console.error('Error retrieving user role:', error);
    return null;
  }
};
