import { View, StyleSheet, Dimensions } from 'react-native';
import { Heading } from './common';
import CollectionBanner from '../assets/app/CollectionBanner';
import { useTranslation } from 'react-i18next';

const { height } = Dimensions.get('window');

interface EmptyCollectionProps {}
export default function EmptyCollection({}: EmptyCollectionProps) {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <View style={styles.banner}>
        <CollectionBanner height={150} width={150} />
      </View>
      <View style={styles.center}>
        <Heading type='Semibold' size={16} color='Placeholder'>
          {t('collection.empty.title')}
        </Heading>
        <Heading type='Medium' size={12} color='Placeholder'>
          {t('collection.empty.label')}
        </Heading>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    top: (height - 300 / 2) * 0.33,
  },
  banner: {
    alignItems: 'center',
    marginBottom: 20,
  },
  center: {
    alignItems: 'center',
  },
});
