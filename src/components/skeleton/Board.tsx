import { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';
import { Svg, Rect as NativeRect } from 'react-native-svg';
import { Colors } from '../../styles/global';

const Rect = Animated.createAnimatedComponent(NativeRect);

export default function BoardSkeleton() {
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
      <Svg viewBox='0 0 350 90'>
        <Rect x='20' y='22' rx='5' ry='5' width='250' height='10' fill={fill} />
        <Rect x='300' y='22' rx='5' ry='5' width='30' height='10' fill={fill} />
        <Rect x='20' y='58' rx='5' ry='5' width='310' height='10' fill={fill} />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 90,
    width: '100%',
    backgroundColor: Colors.Background,
    borderRadius: 15,
    marginBottom: 15,
  },
});
