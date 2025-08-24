import { Platform, NativeModules } from 'react-native';
import { Devices } from '../types';

const device = Platform.OS as Devices;

export const getDeviceLocale = (): string => {
  let nativeLocale = 'en-GB';

  if (device === 'ios') {
    const settings = NativeModules.SettingsManager?.settings;
    if (settings) {
      nativeLocale =
        settings.AppleLocale ?? settings.AppleLanguages?.[0] ?? 'en-GB';
    }
  } else {
    // Android locale
    nativeLocale = NativeModules.I18nManager?.localeIdentifier ?? 'en-GB';
  }

  // Normalize to BCP-47 format
  const locale = nativeLocale.replace('_', '-');

  // Custom handling
  if (locale.startsWith('es')) {
    return 'es-MX';
  } else {
    return 'en-GB';
  }
};

export const mapValueToBreakpoint = (value: number): number => {
  if (value <= 0) return 0;
  else if (value >= 100) return 100;

  const breakpoints = [0, 15, 30, 50, 75, 90, 100];
  let maxBreakpoint = 0;

  for (let i = 0; i < breakpoints.length; i++) {
    if (value < breakpoints[i]) break;
    maxBreakpoint = breakpoints[i];
  }

  return maxBreakpoint;
};
