import { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';
import {
  Svg,
  Rect as NativeRect,
  Circle as NativeCircle,
} from 'react-native-svg';
import { Colors } from '../../styles/global';

const Rect = Animated.createAnimatedComponent(NativeRect);
const Circle = Animated.createAnimatedComponent(NativeCircle);

export default function ItemSkeleton() {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const fill = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['#FAFAFA', '#CDCDCD', '#F9F9F9'],
  });

  useEffect(() => {
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 2500,
        easing: Easing.ease,
        useNativeDriver: false,
      }),
    ).start();
  }, []);

  return (
    <View style={styles.container}>
      <Svg viewBox='0 0 380 50'>
        <Circle x='20' y='20' cx='5' cy='5' r='8' fill={fill} />
        <Rect x='50' y='20' rx='5' ry='5' width='275' height='10' fill={fill} />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: '100%',
    backgroundColor: Colors.Background,
    marginBottom: 15,
  },
});
