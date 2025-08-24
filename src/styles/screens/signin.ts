import { StyleSheet } from 'react-native';
import { Colors, Poppins } from '../global';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingHorizontal: 20,
  },
  locale: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: Colors.Light,
    position: 'absolute',
    top: 15,
    left: 20,
  },
  banner: {
    marginTop: 50,
    marginBottom: 30,
    alignItems: 'center',
  },
  header: {
    marginVertical: 20,
  },
  password: {
    fontSize: 10,
    textAlign: 'right',
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
