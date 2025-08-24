import {
  Text,
  TextProps,
  TextStyle,
  StyleSheet,
  StyleProp,
} from 'react-native';
import { Colors, ColorPalette, Poppins, FontFamily } from '../../styles/global';

interface HeadingProps extends TextProps {
  type?: FontFamily;
  color?: ColorPalette;
  size?: number;
  style?: StyleProp<TextStyle>;
  children: React.ReactNode;
}

/**
 * Custom text component with `FontFamily` fixed
 * @param type Optional type of the font from PoppinsType
 * @param color Optional color of the text as ColorsType
 * @param size Optional number to set font size
 * @returns {JSX.Element} A JSX element representing the custom text
 */
export default function Heading(props: HeadingProps): React.JSX.Element {
  const {
    children,
    type = 'Regular',
    color = 'Text',
    size = 14,
    style,
    ...nativeProps
  } = props;
  const styles = StyleSheet.compose(
    {
      fontFamily: Poppins[type],
      color: Colors[color],
      fontSize: size,
    },
    style,
  );

  return (
    <Text style={styles} {...nativeProps}>
      {children}
    </Text>
  );
}
