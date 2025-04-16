import {ActivityIndicator, StyleProp, ViewStyle} from 'react-native';
import {useTheme} from './theme.ts';

export function Spinner({
  style,
  color,
}: {
  style?: StyleProp<ViewStyle>;
  color?: string;
}) {
  const theme = useTheme();
  return (
    <ActivityIndicator
      size="small"
      color={color ?? theme.primaryColor}
      style={style}
    />
  );
}
