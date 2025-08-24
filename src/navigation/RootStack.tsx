import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';

import AppStack from './AppStack';
import AuthStack from './AuthStack';

const RootStack = createStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen name="AuthStack" component={AuthStack} />
      <RootStack.Screen name="AppStack" component={AppStack} />
    </RootStack.Navigator>
  );
}
