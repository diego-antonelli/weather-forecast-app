import {Platform, Pressable, StyleProp, ViewStyle} from 'react-native';
import {theme} from './theme';
import {PropsWithChildren} from 'react';

interface ClickableContainerProps {
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  onLongPress?: () => void;
  disabled?: boolean;
  rippleColor?: string;
  pointerEvents?: 'box-none' | 'none' | 'box-only' | 'auto';
}

export function ClickableContainer({
  children,
  style,
  onPress,
  onLongPress,
  disabled = false,
  rippleColor,
  pointerEvents,
}: PropsWithChildren<ClickableContainerProps>) {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      onLongPress={onLongPress}
      style={({pressed}) =>
        onPress !== undefined
          ? [
              style,
              Platform.OS === 'ios' || Platform.OS === 'macos'
                ? {opacity: pressed ? 0.6 : undefined}
                : {},
              disabled ? {opacity: 0.5} : {},
            ]
          : [style, disabled ? {opacity: 0.5} : {}]
      }
      android_ripple={{
        color: rippleColor ?? theme.backgroundColor,
        borderless: false,
      }}
      pointerEvents={pointerEvents}>
      {children}
    </Pressable>
  );
}
