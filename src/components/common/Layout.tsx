import {
  SafeAreaView,
  StatusBar,
  StatusBarProps,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { Colors, ColorPalette } from '../../styles/global';

interface LayoutProps extends StatusBarProps {
  backgroundColor?: ColorPalette;
  style?: ViewStyle;
  children?: React.ReactNode;
}
export default function Layout({
  backgroundColor = 'White',
  style = {},
  barStyle = 'dark-content',
  children,
  ...props
}: LayoutProps) {
  const styles = StyleSheet.compose(
    {
      flex: 1,
      backgroundColor: Colors[backgroundColor],
    },
    style,
  );
  return (
    <SafeAreaView style={styles} {...props}>
      <StatusBar
        backgroundColor={Colors[backgroundColor]}
        barStyle={barStyle}
      />
      {children}
    </SafeAreaView>
  );
}
