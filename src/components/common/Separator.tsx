import { View } from 'react-native';

interface SeparatorProps {}
export default function Separator({}: SeparatorProps) {
  return (
    <View
      style={{
        height: 1,
        backgroundColor: '#EFEFEF',
      }}
    />
  );
}
