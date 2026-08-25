import { auth, db } from '@/config/firebaseConfig';
import { useAuthStore } from '@/store/useAuthStore';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithCredential,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { Platform } from 'react-native';

export interface UserProfileData {
  fullName: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  photoURL?: string | null;
}

export const registerWithEmailPassword = async (
  email: string,
  password: string,
  profileData: Omit<UserProfileData, 'email'>
) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;
  const token = await user.getIdToken();

  const userDocData: UserProfileData = {
    email: user.email || email,
    fullName: profileData.fullName,
    phone: profileData.phone || '',
    address: profileData.address || '',
    city: profileData.city || '',
    photoURL: profileData.photoURL || null,
  };

  // Crear documento en Firestore /users/{uid} respetando las reglas de seguridad
  await setDoc(doc(db, 'users', user.uid), userDocData);

  // Actualizar store global
  useAuthStore.getState().setToken(token);
  useAuthStore.getState().setUser({
    uid: user.uid,
    ...userDocData,
  });

  return user;
};

export const loginWithEmailPassword = async (
  email: string,
  password: string
) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;
  const token = await user.getIdToken();

  // Obtener perfil desde Firestore
  let userData: Record<string, unknown> = {
    uid: user.uid,
    email: user.email,
    fullName: user.displayName || '',
  };

  try {
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    if (userDoc.exists()) {
      userData = { uid: user.uid, ...userDoc.data() };
    }
  } catch (err) {
    console.warn('No se pudo obtener el perfil de Firestore:', err);
  }

  useAuthStore.getState().setToken(token);
  useAuthStore.getState().setUser(userData);

  return user;
};

export const loginWithGoogleFirebase = async (idToken?: string) => {
  let userCredential;

  if (Platform.OS === 'web' && !idToken) {
    const provider = new GoogleAuthProvider();
    userCredential = await signInWithPopup(auth, provider);
  } else if (idToken) {
    const credential = GoogleAuthProvider.credential(idToken);
    userCredential = await signInWithCredential(auth, credential);
  } else {
    throw new Error('No se proporcionó token de Google para plataforma nativa');
  }

  const user = userCredential.user;
  const token = await user.getIdToken();

  const userDocRef = doc(db, 'users', user.uid);
  const userDocSnap = await getDoc(userDocRef);

  let userData: Record<string, unknown>;

  if (!userDocSnap.exists()) {
    const newUserData: UserProfileData = {
      email: user.email || '',
      fullName: user.displayName || 'Usuario Google',
      photoURL: user.photoURL || null,
    };
    await setDoc(userDocRef, newUserData);
    userData = { uid: user.uid, ...newUserData };
  } else {
    userData = { uid: user.uid, ...userDocSnap.data() };
  }

  useAuthStore.getState().setToken(token);
  useAuthStore.getState().setUser(userData);

  return user;
};

export const logoutFirebase = async () => {
  await signOut(auth);
  useAuthStore.getState().logout();
};

export const resetPasswordEmail = async (email: string) => {
  await sendPasswordResetEmail(auth, email);
};
