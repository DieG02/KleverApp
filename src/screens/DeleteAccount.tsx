import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import {
  CheckIcon,
  TrashIcon,
  ChevronRightIcon,
} from 'react-native-heroicons/mini';
import {
  Layout,
  Heading,
  Spacing,
  TouchableDebounce,
  PasswordField,
} from '../components/common';
import { Colors } from '../styles/global';
import styles from '../styles/screens/deleteaccount';
import { AppNavigationProps, AppRouteProps } from '../types/navigation';
import { ReauthenticateUser } from '../services/firestore/auth';
import { CommonActions } from '@react-navigation/native';
import { getAuth } from '@react-native-firebase/auth';
import Toast from 'react-native-toast-message';
import { useSession } from '../hooks';
import { deleteUserData } from '../services/firestore/user';
import { AuthProvidersState } from '../types';

interface DeleteAccountProps {
  navigation: AppNavigationProps;
  route: AppRouteProps<'DeleteAccount'>;
}

export default function DeleteAccount({
  navigation,
  route,
}: DeleteAccountProps) {
  const { t } = useTranslation();
  const { user } = useSession();
  const [password, setPassword] = useState<string>('');
  const [isActive, setActive] = useState<boolean>(false);
  const [provider, setProvider] = useState<AuthProvidersState>(null);
  const toggle = () => setActive(!isActive);

  const handleRedirect = () => navigation.goBack();

  const handleChange = (value: string) => setPassword(value);

  const handleDelete = async () => {
    try {
      const auth = getAuth();
      const currentUser = auth.currentUser;
      const user_id = currentUser?.uid;
      if (!currentUser || !user_id) throw new Error('User not logged in');

      const reauthResult = await ReauthenticateUser(
        currentUser,
        currentUser.providerData[0]?.providerId!,
        password,
      );
      if (!reauthResult.success) throw reauthResult.error;

      await deleteUserData()
        .then((r: any) => {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'AuthStack', params: { screen: 'SignIn' } }],
            }),
          );
        })
        .catch(err => console.error('❌ debugAuth:', err));
    } catch (error) {
      console.error('Error deleting account:', error);
      Toast.show({
        text1: 'Error',
        text2: t('toast.app.account_error'),
        type: 'error',
      });
    }
  };

  useEffect(() => {
    if (user) setProvider(user.provider);
  }, [user]);

  return (
    <Layout backgroundColor="White" barStyle="dark-content">
      <View style={styles.wrapper}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.icon}>
            <TrashIcon color={Colors.Danger} width={28} height={28} />
          </View>
          <Spacing size={25} />
          <View>
            <Heading type="Semibold" size={20}>
              <Text>{t('account.offboarding.delete.title.0')}</Text>
              <Text style={{ color: Colors.Danger }}>
                {t('account.offboarding.delete.title.1')}
              </Text>
              <Text>{t('account.offboarding.delete.title.2')}</Text>
            </Heading>
            <Spacing size={10} />

            <View>
              <View style={styles.contentItem}>
                <ChevronRightIcon color={'#666'} />
                <Heading style={styles.item}>
                  {t('account.offboarding.delete.access_data')}
                </Heading>
              </View>
              <Spacing size={8} />

              <View style={styles.contentItem}>
                <ChevronRightIcon color={'#666'} />
                <Heading style={styles.item}>
                  {t('account.offboarding.delete.stored_data')}
                </Heading>
              </View>
              <Spacing size={8} />

              <View style={styles.contentItem}>
                <ChevronRightIcon color={'#666'} />
                <Heading style={styles.item}>
                  {t('account.offboarding.delete.shared_data')}
                </Heading>
              </View>
            </View>
            <Spacing size={10} />

            <Pressable style={styles.condition} onPress={toggle}>
              <View style={[styles.base, isActive && styles.active]}>
                {isActive && <CheckIcon color={Colors.White} size={15} />}
              </View>
              <View style={styles.flex}>
                <Heading size={13}>
                  {t('account.offboarding.delete.warning')}
                </Heading>
              </View>
            </Pressable>
          </View>
          <Spacing size={30} />

          {user?.provider === 'email' && (
            <>
              <Heading>{t('account.offboarding.delete.password')}</Heading>
              <Spacing size={8} />
              <PasswordField
                placeholder={t('account.offboarding.delete.placeholder')}
                onChangeText={handleChange}
              />
            </>
          )}
        </ScrollView>

        <View style={styles.group}>
          <TouchableDebounce style={styles.cancel} onPress={handleRedirect}>
            <Heading type="Semibold" color="Primary">
              {t('account.offboarding.cancel')}
            </Heading>
          </TouchableDebounce>
          <TouchableDebounce
            disabled={user?.provider === 'email' && !password}
            style={[styles.confirm, !isActive && styles.hide]}
            onPress={handleDelete}
          >
            <Heading type="Semibold" color="Danger">
              {t('account.offboarding.confirm')}
            </Heading>
          </TouchableDebounce>
        </View>
      </View>
    </Layout>
  );
}
