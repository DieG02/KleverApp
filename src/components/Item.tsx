import { StyleSheet, View, TouchableOpacity, Animated } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { CheckIcon, TrashIcon } from 'react-native-heroicons/mini';
import { toggleItemStatus, removeItem } from '../services/firestore/collection';
import { Heading } from './common';
import { Colors } from '../styles/global';
import { ItemModel } from '../types/models';

export default function Item({ item }: { item: ItemModel }) {
  const { parent_id, label, checked } = item;
  const handlePress = () => {
    toggleItemStatus(parent_id, item);
  };

  const handleDelete = () => {
    removeItem(item);
  };

  const RightSideActions = (progress: any, dragX: any) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [0.7, 0],
    });
    return (
      <TouchableOpacity onPress={handleDelete}>
        <View
          style={{
            height: '100%',
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
    );
  };

  return (
    <Swipeable renderRightActions={RightSideActions}>
      <TouchableOpacity style={styles.item} onPress={handlePress}>
        <View style={checked ? styles.itemChecked : styles.itemButton}>
          <CheckIcon
            color={checked ? Colors.White : 'transparent'}
            width={15}
          />
        </View>
        <Heading
          numberOfLines={2}
          ellipsizeMode="tail"
          type="Medium"
          size={13}
          style={[
            styles.itemLabel,
            checked && { textDecorationLine: 'line-through' },
          ]}
        >
          {label}
        </Heading>
      </TouchableOpacity>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  item: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.White,
    height: 55,
  },
  itemLabel: {
    flex: 1,
    marginLeft: 10,
    color: Colors.Text,
  },
  itemButton: {
    height: 20,
    width: 20,
    borderWidth: 1,
    borderColor: Colors.Light,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemChecked: {
    height: 20,
    width: 20,
    backgroundColor: Colors.Primary,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
