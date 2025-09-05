import {
  View,
  TextInput,
  TextInputProps,
  StyleSheet,
  StyleProp,
  TextStyle,
  TouchableWithoutFeedback,
} from 'react-native';
import Heading from './Heading';
import { Colors, Poppins } from '../../styles/global';
import { EyeIcon, EyeSlashIcon } from 'react-native-heroicons/mini';
import { useState } from 'react';

interface PasswordFieldProps extends TextInputProps {
  label?: string;
  marginb?: number;
  labelStyle?: StyleProp<TextStyle>;
  inputStyle?: StyleProp<TextStyle>;
}

/**
 * Custom TextInput component extended from RNTextInput
 * @param label Optional text at the top of the TextInput
 * @param marginb Override margin bottom from the container - Default `20`
 * @param labelStyle Override default Text style
 * @param inputStyle Override default TextInput style
 * @returns {JSX.Element} A JSX element representing the custom text input
 */
export default function PasswordField(
  props: PasswordFieldProps,
): React.JSX.Element {
  const { label, labelStyle, inputStyle, marginb, ...inputProps } = props;
  const [visible, setVisible] = useState<boolean>(false);
  const viewMixStyle = {
    marginBottom: typeof marginb === 'number' ? marginb : 20,
  };
  const labelMixStyle = StyleSheet.compose(
    {
      fontSize: 10,
      marginBottom: 5,
      display: label ? 'flex' : 'none',
    },
    labelStyle,
  );
  const inputMixStyle = StyleSheet.compose(
    {
      fontFamily: Poppins.Regular,
      color: Colors.Text,
      fontSize: 12,
      flex: 1,
      padding: 0,
      marginRight: 15,
    },
    inputStyle,
  );
  const styles = StyleSheet.create({
    wrapper: {
      backgroundColor: Colors.Background,
      borderColor: Colors.Light,
      borderWidth: 1,
      borderRadius: 10,
      height: 48,
      paddingHorizontal: 14, // + 1px border
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  });

  return (
    <View style={viewMixStyle}>
      <Heading color="Placeholder" style={labelMixStyle}>
        {label}
      </Heading>
      <View style={styles.wrapper}>
        <TextInput
          style={inputMixStyle}
          placeholderTextColor={Colors.Label}
          secureTextEntry={!visible}
          testID="password-field"
          {...inputProps}
        />
        <TouchableWithoutFeedback onPress={() => setVisible(!visible)}>
          {visible ? (
            <EyeSlashIcon color={Colors.Placeholder} />
          ) : (
            <EyeIcon color={Colors.Placeholder} />
          )}
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}
