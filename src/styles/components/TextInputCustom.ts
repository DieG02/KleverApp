import { StyleSheet, Platform } from 'react-native';
import { Colors, Poppins } from '../global';

const ios = Platform.OS === 'ios';
const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  footer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: ios ? 10 : 0,
    height: 40,
    fontSize: ios ? 13 : 12,
    color: Colors.Text,
    fontFamily: Poppins.Regular,
    borderRadius: 20,
    backgroundColor: Colors.Background,
    marginRight: 5,
  },
  button: {
    backgroundColor: Colors.Light,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
  },
  icon: {
    color: Colors.Primary,
  },
});

export default styles;
