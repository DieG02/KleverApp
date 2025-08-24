import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Heading } from './common';
import { Circle as ProgressCircle } from 'react-native-progress';
import { Colors } from '../styles/global';
import { useTranslation } from 'react-i18next';
import { useProgress } from '../hooks';
import { mapValueToBreakpoint } from '../utils/app';

export default function Summary() {
  const { progress, isLoading } = useProgress();
  const [key, setKey] = useState<number>(0);
  const [indeterminate, setIndeterminate] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    if (!isLoading) setIndeterminate(false);
    const value = mapValueToBreakpoint(progress);
    setKey(value);
  }, [progress, isLoading]);

  return (
    <View style={styles.container}>
      <ProgressCircle
        progress={progress! / 100}
        formatText={() => `${progress}%`}
        size={80}
        thickness={8}
        indeterminate={indeterminate}
        color={Colors.Primary}
        fill={Colors.White}
        unfilledColor={Colors.Light}
        borderWidth={0}
        borderColor={Colors.Primary}
        endAngle={0.8}
        showsText
        textStyle={{ fontWeight: 'bold' }}
        strokeCap="round"
      />
      <View style={styles.content}>
        <Heading size={15} type="Semibold" style={styles.spacing}>
          {t(`home.summary.${key}.title`)}
        </Heading>
        <Heading size={11}>
          {t(`home.summary.${key}.message`, { percent: `${progress}%` })}
        </Heading>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 120,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.Background,
    padding: 15,
    borderRadius: 15,
    flexDirection: 'row',
    marginHorizontal: 20,
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 10,
  },
  spacing: {
    marginBottom: 5,
  },
});
