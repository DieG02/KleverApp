import { View, StyleSheet, Dimensions } from 'react-native';
import HomeBanner from '../assets/app/HomeBanner';
import { Heading } from './common';
import { useTranslation } from 'react-i18next';

const { height } = Dimensions.get('window');
interface EmptyCardsProps {}
export default function EmptyCards({}: EmptyCardsProps) {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <View style={styles.banner}>
        <HomeBanner height={150} width={150} />
      </View>
      <View style={styles.center}>
        <Heading type='Semibold' size={16} color='Placeholder'>
          {t('home.empty.title')}
        </Heading>
        <Heading type='Medium' size={12} color='Placeholder'>
          {t('home.empty.label')}
        </Heading>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    top: (height - 300 / 2) * 0.125,
    pointerEvents: 'none',
  },
  banner: {
    alignItems: 'center',
    marginBottom: 20,
  },
  center: {
    alignItems: 'center',
  },
});
