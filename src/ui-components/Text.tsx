import {PropsWithChildren} from 'react';
import {
  StyleProp,
  StyleSheet,
  Text as NativeText,
  TextStyle,
} from 'react-native';
import {useTheme} from './theme';

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
  const theme = useTheme();
  const props = ellipsis ? {numberOfLines: 1} : {};
  return (
    <NativeText
      allowFontScaling={allowFontScaling}
      style={[
        variant === 'normal' ? styles.normal : styles.small,
        {color: theme.text.primaryColor},
        style,
      ]}
      ellipsizeMode="tail"
      {...props}>
      {children}
    </NativeText>
  );
}

const styles = StyleSheet.create({
  normal: {
    fontSize: 15.5,
    fontWeight: '400',
  },
  small: {
    fontSize: 13.5,
    fontWeight: '400',
  },
});
