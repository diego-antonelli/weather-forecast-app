import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-animatable';
import {useTheme} from './theme';

export function Error({error}: {error: string}) {
  const theme = useTheme();
  return (
    <View style={styles.content}>
      <Text animation="fadeIn" style={{color: theme.text.error}}>
        An error occurred: {error}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});
