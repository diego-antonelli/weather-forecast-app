import {ActivityIndicator, StyleProp, ViewStyle} from 'react-native';
import {theme} from './theme.ts';

export function Spinner({
  style,
  color,
}: {
  style?: StyleProp<ViewStyle>;
  color?: string;
}) {
  return (
    <ActivityIndicator
      size="small"
      color={color ?? theme.primaryColor}
      style={style}
    />
  );
}
