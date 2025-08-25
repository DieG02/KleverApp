import {
  TouchableOpacityProps,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import Heading from './Heading';
import { Colors } from '../../styles/global';
import TouchableDebounce from './TouchableDebounce';

interface ButtonProps extends TouchableOpacityProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}
export default function Button({ children, style, ...props }: ButtonProps) {
  const styles = StyleSheet.compose(
    {
      backgroundColor: Colors.Primary,
      borderRadius: 25,
      height: 48,
      justifyContent: 'center',
      alignItems: 'center',
    },
    style,
  );
  return (
    <TouchableDebounce style={styles} {...props}>
      <Heading color='White' type='Semibold'>
        {children}
      </Heading>
    </TouchableDebounce>
  );
}
