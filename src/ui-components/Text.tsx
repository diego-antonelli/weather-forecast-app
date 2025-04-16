import {PropsWithChildren} from 'react';
import {
  StyleProp,
  StyleSheet,
  Text as NativeText,
  TextStyle,
} from 'react-native';
import {colors, fonts} from './theme';

interface TextProps {
  style?: StyleProp<TextStyle>;
  variant?: 'normal' | 'small';
  ellipsis?: boolean;
  allowFontScaling?: boolean;
}

export function Text({
  children,
  style,
  variant = 'normal',
  ellipsis,
  allowFontScaling = true,
}: PropsWithChildren<TextProps>) {
  const props = ellipsis ? {numberOfLines: 1} : {};
  return (
    <NativeText
      allowFontScaling={allowFontScaling}
      style={[variant === 'normal' ? styles.normal : styles.small, style]}
      ellipsizeMode="tail"
      {...props}>
      {children}
    </NativeText>
  );
}

const styles = StyleSheet.create({
  normal: {
    ...fonts.mediumBodyRegular,
    color: colors.grey,
  },
  small: {
    ...fonts.mediumBodySmall,
    color: colors.grey,
  },
});
