import {
  Platform,
  StyleProp,
  StyleSheet,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {fonts, useTheme} from './theme.ts';
import {ClickableContainer} from './ClickableContainer.tsx';
import FeatherIcon from '@react-native-vector-icons/feather';

interface TextBoxProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
  returnKeyType?: 'done' | 'go' | 'next' | 'search' | 'send';
  onSubmitEditing?: () => void;
  onClean?: () => void;
}
export const TextBox = ({
  label,
  value,
  onChange,
  containerStyle,
  inputStyle,
  disabled,
  returnKeyType,
  onSubmitEditing,
  onClean,
}: TextBoxProps) => {
  const theme = useTheme();
  return (
    <View
      style={[
        styles.container,
        {
          borderColor: theme.text.placeholderColor,
          backgroundColor: theme.textBoxBackground,
        },
        containerStyle,
      ]}>
      <TextInput
        placeholder={label}
        value={value}
        onChangeText={onChange}
        style={[
          styles.textBox,
          {color: theme.text.primaryColor},
          inputStyle,
          Platform.OS === 'android'
            ? {maxHeight: undefined, height: 24, padding: 0}
            : {},
        ]}
        placeholderTextColor={theme.text.primaryColor}
        readOnly={disabled}
        returnKeyType={returnKeyType}
        onSubmitEditing={onSubmitEditing}
        blurOnSubmit={
          returnKeyType === 'done' ||
          returnKeyType === 'go' ||
          returnKeyType === 'send'
        }
      />
      {onClean && value && (
        <ClickableContainer onPress={onClean}>
          <FeatherIcon name="x" color={theme.text.primaryColor} size={20} />
        </ClickableContainer>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    borderRadius: 24,
    borderWidth: 1,
    alignItems: 'center',
    height: 48,
  },
  textBox: {
    ...fonts.mediumBodyRegular,
    flex: 1,
  },
});
