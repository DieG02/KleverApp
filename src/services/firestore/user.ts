import i18next, { t, changeLanguage } from 'i18next';
import Toast from 'react-native-toast-message';
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from '@react-native-firebase/firestore';
import { getAuth, signOut } from '@react-native-firebase/auth';
import { getFunctions, httpsCallable } from '@react-native-firebase/functions';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { UserModel } from '../../types/models';
import { AuthProviders } from '../../types';

/* ------------------------------------------------------------------ */
/* 1. Create a new user                                                 */
/* ------------------------------------------------------------------ */
export const createNewUser = async (user: any, provider: AuthProviders) => {
  const db = getFirestore();
  const userDocRef = doc(collection(db, 'users'), user.uid);

  const locale = i18next.language;
  const displayName =
    user.displayName?.split(' ')[0] || user.email.split('@')[0];

  const userData: UserModel = {
    email: user.email,
    display_name: displayName,
    locale,
    gender: null,
    birthday: null,
    provider,
    avatar: user?.photoURL, // TODO: Set a default avatar
    phone: user?.phoneNumber,
    email_verified: user.emailVerified,
    created_at: serverTimestamp(),
    updated_at: serverTimestamp(),
  };

  await setDoc(userDocRef, userData);
  return userDocRef;
};

/* ------------------------------------------------------------------ */
/* 2. Update the user’s locale                                          */
/* ------------------------------------------------------------------ */
export const updateLocale = async (locale: string) => {
  try {
    const currentLocale = i18next.language;
    if (currentLocale === locale) return;

    changeLanguage(locale);

    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const db = getFirestore();
      const userDocRef = doc(db, 'users', user.uid);
      await updateDoc(userDocRef, {
        locale,
        updated_at: serverTimestamp(),
      });
    }

    await AsyncStorage.setItem('@app:lang', locale);

    Toast.show({
      text1: t('toast.user.locale.update.title'),
      text2: t('toast.user.locale.update.message'),
      type: 'success',
    });
  } catch (error) {
    console.error('Error updating user locale:', error);
  }
};

/* ------------------------------------------------------------------ */
/* 3. Delete a user and all associated data                             */
/* ------------------------------------------------------------------ */
export const deleteUserData = async () => {
  const auth = getAuth();
  const fn = httpsCallable(getFunctions(), 'removeUserCloud');
  const response = await fn();
  await signOut(auth);
  return response;
};

export const debug = async () => {
  const auth = getAuth();
  console.log('🔐 UID:', auth.currentUser?.uid);
  console.log('🔐 token:', await auth.currentUser?.getIdToken());
  const fn = httpsCallable(getFunctions(), 'debugAuth');
  return await fn();
};
