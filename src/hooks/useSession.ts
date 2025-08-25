import { useEffect, useState } from 'react';
import { getApp } from '@react-native-firebase/app';
import {
  getAuth,
  onAuthStateChanged,
  FirebaseAuthTypes,
} from '@react-native-firebase/auth';
import {
  getFirestore,
  doc,
  onSnapshot,
  FirebaseFirestoreTypes as NativeTypes,
} from '@react-native-firebase/firestore';

import { SessionProps } from '../types/hooks';

interface UseSessionReturn {
  user: SessionProps['user'];
  ref: SessionProps['ref'];
  loading: boolean;
  error: Error | null;
}

const defaultProps: UseSessionReturn = {
  user: null,
  ref: null,
  loading: true,
  error: null,
};

const useSession = (): UseSessionReturn => {
  const [session, setSession] = useState<UseSessionReturn>(defaultProps);

  useEffect(() => {
    const app = getApp();
    const auth = getAuth(app);
    const db = getFirestore(app);

    // auth state listener
    const unsubscribeAuth = onAuthStateChanged(
      auth,
      (firebaseUser: FirebaseAuthTypes.User | null) => {
        if (!firebaseUser) {
          setSession({ user: null, ref: null, loading: false, error: null });
          return;
        }

        const userRef: NativeTypes.DocumentReference = doc(
          db,
          'users',
          firebaseUser.uid,
        );

        // firestore subscription
        const unsubscribeUser = onSnapshot(
          userRef,
          userSnapshot => {
            const userData = userSnapshot.data() as any;
            setSession({
              user: userData,
              ref: userSnapshot.ref,
              loading: false,
              error: null,
            });
          },
          e => {
            console.error('Firestore error:', e);
            setSession(prev => ({ ...prev, loading: false, error: e }));
          },
        );

        return () => unsubscribeUser();
      },
    );

    return () => unsubscribeAuth();
  }, []);

  return session;
};

export default useSession;
