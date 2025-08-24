import { StyleSheet } from 'react-native';
import { Colors } from '../../styles/global';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Colors.White,
    marginHorizontal: 20,
  },
  icon: {
    backgroundColor: Colors.Pastel,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 50,
    marginTop: 40,
    borderRadius: 30,
  },
  hide: {
    display: 'none',
  },
  flex: {
    flex: 1,
  },

  condition: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  base: {
    height: 18,
    width: 18,
    borderWidth: 1,
    borderColor: Colors.Placeholder,
    borderRadius: 4,
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    borderWidth: 0,
    backgroundColor: Colors.Primary,
  },

  contentItem: {
    flexDirection: 'row',
  },
  item: {
    flex: 1,
    color: '#666',
    marginLeft: 10,
  },

  group: {
    marginTop: 'auto',
    marginBottom: 15,
    flexDirection: 'row',
  },
  cancel: {
    backgroundColor: Colors.Light,
    borderRadius: 25,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 1,
  },
  confirm: {
    marginLeft: 10,
    backgroundColor: Colors.White,
    borderRadius: 25,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 1,
  },
});

export default styles;
