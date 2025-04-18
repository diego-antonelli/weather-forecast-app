import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-animatable';
import {useTheme} from './theme';
import LottieView from 'lottie-react-native';
import React from 'react';

export function Error({error}: {error: string}) {
  const theme = useTheme();
  return (
    <View style={styles.content} testID="error-message">
      <LottieView
        source={require('../assets/error_animation.json')}
        autoPlay
        loop
        style={styles.lottie}
      />
      <Text animation="fadeIn" style={{color: theme.text.error}}>
        An error occurred: {error}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  lottie: {width: 100, height: 100},
});
