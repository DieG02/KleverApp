import { useEffect, useState } from 'react';
import { Keyboard, Pressable, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { LanguageIcon } from 'react-native-heroicons/mini';
import { CommonActions } from '@react-navigation/native';
import SignInBanner from '../assets/app/SignInBanner';
import {
  Heading,
  InputField,
  Layout,
  MainButton,
  PasswordField,
  Spacing,
} from '../components/common';
import LanguageModal from '../components/modal/Language';
import { GoogleAuthButton } from '../components';
import { AuthWithCredentials } from '../services/firestore/auth';
import { AuthNavigationProps } from '../types/navigation';
import styles from '../styles/screens/signin';
import { Colors } from '../styles/global';

interface CredentialsProps {
  email: string;
  password: string;
}

interface SignInProps {
  navigation: AuthNavigationProps;
}
export default function SignIn({ navigation }: SignInProps) {
  const [keyboardShown, setKeyboardShown] = useState(false);
  const [modal, setModal] = useState<boolean>(false);
  const { t } = useTranslation();
  const [credentials, setCredentials] = useState<CredentialsProps>({
    email: '',
    password: '',
  });

  const handleRedirect = () => {
    navigation.replace('SignUp');
  };

  const handleChange = (text: string, field: 'email' | 'password') => {
    setCredentials({
      ...credentials,
      [field]: text,
    });
  };

  const handleSignIn = async () => {
    const userCredentials = await AuthWithCredentials(credentials, false);
    if (!userCredentials) return null;
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'AppStack', params: { screen: 'Home' } }],
      }),
    );
  };

  useEffect(() => {
    const KeyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setKeyboardShown(true),
    );
    const KeyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setKeyboardShown(false),
    );
    return () => {
      KeyboardDidShowListener.remove();
      KeyboardDidHideListener.remove();
    };
  }, []);
  return (
    <Layout backgroundColor="White" barStyle="dark-content">
      <View style={styles.wrapper}>
        {!keyboardShown && (
          <>
            <Pressable onPress={() => setModal(true)} style={styles.locale}>
              <LanguageIcon color={Colors.Primary} />
            </Pressable>
            <LanguageModal
              visible={modal}
              onRequestClose={() => setModal(false)}
            />
            <View style={styles.banner}>
              <SignInBanner height={200} />
            </View>
          </>
        )}

        <Heading size={20} type="Semibold" style={styles.header}>
          <Text>{t('sign_in.header')}</Text>
          <Text style={styles.hightlight}>{t('app.name')}</Text>
        </Heading>

        <InputField
          label={t('forms.auth.email.label')}
          placeholder={t('forms.auth.email.placeholder')}
          onChangeText={value => handleChange(value, 'email')}
        />
        <PasswordField
          label={t('forms.auth.password.label')}
          placeholder={t('forms.auth.password.placeholder')}
          onChangeText={value => handleChange(value, 'password')}
          marginb={10}
        />

        {/* <Pressable onPress={onRedirect}> // TODO: Handle forgotten password
        <Heading type='Medium' color='Label' style={styles.password}>
          Forgot password?
        </Heading>
      </Pressable> */}

        <Spacing size={20} />

        <MainButton
          disabled={!credentials.email || !credentials.password}
          onPress={handleSignIn}
        >
          {t('sign_in.action')}
        </MainButton>
        <Spacing size={20} />
        <GoogleAuthButton />

        <Pressable onPress={handleRedirect} style={styles.footer}>
          <Heading type="Medium" color="Label" style={styles.link}>
            <Text>{t('sign_in.redirect.label')}</Text>
            <Text style={styles.hightlight}>{t('sign_in.redirect.to')}</Text>
          </Heading>
        </Pressable>
      </View>
    </Layout>
  );
}
