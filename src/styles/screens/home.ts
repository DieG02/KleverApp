import { StyleSheet } from 'react-native';
import { Colors } from '../global';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
    marginHorizontal: 20,
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  flatlist: {
    flexGrow: 1,
    paddingBottom: 3,
  },
  hightlight: {
    color: Colors.Primary,
  },
});

export default styles;
