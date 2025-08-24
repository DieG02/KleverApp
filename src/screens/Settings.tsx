import { useState } from 'react';
import { Image, SafeAreaView, StatusBar, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { CommonActions } from '@react-navigation/native';
import { Spacing, Heading } from '../components/common';
import AvatarSVG from '../assets/svg/Avatar';
import { useSession } from '../hooks/';
import {
  ArrowRightOnRectangleIcon,
  StarIcon,
  LanguageIcon,
  LockClosedIcon,
  MoonIcon,
  UserIcon,
  UserMinusIcon,
  HeartIcon,
} from 'react-native-heroicons/mini';
import NavItem from '../components/NavItem';
import { AuthLogOut } from '../services/firestore/auth';
import { LanguageModal } from '../components/modal/';
import { AppNavigationProps } from '../types/navigation';
import styles from '../styles/screens/settings';

interface SettingsProps {
  navigation: AppNavigationProps;
}
export default function Settings({ navigation }: SettingsProps) {
  const [localeModalVisible, setLocaleModalVisible] = useState<boolean>(false);
  const { user } = useSession();
  const { t } = useTranslation();

  const showLocaleModal = () => setLocaleModalVisible(true);
  const hideLocaleModal = () => setLocaleModalVisible(false);

  const handleLogout = async () => {
    await AuthLogOut();
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'AuthStack', params: { screen: 'SignIn' } }],
      }),
    );
  };

  const handleRedirect = () => {
    navigation.navigate('DeleteAccount');
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <StatusBar barStyle='dark-content' backgroundColor='#FFFFFF' />
      <View style={styles.header}>
        <View>
          {user?.avatar ? (
            <Image source={{ uri: user?.avatar }} style={styles.avatar} />
          ) : (
            <AvatarSVG width={100} height={100} />
          )}
        </View>
        <Spacing />

        <Heading type='Semibold' size={18}>
          {user?.display_name}
        </Heading>
        <Heading type='Medium' color='Label' size={13}>
          {user?.email}
        </Heading>
        <Spacing size={30} />
      </View>

      {/* TODO: Show modal to edit */}
      {/* <NavItem icon={UserIcon} label='Edit profile' arrow /> */}

      {/* TODO: Show language modal */}
      <NavItem
        icon={LanguageIcon}
        label={t('settings.nav.language')}
        onPress={showLocaleModal}
      />
      <LanguageModal
        visible={localeModalVisible}
        onRequestClose={hideLocaleModal}
      />

      {/* TODO: Include in next version */}
      {/* <NavItem icon={MoonIcon} label='Dark mode' />
      {user?.provider === 'email' && (
        <NavItem icon={LockClosedIcon} label='Change password' arrow />
      )} */}

      {/* TODO: Redirect to the store*/}
      <NavItem icon={HeartIcon} label={t('settings.nav.rate')} arrow />

      <NavItem
        icon={UserMinusIcon}
        label={t('settings.nav.delete')}
        onPress={handleRedirect}
        type='Danger'
        arrow
      />

      <NavItem
        icon={ArrowRightOnRectangleIcon}
        label={t('settings.nav.log_out')}
        onPress={handleLogout}
      />
    </SafeAreaView>
  );
}
