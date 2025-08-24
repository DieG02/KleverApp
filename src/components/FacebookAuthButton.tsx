import { AuthRouteProps } from '../types/navigation';
import { useRoute } from '@react-navigation/native';
import { Pressable, StyleSheet, ViewStyle } from 'react-native';

import FacebookSVG from '../assets/svg/Facebook';
import { Colors } from '../styles/global';
import { Heading } from './common';

interface FacebookAuthButtonProps {
  style?: ViewStyle;
}
export default function FacebookAuthButton({ style }: FacebookAuthButtonProps) {
  const route = useRoute<AuthRouteProps<'SignUp'>>();
  const label =
    route.name === 'SignUp'
      ? 'Sign up with Facebook'
      : 'Continue with Facebook';

  return (
    <Pressable style={[styles.container, style]}>
      <FacebookSVG width={24} height={24} />
      <Heading size={13} style={{ marginLeft: 15 }}>
        {label}
      </Heading>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.Background,
    borderRadius: 25,
    marginBottom: 15,
    flexDirection: 'row',
  },
});
