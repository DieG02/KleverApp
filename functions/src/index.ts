import { onCall, HttpsError } from 'firebase-functions/v2/https';
import * as admin from 'firebase-admin';

if (admin.apps.length === 0) {
  admin.initializeApp();
}
const db = admin.firestore();

export const removeUserCloud = onCall(
  { region: 'us-central1' /* add memory, concurrency, etc. if you need */ },
  async request => {
    if (!request.auth) {
      throw new HttpsError(
        'unauthenticated',
        'No Firebase ID token provided / rejected by Functions runtime.',
      );
    }
    try {
      const uid = request.auth.uid;
      const batch = db.batch();

      // 1. user doc
      batch.delete(db.doc(`users/${uid}`));

      // 2. boards that belong to this user
      const boardsSnap = await db
        .collection('boards')
        .where('user_id', '==', uid)
        .get();
      const boardIds = boardsSnap.docs.map(d => d.id);
      boardsSnap.docs.forEach(d => batch.delete(d.ref));

      // 3. items whose parent_id is one of those boards
      if (boardIds.length) {
        const itemsSnap = await db
          .collection('items')
          .where('parent_id', 'in', boardIds)
          .get();
        itemsSnap.docs.forEach(d => batch.delete(d.ref));
      }

      await batch.commit();

      // revoke tokens + delete auth account
      await admin.auth().revokeRefreshTokens(uid);
      await admin.auth().deleteUser(uid);

      return {
        uid,
        projectId: process.env.GCLOUD_PROJECT ?? 'unknown',
        timestamp: admin.firestore.Timestamp.now(),
      };
    } catch (e) {
      throw new HttpsError(
        'internal',
        'Could not reach Firestore: ' + (e as Error).message,
      );
    }
  },
);

export const debugAuth = onCall(
  { region: 'us-central1' /* add secrets, memory, etc. if needed */ },
  async request => {
    // 1. Auth check
    if (!request.auth) {
      throw new HttpsError(
        'unauthenticated',
        'No Firebase ID token provided / rejected by Functions runtime.',
      );
    }

    // 2. Firestore connectivity check
    try {
      const uid = request.auth.uid;
      const batch = db.batch();

      // 1. user doc
      batch.delete(db.doc(`users/${uid}`));

      await batch.commit();
    } catch (e) {
      throw new HttpsError(
        'internal',
        'Could not reach Firestore: ' + (e as Error).message,
      );
    }

    // 3. Debug payload
    return {
      uid: request.auth.uid,
      projectId: process.env.GCLOUD_PROJECT ?? 'unknown',
      timestamp: admin.firestore.Timestamp.now(),
    };
  },
);
