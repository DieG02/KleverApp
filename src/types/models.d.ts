import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export interface UserModel {
  email: string;
  email_verified: boolean;
  display_name: string;
  avatar: string | null;
  birthday: Date | null;
  phone: string | null;
  locale: string;
  gender: 'male' | 'female' | null;
  provider: 'email' | 'google';
  created_at: FirebaseFirestoreTypes.DocumentFieldType;
  updated_at: FirebaseFirestoreTypes.DocumentFieldType;
}

export interface BoardModel {
  user_id: string;
  id: string;
  title: string;
  description?: string;
  category?: string; // TODO: Set categories enum
  total: number;
  current: number;
  created_at: FirebaseFirestoreTypes.DocumentFieldType;
  updated_at: FirebaseFirestoreTypes.DocumentFieldType;
}

export interface ItemModel {
  parent_id: string;
  id: string;
  label: string;
  checked: boolean;
  created_at: FirebaseFirestoreTypes.DocumentFieldType;
}
