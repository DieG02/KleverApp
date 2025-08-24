import { View, StyleSheet } from 'react-native';
import { BaseToast, BaseToastProps } from 'react-native-toast-message';
import { Colors, Poppins } from '../styles/global';
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
  XCircleIcon,
} from 'react-native-heroicons/mini';

interface Palette {
  [key: string]: { color: string; background: string };
}

const palette: Palette = {
  success: { color: Colors.Forest, background: Colors.Tea },
  info: { color: Colors.Primary, background: Colors.Light },
  warning: { color: Colors.Gold, background: Colors.Amber },
  error: { color: Colors.Danger, background: Colors.Pastel },
};

const renderIcon = (
  IconComponent: React.ComponentType<any>,
  color: string,
  background: string,
) => (
  <View style={[styles.icon, { backgroundColor: background }]}>
    <IconComponent height={24} width={24} color={color} />
  </View>
);

const createToast =
  (type: keyof Palette, IconComponent: React.ComponentType<any>) =>
  ({
    text1: title,
    text2: message,
    text1Style,
    text2Style,
    ...props
  }: BaseToastProps) => {
    const { color, background } = palette[type];
    return (
      <BaseToast
        style={styles.wrapper}
        contentContainerStyle={styles.container}
        renderLeadingIcon={() => renderIcon(IconComponent, color, background)}
        text1={title}
        text2={message}
        text2NumberOfLines={2}
        text1Style={[text1Style, styles.title]}
        text2Style={[text2Style, styles.message]}
        {...props}
      />
    );
  };

export const SuccessToast = createToast('success', CheckCircleIcon);
export const InfoToast = createToast('info', InformationCircleIcon);
export const WarningToast = createToast('warning', ExclamationCircleIcon);
export const ErrorToast = createToast('error', XCircleIcon);

const styles = StyleSheet.create({
  wrapper: {
    borderLeftWidth: 0,
    height: 50,
    alignItems: 'center',
    borderRadius: 10,
  },
  container: {
    paddingHorizontal: 0,
  },
  icon: {
    width: 40,
    height: 40,
    marginHorizontal: 10,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: Poppins.Semibold,
    color: Colors.Text,
  },
  message: {
    fontFamily: Poppins.Medium,
    color: Colors.Placeholder,
  },
});
