import { StyleSheet, View, Modal, SafeAreaView, Pressable } from 'react-native';
import { Colors } from '../../styles/global';
import { Heading } from '../common';
import { updateLocale } from '../../services/firestore/user';
import { useTranslation } from 'react-i18next';

interface LanguageModalProps {
  visible: boolean;
  onRequestClose: () => void;
}

export default function LanguageModal({
  visible,
  onRequestClose,
}: LanguageModalProps) {
  const { t, i18n } = useTranslation();
  const options = {
    en: 'en-GB',
    es: 'es-MX',
  };

  const handleUpdate = async (locale: string) => {
    await updateLocale(locale);
    onRequestClose();
  };
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType='fade'
      onRequestClose={onRequestClose}
      statusBarTranslucent>
      <SafeAreaView style={styles.wrapper}>
        <View style={styles.container}>
          <Heading color='Placeholder' size={10} style={styles.title}>
            {t('modals.locale.label')}
          </Heading>

          <Pressable onPress={() => handleUpdate(options['en'])}>
            <View
              style={[
                styles.item,
                { marginBottom: 5 },
                i18n.language === options['en'] && styles.selected,
              ]}>
              <Heading
                type='Medium'
                style={styles.center}
                color={i18n.language === options['en'] ? 'Primary' : 'Label'}>
                {t('modals.locale.options.en')}
              </Heading>
            </View>
          </Pressable>

          <Pressable onPress={() => handleUpdate(options['es'])}>
            <View
              style={[
                styles.item,
                i18n.language === options['es'] && styles.selected,
              ]}>
              <Heading
                type='Medium'
                style={styles.center}
                color={i18n.language === options['es'] ? 'Primary' : 'Label'}>
                {t('modals.locale.options.es')}
              </Heading>
            </View>
          </Pressable>

          {/* <View style={styles.buttons}>
            <TouchableOpacity style={styles.cancel} onPress={onRequestClose}>
              <Heading color='Label' size={12} type='Medium'>
                {t('modals.locale.cancel')}
              </Heading>
            </TouchableOpacity>
            <TouchableOpacity style={styles.save} onPress={handleSave}>
              <Heading color='Primary' size={12} type='Medium'>
                {t('modals.locale.confirm')}
              </Heading>
            </TouchableOpacity>
          </View> */}
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2525259c',
  },
  container: {
    backgroundColor: Colors.White,
    padding: 20,
    borderRadius: 15,
    width: '80%',
  },
  title: {
    marginBottom: 15,
  },
  item: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    backgroundColor: Colors.White,
  },
  selected: {
    backgroundColor: Colors.Light,
  },

  buttons: {
    marginTop: 10,
    flexDirection: 'row',
    height: 30,
    // uncomment for build Custom Modal Component
    display: 'none',
  },
  cancel: {
    flex: 1,
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  save: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  center: {
    textAlign: 'center',
  },
});
