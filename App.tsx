import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

import { toastConfig } from './src/config/ToastManager';
import RootStack from './src/navigation/RootStack';
import './src/config/GoogleServices';
import './src/i18n';

function App() {
  return (
    <NavigationContainer>
      <RootStack />
      <Toast config={toastConfig} visibilityTime={3000} position="bottom" />
    </NavigationContainer>
  );
}

export default App;
