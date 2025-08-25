import { View, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Item, TextInputCollection } from '../components';
import { Layout, Separator } from '../components/common';
import styles from '../styles/screens/collection';
import { AppNavigationProps, AppRouteProps } from '../types/navigation';
import EmptyCollection from '../components/EmptyCollection';
import { useCollection } from '../hooks';
import ItemSkeleton from '../components/skeleton/Item';
import { useHeaderHeight } from '@react-navigation/elements';

interface CollectionProps {
  navigation: AppNavigationProps;
  route: AppRouteProps<'Collection'>;
}

const BEHAVIOR = Platform.OS === 'ios' ? 'padding' : undefined;

export default function Collection({ route }: CollectionProps) {
  const { id: parent_id } = route.params;
  const { items } = useCollection(parent_id);
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();

  return (
    <Layout
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}>
      <KeyboardAvoidingView
        style={styles.wrapper}
        keyboardVerticalOffset={headerHeight}
        behavior={BEHAVIOR}>
        <View style={styles.container}>
          {items && (
            <FlatList
              data={items}
              renderItem={Item}
              ItemSeparatorComponent={Separator}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={EmptyCollection}
              contentContainerStyle={styles.flatlist}
            />
          )}
          {!items && [0, 1, 2, 3, 4].map(i => <ItemSkeleton key={i} />)}
        </View>
        <TextInputCollection collectionId={parent_id} />
      </KeyboardAvoidingView>
    </Layout>
  );
}
