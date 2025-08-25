import { AppStackParamList } from '../types/navigation';
import { createStackNavigator } from '@react-navigation/stack';
import { ChevronLeftIcon } from 'react-native-heroicons/mini';

import Home from '../screens/Home';
import Collection from '../screens/Collection';
import Settings from '../screens/Settings';
import { Colors, Poppins } from '../styles/global';
import { useTranslation } from 'react-i18next';
import DeleteAccount from '../screens/DeleteAccount';

const AppStack = createStackNavigator<AppStackParamList>();

export default function AppNavigator() {
  const { t } = useTranslation();
  return (
    <AppStack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: Colors.White,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTitleStyle: {
          fontFamily: Poppins.Semibold,
          fontSize: 16,
        },
        headerTintColor: Colors.Black,
        headerTitleAlign: 'center',
        headerBackImage: () => <ChevronLeftIcon color={Colors.Black} />,
      }}
    >
      <AppStack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <AppStack.Screen
        name="Collection"
        component={Collection}
        options={({ route }) => ({
          title: route.params.title,
        })}
      />
      <AppStack.Screen
        name="Settings"
        component={Settings}
        options={({ route }) => ({
          title: t('app.settings'),
        })}
      />
      <AppStack.Screen
        name="DeleteAccount"
        component={DeleteAccount}
        options={{ headerShown: false }}
      />
    </AppStack.Navigator>
  );
}
