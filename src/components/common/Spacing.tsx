import { View } from 'react-native';

interface DividerProps {
  size?: number;
}
/**
 * Native View component with height defined to use as margin
 * @param size Optional number to set height - Default `15`
 * @returns {JSX.Element} An empty View element
 */
export default function Divider({ size }: DividerProps): React.JSX.Element {
  const value = typeof size === 'number' ? size : 15;
  return <View style={{ height: value }} />;
}
