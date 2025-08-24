import {
  View,
  TextInput,
  TextInputProps,
  StyleSheet,
  StyleProp,
  TextStyle,
} from 'react-native';
import Heading from './Heading';
import { Colors, Poppins } from '../../styles/global';

interface InputFieldProps extends TextInputProps {
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
export default function InputField(props: InputFieldProps): React.JSX.Element {
  const { label, labelStyle, inputStyle, marginb, ...inputProps } = props;
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
      backgroundColor: Colors.Background,
      borderColor: Colors.Light,
      borderWidth: 1,
      borderRadius: 10,
      height: 48,
      fontFamily: Poppins.Regular,
      color: Colors.Text,
      fontSize: 12,
      paddingHorizontal: 15,
    },
    inputStyle,
  );

  return (
    <View style={viewMixStyle}>
      <Heading color="Placeholder" style={labelMixStyle}>
        {label}
      </Heading>
      <View>
        <TextInput
          style={inputMixStyle}
          placeholderTextColor={Colors.Label}
          {...inputProps}
        />
      </View>
    </View>
  );
}
