import {
  Animated,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { useNavigation } from '@react-navigation/native';
import { TrashIcon } from 'react-native-heroicons/mini';
import { Heading } from './common';
import { AppNavigationProps } from '../types/navigation';
import { BoardModel } from '../types/models';
import { Colors } from '../styles/global';
import { removeBoard } from '../services/firestore/board';
import { useTranslation } from 'react-i18next';

export default function Card({ item }: { item: BoardModel }) {
  const { id, title, current, total } = item;
  const navigation = useNavigation<AppNavigationProps>();
  const { t } = useTranslation();

  const onRedirect = () => {
    navigation.navigate('Collection', { id, title });
  };

  const getProgress = (current: number, total: number): number => {
    const percent = (current / total) * 100;
    return parseInt(percent.toFixed(0));
  };
  const progress = getProgress(current!, total!);
  const completed = progress === 100;

  const handleDelete = () => {
    removeBoard(item.id);
  };

  const RightSideActions = (progress: any, dragX: any) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [0.7, 0],
    });
    return (
      <View style={{ flexDirection: 'column', justifyContent: 'space-evenly' }}>
        {/* <TouchableOpacity onPress={handleEdit}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              paddingLeft: 15,
            }}>
            <Animated.View
              style={{
                backgroundColor: Colors.Amber,
                justifyContent: 'center',
                alignItems: 'center',
                height: 40,
                width: 40,
                borderRadius: 20,
              }}>
              <PencilIcon color={Colors.Gold} />
            </Animated.View>
          </View>
        </TouchableOpacity> */}
        <TouchableOpacity onPress={handleDelete}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              paddingLeft: 15,
            }}
          >
            <Animated.View
              style={{
                backgroundColor: Colors.Pastel,
                justifyContent: 'center',
                alignItems: 'center',
                height: 40,
                width: 40,
                borderRadius: 20,
              }}
            >
              <TrashIcon color={Colors.Danger} />
            </Animated.View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <Swipeable renderRightActions={RightSideActions}>
      <Pressable
        style={[styles.container, completed && styles.containerCompleted]}
        onPress={onRedirect}
      >
        <View style={styles.labels}>
          <Heading
            style={{ marginRight: 15 }}
            numberOfLines={1}
            ellipsizeMode="tail"
            type="Semibold"
            size={14}
            color={completed ? 'White' : 'Text'}
          >
            {title}
          </Heading>

          <Heading
            size={11}
            type="Medium"
            color={completed ? 'White' : 'Label'}
          >
            {completed ? t('home.board_completed') : `${current}/${total}`}
          </Heading>
        </View>

        <View style={styles.progressBar}>
          <View
            style={[
              styles.progress,
              { width: completed || total === 0 ? '0%' : `${progress}%` },
            ]}
          />
        </View>
      </Pressable>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.Light,
    height: 90,
    borderRadius: 15,
    padding: 20,
    justifyContent: 'space-between',
  },
  containerCompleted: {
    backgroundColor: Colors.Primary,
  },
  labels: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressBar: {
    height: 6,
    width: '100%',
    borderRadius: 3,
    backgroundColor: Colors.White,
  },
  progress: {
    height: '100%',
    maxWidth: '100%',
    borderRadius: 3,
    backgroundColor: Colors.Primary,
  },
});
