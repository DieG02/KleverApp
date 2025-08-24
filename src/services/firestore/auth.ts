import { t } from 'i18next';
import Toast from 'react-native-toast-message';
import auth, {
  GoogleAuthProvider,
  getAuth,
  signInWithCredential,
  FirebaseAuthTypes,
} from '@react-native-firebase/auth';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

export const AuthWithGoogle = async () => {
  try {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({
      showPlayServicesUpdateDialog: true,
    });

    const signInResult = await GoogleSignin.signIn();
    console.log({ signInResult });
    let idToken = signInResult.data?.idToken;
    if (!idToken) {
      throw new Error('No ID token found');
    }

    // Sign-in the user with the credential
    const googleCredential = GoogleAuthProvider.credential(
      signInResult.data?.idToken,
    );
    return signInWithCredential(getAuth(), googleCredential);
  } catch (error: any) {
    console.log(error);
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
  credentials: any,
  register: boolean,
) => {
  try {
    if (register) {
      const userCredentials = await auth().createUserWithEmailAndPassword(
        credentials.email,
        credentials.password,
      );
      await userCredentials.user.sendEmailVerification();
      return userCredentials;
    } else {
      const userCredentials = await auth().signInWithEmailAndPassword(
        credentials.email,
        credentials.password,
      );
      return userCredentials;
    }
  } catch (error: any) {
    const code = error.code;
    Toast.show({
      text1: 'Error',
      text2: t([`toast.auth.email.${code}`, 'toast.auth.email.DEFAULT']),
      type: 'error',
    });
  }
};

export const AuthLogOut = async () => {
  const user = auth().currentUser;
  // Show popup or not before init new login
  if (user?.displayName) GoogleSignin.revokeAccess();
  return await auth().signOut();
};

interface CredentialsProps {
  email: string;
  password: string;
  confirm: string;
}
export const VerifyCredentials = (credentials: CredentialsProps): boolean => {
  const { password, confirm } = credentials;
  const minLength = 8;

  // Password validation rules
  const validationRules = {
    minLength: password.length >= minLength,
    // hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    // hasNumber: /\d/.test(password),
    // hasLowerCase: /[a-z]/.test(password),
    // hasUpperCase: /[A-Z]/.test(password),
    confirmPassword: password === confirm,
  };

  // Find the failed rule and return corresponding error code
  const failedRule = Object.entries(validationRules).find(
    ([rule, passed]) => !passed,
  );

  if (failedRule) {
    const [ruleName, _] = failedRule;
    const errorCodes: any = {
      minLength: 'PASSWORD_TOO_SHORT',
      // hasSpecialChar: 'PASSWORD_NO_SPECIAL_CHAR',
      // hasNumber: 'PASSWORD_NO_NUMBER',
      // hasLowerCase: 'PASSWORD_NO_LOWER_CASE',
      // hasUpperCase: 'PASSWORD_NO_UPPER_CASE',
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

interface RemoveCredentialsProps {
  success: boolean;
  id?: string;
  error?: any;
}
export const ReauthenticateUser = async (
  user: FirebaseAuthTypes.User,
  provider: string,
  password: string,
): Promise<{ success: boolean; provider?: string; error?: any }> => {
  const email = user.email!;

  try {
    if (provider === 'google.com') {
      const signInResult = await GoogleSignin.signIn();
      let idToken = signInResult.data?.idToken;
      if (!idToken) {
        throw new Error('No ID token found');
      }

      // Sign-in the user with the credential
      const googleCredential = GoogleAuthProvider.credential(
        signInResult.data?.idToken,
      );
      await user.reauthenticateWithCredential(googleCredential);
    } else {
      const credential = auth.EmailAuthProvider.credential(email, password);
      await user.reauthenticateWithCredential(credential);
    }
    return { success: true, provider };
  } catch (error) {
    return { success: false, error };
  }
};
