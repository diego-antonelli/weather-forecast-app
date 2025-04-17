import {ActivityIndicator, StyleProp, ViewStyle} from 'react-native';
import {useTheme} from './theme';

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
      color={color ?? theme.buttonBackground}
      style={style}
    />
  );
}
