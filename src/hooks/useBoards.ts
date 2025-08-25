import { useEffect, useState } from 'react';
import { getAuth } from '@react-native-firebase/auth';
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
    const auth = getAuth();
    const db = getFirestore();
    const user_id = auth.currentUser?.uid;

    if (!user_id) return;

    setIsLoading(true);

    try {
      // create the query
      const boardsQuery = query(
        collection(db, 'boards'),
        where('user_id', '==', user_id),
        orderBy('created_at', 'desc'),
      );

      // subscribe to snapshot
      const unsubscribe = onSnapshot(
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

      return () => unsubscribe();
    } catch (err) {
      console.error('Error fetching user boards:', err);
      setError(err);
      setIsLoading(false);
    }
  }, []);

  return { boards, isLoading, error };
};

export default useBoards;
