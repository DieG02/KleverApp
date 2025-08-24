import { t } from 'i18next';
import Toast from 'react-native-toast-message';
import {
  getFirestore,
  doc,
  collection,
  writeBatch,
  increment,
  serverTimestamp,
  setDoc,
  updateDoc,
  deleteDoc,
} from '@react-native-firebase/firestore';
import { ItemModel } from '../../types/models';

/* ------------------------------------------------------------------ */
/* 1. Add a new item                                                    */
/* ------------------------------------------------------------------ */
export const addItem = async (parent_id: string, item: Partial<ItemModel>) => {
  const db = getFirestore();
  const batch = writeBatch(db);

  const boardRef = doc(db, 'boards', parent_id);
  const itemRef = doc(collection(db, 'items')); // auto-id
  const item_id = itemRef.id;

  const boardUpdate = {
    total: increment(1),
  };

  const itemData: ItemModel = {
    id: item_id,
    parent_id,
    label: item.label!,
    checked: item.checked || false,
    created_at: serverTimestamp(),
  };

  batch.set(itemRef, itemData);
  batch.update(boardRef, boardUpdate);

  await batch.commit();
  return itemRef;
};

/* ------------------------------------------------------------------ */
/* 2. Toggle item checked status                                        */
/* ------------------------------------------------------------------ */
export const toggleItemStatus = async (parent_id: string, item: ItemModel) => {
  const db = getFirestore();
  const batch = writeBatch(db);

  const boardRef = doc(db, 'boards', parent_id);
  const itemRef = doc(db, 'items', item.id);
  const incrementValue = item.checked ? -1 : 1;

  batch.update(itemRef, {
    checked: !item.checked,
  });
  batch.update(boardRef, {
    current: increment(incrementValue),
    updated_at: serverTimestamp(),
  });

  await batch.commit();
};

/* ------------------------------------------------------------------ */
/* 3. Remove an item                                                    */
/* ------------------------------------------------------------------ */
export const removeItem = async (item: ItemModel) => {
  try {
    const db = getFirestore();
    const batch = writeBatch(db);

    const itemRef = doc(db, 'items', item.id);
    const boardRef = doc(db, 'boards', item.parent_id);

    const incrementValue = item.checked ? -1 : 0;

    batch.delete(itemRef);
    batch.update(boardRef, {
      total: increment(-1),
      current: increment(incrementValue),
      updated_at: serverTimestamp(),
    });

    await batch.commit();

    Toast.show({
      text1: t('toast.user.collection.delete.title'),
      text2: t('toast.user.collection.delete.message'),
      type: 'success',
    });
  } catch (error) {
    console.error('Error removing item:', error);
  }
};
