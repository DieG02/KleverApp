import { StyleSheet } from 'react-native';
import { Colors } from '../global';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingHorizontal: 20,
  },
  banner: {
    marginTop: 50,
    marginBottom: 30,
    alignItems: 'center',
  },
  header: {
    marginVertical: 20,
  },
  footer: {
    marginTop: 'auto',
    marginBottom: 20,
  },
  link: {
    fontSize: 12,
    textAlign: 'center',
  },
  hightlight: {
    color: Colors.Primary,
  },
});

export default styles;
