import { useEffect, useState } from 'react';
import { Keyboard, Pressable, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { CommonActions } from '@react-navigation/native';
import SignUpBanner from '../assets/app/SignUpBanner';
import {
  Heading,
  MainButton,
  InputField,
  PasswordField,
  Spacing,
  Layout,
} from '../components/common';
import {
  AuthWithCredentials,
  VerifyCredentials,
} from '../services/firestore/auth';
import { createNewUser } from '../services/firestore/user';
import { AuthNavigationProps } from '../types/navigation';
import styles from '../styles/screens/signup';

interface CredentialsProps {
  email: string;
  password: string;
  confirm: string;
}

interface SignUpProps {
  navigation: AuthNavigationProps;
}
export default function SignUp({ navigation }: SignUpProps) {
  const [keyboardShown, setKeyboardShown] = useState(false);
  const { t } = useTranslation();
  const [credentials, setCredentials] = useState<CredentialsProps>({
    email: '',
    password: '',
    confirm: '',
  });

  const handleRedirect = () => {
    navigation.replace('SignIn');
  };

  const handleChange = (
    text: string,
    field: 'email' | 'password' | 'confirm',
  ) => {
    setCredentials({
      ...credentials,
      [field]: text,
    });
  };

  const handleSignUp = async () => {
    const verified = VerifyCredentials(credentials);
    if (!verified) return null;

    const userCredentials = await AuthWithCredentials(credentials, true);
    if (!userCredentials) return null;

    const isNewUser = userCredentials?.additionalUserInfo?.isNewUser;
    if (isNewUser) {
      await createNewUser(userCredentials.user, 'email');
      // TODO: Redirect to complete profile
    }

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
    <Layout backgroundColor='White' barStyle='dark-content'>
      <View style={styles.wrapper}>
        {!keyboardShown && (
          <View style={styles.banner}>
            <SignUpBanner height={190} />
          </View>
        )}

        <Heading size={20} type='Semibold' style={styles.header}>
          <Text>{t('sign_up.header')}</Text>
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
        />
        <PasswordField
          label={t('forms.auth.confirm.label')}
          placeholder={t('forms.auth.confirm.placeholder')}
          onChangeText={value => handleChange(value, 'confirm')}
        />
        <Spacing size={20} />

        <MainButton disabled={!credentials.email} onPress={handleSignUp}>
          {t('sign_up.action')}
        </MainButton>

        <Pressable onPress={handleRedirect} style={styles.footer}>
          <Heading type='Medium' color='Label' style={styles.link}>
            <Text>{t('sign_up.redirect.label')}</Text>
            <Text style={styles.hightlight}>{t('sign_up.redirect.to')}</Text>
          </Heading>
        </Pressable>
      </View>
    </Layout>
  );
}
