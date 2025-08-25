import { View, ActivityIndicator, StyleSheet } from 'react-native';

export default function Loading() {
  return (
    <View style={styles.overlay} pointerEvents="box-none">
      <View style={styles.backdrop} />
      <ActivityIndicator size="large" color="#fff" />
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
});
