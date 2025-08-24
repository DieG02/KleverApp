import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { UserModel } from './models';

type UserRef = FirebaseFirestoreTypes.DocumentReference;
export interface SessionProps {
  user: UserModel | null;
  ref: UserRef | null;
}

export interface CollectionProps {
  total: number | null,
  current: number | null,
}