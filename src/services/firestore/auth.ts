import { t } from 'i18next';
import Toast from 'react-native-toast-message';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from '@react-native-firebase/auth';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import type { FirebaseAuthTypes } from '@react-native-firebase/auth';

export const AuthWithGoogle = async () => {
  try {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

    const signInResult = await GoogleSignin.signIn();
    const idToken = signInResult.data?.idToken;
    if (!idToken) throw new Error('No ID token found');

    const googleCredential = GoogleAuthProvider.credential(idToken);
    return await signInWithCredential(getAuth(), googleCredential);
  } catch (error: any) {
    const data = {
      [statusCodes.SIGN_IN_CANCELLED]: {
        title: 'Error',
        message: t('toast.auth.google.SIGN_IN_CANCELLED'),
        type: 'error',
      },
      [statusCodes.IN_PROGRESS]: {
        title: 'Info',
        message: t('toast.auth.google.IN_PROGRESS'),
        type: 'info',
      },
      [statusCodes.PLAY_SERVICES_NOT_AVAILABLE]: {
        title: 'Error',
        message: t('toast.auth.google.PLAY_SERVICES_NOT_AVAILABLE'),
        type: 'error',
      },
      default: {
        title: 'Warning',
        message: t('toast.auth.google.DEFAULT'),
        type: 'warning',
      },
    };
    const toastRef = data[error.code] || data.default;
    Toast.show({
      text1: toastRef.title,
      text2: toastRef.message,
      type: toastRef.type,
    });
  }
};

export const AuthWithCredentials = async (
  credentials: { email: string; password: string },
  register: boolean,
) => {
  const auth = getAuth();
  try {
    if (register) {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password,
      );
      await userCredential.user.sendEmailVerification();
      return userCredential;
    } else {
      return await signInWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password,
      );
    }
  } catch (error: any) {
    Toast.show({
      text1: 'Error',
      text2: t([`toast.auth.email.${error.code}`, 'toast.auth.email.DEFAULT']),
      type: 'error',
    });
  }
};

export const AuthLogOut = async () => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user?.providerData.some(p => p.providerId === 'google.com')) {
      // @ts-ignore (google-signin is optional)
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
    }

    // Sign out of Firebase (works for every provider)
    await signOut(auth);
  } catch (err) {
    console.error('Logout failed:', err);
    throw err;
  }
};

interface CredentialsProps {
  email: string;
  password: string;
  confirm: string;
}
export const VerifyCredentials = (credentials: CredentialsProps): boolean => {
  const { password, confirm } = credentials;
  const minLength = 8;

  const validationRules = {
    minLength: password.length >= minLength,
    confirmPassword: password === confirm,
  };

  const failedRule = Object.entries(validationRules).find(
    ([, passed]) => !passed,
  );

  if (failedRule) {
    const [ruleName] = failedRule;
    const errorCodes: Record<string, string> = {
      minLength: 'PASSWORD_TOO_SHORT',
      confirmPassword: 'PASSWORDS_DO_NOT_MATCH',
    };
    const code = errorCodes[ruleName];
    Toast.show({
      text1: 'Oops',
      text2: t(
        `toast.auth.password.${code}`,
        'toast.auth.password.UNKNOWN_ERROR',
      ),
      type: 'warning',
    });
    return false;
  }
  return true;
};

export const ReauthenticateUser = async (
  user: FirebaseAuthTypes.User,
  provider: string,
  password: string,
): Promise<{ success: boolean; provider?: string; error?: any }> => {
  try {
    if (provider === 'google.com') {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      const { data } = await GoogleSignin.signIn();
      if (!data?.idToken) throw new Error('No ID token found');

      const googleCredential = GoogleAuthProvider.credential(data.idToken);
      await reauthenticateWithCredential(user, googleCredential);
    } else {
      const credential = EmailAuthProvider.credential(user.email!, password);
      await reauthenticateWithCredential(user, credential);
    }
    return { success: true, provider };
  } catch (error) {
    return { success: false, error };
  }
};
