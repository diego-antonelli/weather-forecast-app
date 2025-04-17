import React, {useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import LottieView from 'lottie-react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {Routes} from '../utils/constants.ts';
import {RootStackParamList} from '../types';
import LinearGradient from 'react-native-linear-gradient';
import {useTheme} from '../ui-components/theme.ts';

export const SplashScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const theme = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{name: Routes.HomeTab as unknown as keyof RootStackParamList}],
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <LinearGradient colors={theme.gradient} style={styles.container}>
      <View style={styles.container}>
        <LottieView
          source={require('../assets/splash_animation.json')}
          autoPlay
          loop
          style={styles.lottie}
        />
        <Text style={[styles.title, {color: theme.text.primaryColor}]}>
          Weather Forecast
        </Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottie: {
    width: 200,
    height: 200,
  },
  title: {
    fontSize: 24,
    marginTop: 20,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
});
