import { StyleSheet } from 'react-native';
import { Colors, Poppins } from '../global';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  brand: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 16,
    alignSelf: 'center',
  },
  company: {
    fontFamily: Poppins.Semibold,
    textTransform: 'uppercase',
  },
});

export default styles;
