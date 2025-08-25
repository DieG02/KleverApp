import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';
import AsyncStorage from '@react-native-async-storage/async-storage';

import en from './en/common.json';
import es from './es/common.json';

const LANGUAGE_KEY = '@app:lang';

const resources = {
  en: { translation: en },
  es: { translation: es },
};

const languageDetector = {
  type: 'languageDetector' as const,
  async: true,
  detect: async (callback: (lng: string) => void) => {
    try {
      const saved = await AsyncStorage.getItem(LANGUAGE_KEY);
      if (saved) {
        return callback(saved);
      }
    } catch (e) {
      console.error('Error reading language', e);
    }

    // fallback al idioma del sistema
    const fallback = { languageTag: 'en' };
    const { languageTag } =
      RNLocalize.findBestLanguageTag(Object.keys(resources)) || fallback;

    callback(languageTag);
  },
  init: () => {},
  cacheUserLanguage: async (lng: string) => {
    try {
      await AsyncStorage.setItem(LANGUAGE_KEY, lng);
    } catch (e) {
      console.error('Error saving language', e);
    }
  },
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v4',
    resources,
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

export default i18n;
