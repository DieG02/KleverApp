import { t } from 'i18next';
import Toast from 'react-native-toast-message';
import {
  getFirestore,
  collection,
  doc,
  query,
  where,
  orderBy,
  getDocs,
  setDoc,
  writeBatch,
  serverTimestamp,
} from '@react-native-firebase/firestore';
import { getAuth } from '@react-native-firebase/auth';
import { BoardModel } from '../../types/models';

/* ------------------------------------------------------------------ */
/* 1. Get boards for the current user (sorted newest → oldest)        */
/* ------------------------------------------------------------------ */
export const getBoards = async (): Promise<BoardModel[]> => {
  const auth = getAuth();
  const user_id = auth.currentUser!.uid;

  const db = getFirestore();
  const q = query(
    collection(db, 'boards'),
    where('user_id', '==', user_id),
    orderBy('created_at', 'desc'),
  );

  const querySnapshot = await getDocs(q);

  const boards: BoardModel[] = [];
  querySnapshot.forEach((snap: any) => {
    boards.push(snap.data() as BoardModel);
  });

  return boards;
};

/* ------------------------------------------------------------------ */
/* 2. Add a new board                                                 */
/* ------------------------------------------------------------------ */
export const addBoard = async (board: Partial<BoardModel>): Promise<string> => {
  const auth = getAuth();
  const userId = auth.currentUser!.uid;

  const db = getFirestore();
  const boardRef = doc(collection(db, 'boards'));
  const boardId = boardRef.id;

  const boardData: BoardModel = {
    user_id: userId,
    id: boardId,
    title: board.title!,
    description: board.description || '',
    category: board.category || '',
    total: 0,
    current: 0,
    created_at: serverTimestamp(),
    updated_at: serverTimestamp(),
  };

  await setDoc(boardRef, boardData); // <- wait for the write
  return boardId;
};

/* ------------------------------------------------------------------ */
/* 3. Remove one or many boards (and their items)                       */
/* ------------------------------------------------------------------ */
export const removeBoard = async (ids: string | string[]) => {
  const idsArray = typeof ids === 'string' ? [ids] : ids;
  const db = getFirestore();

  for (const id of idsArray) {
    try {
      const itemsRef = collection(db, 'items');
      const q = query(itemsRef, where('parent_id', '==', id));
      const itemsSnapshot = await getDocs(q);

      const batch = writeBatch(db);

      itemsSnapshot.forEach((itemDoc: any) => {
        const itemRef = doc(db, 'items', itemDoc.id);
        batch.delete(itemRef);
      });

      const boardRef = doc(db, 'boards', id);
      batch.delete(boardRef);

      await batch.commit();
    } catch (error) {
      console.error(`Error removing board ${id}:`, error);
    }
  }

  Toast.show({
    text1: t('toast.user.board.delete.title'),
    text2: t('toast.user.board.delete.message'),
    type: 'success',
  });
};
