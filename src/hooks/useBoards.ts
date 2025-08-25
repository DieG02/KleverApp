import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from '@react-native-firebase/auth';
import {
  getFirestore,
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  FirebaseFirestoreTypes as NativeTypes,
} from '@react-native-firebase/firestore';
import { BoardModel } from '../types/models';

const useBoards = () => {
  const [boards, setBoards] = useState<BoardModel[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const db = getFirestore();
    const auth = getAuth();
    let unsubFirestore: (() => void) | null = null;

    // 1. Auth Subscription
    const unsubAuth = onAuthStateChanged(auth, user => {
      // 2. Always kill any previous Firestore listener
      if (unsubFirestore) {
        unsubFirestore();
        unsubFirestore = null;
      }

      if (user?.uid) {
        const boardsQuery = query(
          collection(db, 'boards'),
          where('user_id', '==', user.uid),
          orderBy('created_at', 'desc'),
        );
        setIsLoading(true);

        // 3. Firestore subscription
        unsubFirestore = onSnapshot(
          boardsQuery,
          (snapshot: NativeTypes.QuerySnapshot<NativeTypes.DocumentData>) => {
            const updatedBoards: BoardModel[] = snapshot.docs.map(
              doc => doc.data() as BoardModel,
            );
            setBoards(updatedBoards);
            setIsLoading(false);
          },
          e => {
            console.error('Firestore error:', e);
            setError(e);
            setIsLoading(false);
          },
        );
      } else {
        // User logged out, clear boards
        setBoards(null);
        setError(null);
        setIsLoading(false);
      }
    });

    // 4. Return one cleanup that tears down both listeners
    return () => {
      if (unsubFirestore) unsubFirestore();
      unsubAuth();
    };
  }, []);
  return { boards, isLoading, error };
};

export default useBoards;
