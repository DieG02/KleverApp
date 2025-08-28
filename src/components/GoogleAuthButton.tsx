import { StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { Heading, TouchableDebounce } from './common';
import { NavigationProps } from '../types/navigation';
import GoogleSVG from '../assets/svg/Google';
import { Colors } from '../styles/global';
import { AuthWithGoogle } from '../services/firestore/auth';
import { createNewUser } from '../services/firestore/user';
import { useLoading } from '../context/LoadingContext';
import Toast from 'react-native-toast-message';

interface GoogleAuthButtonProps {}
export default function GoogleAuthButton({}: GoogleAuthButtonProps) {
  const navigation = useNavigation<NavigationProps>();
  const { t } = useTranslation();
  const { setLoading } = useLoading();

  const handleGoogleAuth = async () => {
    try {
      setLoading(true);
      const userCredentials = await AuthWithGoogle();
      if (userCredentials) {
        const isNewUser = userCredentials?.additionalUserInfo?.isNewUser;
        if (isNewUser) {
          await createNewUser(userCredentials.user, 'google');
        }

        navigation.reset({ index: 0, routes: [{ name: 'AppStack' }] });
      }
    } catch (err: any) {
      console.error('SIGN_IN_ERROR:', err.message);
      Toast.show({
        text1: t('toast.auth.error.SIGN_IN.title'),
        text2: t('toast.auth.error.SIGN_IN.description'),
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableDebounce style={styles.container} onPress={handleGoogleAuth}>
      <GoogleSVG width={24} height={24} />
      <Heading color="Placeholder" type="Medium" style={styles.label}>
        {t('sign_in.google')}
      </Heading>
    </TouchableDebounce>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.Background,
    borderRadius: 25,
    marginBottom: 15,
    flexDirection: 'row',
  },
  label: {
    marginLeft: 15,
    fontSize: 13,
  },
});
