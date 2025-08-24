import { useEffect, useState } from 'react';
import {
  getFirestore,
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  FirebaseFirestoreTypes as NativeTypes,
} from '@react-native-firebase/firestore';
import { ItemModel } from '../types/models';

const useCollection = (parent_id: string) => {
  const [items, setItems] = useState<ItemModel[] | null>(null);

  useEffect(() => {
    const db = getFirestore();

    // build the query
    const itemsQuery = query(
      collection(db, 'items'),
      where('parent_id', '==', parent_id),
      orderBy('created_at', 'desc'),
    );

    // subscribe to snapshot
    const unsubscribe = onSnapshot(
      itemsQuery,
      (snapshot: NativeTypes.QuerySnapshot<NativeTypes.DocumentData>) => {
        const updatedItems: ItemModel[] = snapshot.docs.map(
          doc => doc.data() as ItemModel,
        );
        setItems(updatedItems);
      },
      e => console.error('Firestore error:', e),
    );

    return () => unsubscribe();
  }, [parent_id]);

  return { items };
};

export default useCollection;
