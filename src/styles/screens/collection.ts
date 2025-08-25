import { StyleSheet } from 'react-native';
import { Colors } from '../../styles/global';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  flatlist: {
    flexGrow: 1,
    paddingBottom: 3,
  },
});

export default styles;
