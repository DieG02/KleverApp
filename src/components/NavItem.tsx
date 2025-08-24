import { FunctionComponent } from 'react';
import { StyleSheet, View, TouchableOpacityProps } from 'react-native';
import { Heading, TouchableDebounce } from './common';
import { ChevronRightIcon } from 'react-native-heroicons/mini';
import { Colors } from '../styles/global';

interface NavItemProps extends TouchableOpacityProps {
  icon: FunctionComponent<{ width?: number; height?: number; color: string }>;
  label: string;
  type?: 'Primary' | 'Danger' | 'Gold';
  arrow?: boolean;
}

export default function NavItem({
  icon: Icon,
  label,
  type = 'Primary',
  arrow = false,
  ...props
}: NavItemProps) {
  const Palette = {
    Primary: {
      color: Colors.Primary,
      background: Colors.Light,
    },
    Danger: {
      color: Colors.Danger,
      background: Colors.Pastel,
    },
    Gold: {
      color: Colors.Gold,
      background: Colors.Amber,
    },
  };
  return (
    <TouchableDebounce style={{ marginBottom: 20 }} {...props}>
      <View style={styles.option}>
        <View
          style={[styles.icon, { backgroundColor: Palette[type].background }]}
        >
          <Icon color={Palette[type].color} />
        </View>
        <View style={styles.label}>
          <Heading type="Medium" color="Label" size={13}>
            {label}
          </Heading>
          {!!arrow && <ChevronRightIcon color={Colors.Black} />}
        </View>
      </View>
    </TouchableDebounce>
  );
}

const styles = StyleSheet.create({
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  icon: {
    backgroundColor: Colors.Light,
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginRight: 15,
  },
  label: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
