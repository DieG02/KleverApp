import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import {
  getAuth,
  onAuthStateChanged,
  FirebaseAuthTypes,
} from '@react-native-firebase/auth';

import { SplashProps } from '../types/screens';
import { getDeviceLocale } from '../utils/app';
import { Heading, Layout } from '../components/common';

import styles from '../styles/screens/splash';

export default function Splash({ navigation }: SplashProps) {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const { i18n } = useTranslation();

  // Listen to auth state
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      setInitializing(false);
    });
    return unsubscribe;
  }, []);

  // Redirect once we know the user
  useEffect(() => {
    if (initializing) return;

    const locale = getDeviceLocale();
    i18n.changeLanguage(locale);

    if (!user) {
      navigation.replace('SignIn');
    } else {
      navigation.reset({ index: 0, routes: [{ name: 'AppStack' }] });
    }
  }, [initializing, user, i18n, navigation]);

  return (
    <Layout backgroundColor="White" barStyle="dark-content">
      <View style={styles.wrapper}>
        <View style={styles.brand}>
          <Heading color="Primary" size={32} type="Semibold">
            Klever
          </Heading>
        </View>
        <View style={styles.footer}>
          <Heading color="Primary" size={12}>
            Powered by <Text style={styles.company}>Akira</Text>
          </Heading>
        </View>
      </View>
    </Layout>
  );
}
