import React, { useState, useRef } from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  GestureResponderEvent,
} from 'react-native';

interface TouchableDebounceProps extends TouchableOpacityProps {
  onPress?: (event: GestureResponderEvent) => void;
  delay?: number;
}

/**
 * Custom TextInput component extended from RNTextInput
 * @param onPress Native prop to handle press event
 * @param delay Optional number in miliseconds. Default `500`
 * @returns {JSX.Element} A JSX element representing the custom touchable debounce
 */
export default function TouchableDebounce({
  children,
  delay = 1000,
  onPress = () => {},
  ...props
}: TouchableDebounceProps): React.JSX.Element {
  const [debounce, setDebounce] = useState<boolean>(false);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onDebouncePress = (e: GestureResponderEvent) => {
    if (debounce) return;
    if (timeout.current) clearTimeout(timeout.current);
    setDebounce(true);
    onPress(e);

    timeout.current = setTimeout(() => {
      setDebounce(false);
    }, delay);
  };
  return (
    <TouchableOpacity onPress={onDebouncePress} {...props}>
      {children}
    </TouchableOpacity>
  );
}
