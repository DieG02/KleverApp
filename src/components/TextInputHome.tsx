import { useState } from 'react';
import { TouchableOpacity, TextInput, View } from 'react-native';
import { ArrowRightIcon } from 'react-native-heroicons/mini';
import { useNavigation } from '@react-navigation/native';
import { addBoard } from '../services/firestore/board';
import { AppNavigationProps } from '../types/navigation';
import styles from '../styles/components/TextInputCustom';
import { useTranslation } from 'react-i18next';

export default function TextInputHome() {
  const [value, setValue] = useState<string>('');
  const { t } = useTranslation();
  const navigation = useNavigation<AppNavigationProps>();

  const handleOnPress = () => {
    const title = value.trim();
    if (!title) return;
    setValue(''); // TODO: Loading screen
    const board_id = addBoard({
      title,
      description: '',
      category: 'none',
    });
    navigation.navigate('Collection', {
      id: board_id,
      title: value,
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.footer}>
        <TextInput
          style={styles.input}
          maxLength={30}
          placeholder={t('home.new_item')}
          value={value}
          onChangeText={setValue}
          placeholderTextColor='#858585'
        />
        <TouchableOpacity
          style={styles.button}
          onPress={handleOnPress}
          disabled={!value.trim()}>
          <ArrowRightIcon color={styles.icon.color} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
