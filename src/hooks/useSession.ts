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
    let unsubFirestore: (() => void) | null = null;

    // 1. Auth Subscription
    const unsubAuth = onAuthStateChanged(
      auth,
      (user: FirebaseAuthTypes.User | null) => {
        // 2. Always kill any previous Firestore listener
        if (unsubFirestore) {
          unsubFirestore();
          unsubFirestore = null;
        }

        if (user?.uid) {
          const userRef: NativeTypes.DocumentReference = doc(
            db,
            'users',
            user.uid,
          );

          // 3. Firestore subscription
          unsubFirestore = onSnapshot(
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
        } else {
          setSession({ user: null, ref: null, loading: false, error: null });
        }
      },
    );

    // 4. Return one cleanup that tears down both listeners
    return () => {
      if (unsubFirestore) unsubFirestore();
      unsubAuth();
    };
  }, []);

  return session;
};

export default useSession;
