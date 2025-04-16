import {
  KeyboardTypeOptions,
  Platform,
  StyleProp,
  StyleSheet,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {colors, fonts, theme} from './theme.ts';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {ClickableContainer} from './ClickableContainer.tsx';
import {forwardRef, useState} from 'react';
import {Text} from './Text.tsx';
import {Spinner} from './Spinner.tsx';

type AutoCompleteType =
  | 'birthdate-day'
  | 'birthdate-full'
  | 'birthdate-month'
  | 'birthdate-year'
  | 'cc-csc'
  | 'cc-exp'
  | 'cc-exp-day'
  | 'cc-exp-month'
  | 'cc-exp-year'
  | 'cc-number'
  | 'email'
  | 'gender'
  | 'name'
  | 'name-family'
  | 'name-given'
  | 'name-middle'
  | 'name-middle-initial'
  | 'name-prefix'
  | 'name-suffix'
  | 'password'
  | 'password-new'
  | 'postal-address'
  | 'postal-address-country'
  | 'postal-address-extended'
  | 'postal-address-extended-postal-code'
  | 'postal-address-locality'
  | 'postal-address-region'
  | 'postal-code'
  | 'street-address'
  | 'sms-otp'
  | 'tel'
  | 'tel-country-code'
  | 'tel-national'
  | 'tel-device'
  | 'username'
  | 'username-new'
  | 'off'
  | undefined;

interface TextBoxProps {
  variant?: 'normal' | 'password';
  label?: string;
  value: string;
  onChange: (value: string) => void;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  iconStyle?: StyleProp<ViewStyle>;
  autoComplete?: AutoCompleteType;
  prefix?: string;
  noCapitalize?: boolean;
  multiline?: boolean;
  onFocus?: () => void;
  loading?: boolean;
  disabled?: boolean;
  insideBottomSheet?: boolean;
  returnKeyType?: 'done' | 'go' | 'next' | 'search' | 'send';
  onSubmitEditing?: () => void;
}
export const TextBox = forwardRef(
  (
    {
      label,
      value,
      onChange,
      variant,
      containerStyle,
      inputStyle,
      iconStyle,
      autoComplete,
      prefix,
      noCapitalize,
      multiline,
      onFocus,
      loading,
      disabled,
      returnKeyType,
      onSubmitEditing,
    }: TextBoxProps,
    ref,
  ) => {
    const isPassword = variant === 'password';
    const [hideValue, setHideValue] = useState(isPassword);
    return (
      <View
        style={[
          styles.container,
          containerStyle,
          multiline ? {paddingVertical: 12, height: undefined} : {},
        ]}>
        {prefix && <Text style={styles.prefix}>{prefix}</Text>}
        {loading ? (
          <View style={[styles.textBox, inputStyle]}>
            <Spinner />
          </View>
        ) : (
          <TextInput
            ref={ref as any}
            placeholder={label}
            value={value}
            onChangeText={onChange}
            secureTextEntry={isPassword && hideValue}
            style={[
              styles.textBox,
              inputStyle,
              Platform.OS === 'android'
                ? {maxHeight: undefined, height: 24, padding: 0}
                : {},
            ]}
            placeholderTextColor={colors.grey}
            autoComplete={autoComplete}
            autoCapitalize={noCapitalize ? 'none' : undefined}
            autoCorrect={!noCapitalize}
            keyboardType={getKeyboardType(autoComplete)}
            multiline={multiline}
            onFocus={onFocus}
            readOnly={disabled}
            returnKeyType={returnKeyType}
            onSubmitEditing={onSubmitEditing}
            blurOnSubmit={
              returnKeyType === 'done' ||
              returnKeyType === 'go' ||
              returnKeyType === 'send'
            }
          />
        )}
        {isPassword && (
          <ClickableContainer
            onPress={() => {
              setHideValue(prev => !prev);
            }}>
            <FeatherIcon
              name={hideValue ? 'eye-off' : 'eye'}
              size={16}
              color={colors.grey}
              style={iconStyle}
            />
          </ClickableContainer>
        )}
      </View>
    );
  },
);

function getKeyboardType(type: AutoCompleteType): KeyboardTypeOptions {
  switch (type) {
    case 'birthdate-day':
    case 'birthdate-month':
    case 'birthdate-year':
      return 'decimal-pad';
    case 'birthdate-full':
      return 'numbers-and-punctuation';
    case 'email':
      return 'email-address';
    case 'tel':
      return 'phone-pad';
    case 'username':
      return 'url';
  }
  return 'default';
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: theme.placeholderColor,
    alignItems: 'center',
    height: 48,
    backgroundColor: theme.backgroundColor,
  },
  prefix: {
    color: colors.black,
  },
  textBox: {
    ...fonts.mediumBodyRegular,
    color: colors.black,
    flex: 1,
  },
});
