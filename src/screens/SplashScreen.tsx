import React, {useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import LottieView from 'lottie-react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {Routes} from '../utils/constants.ts';
import {RootStackParamList} from '../types';

export const SplashScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

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
    <View style={styles.container}>
      <LottieView
        source={require('../assets/splash_animation.json')}
        autoPlay
        loop
        style={styles.lottie}
      />
      <Text style={styles.title}>Weather Forecast</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#001F3F',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottie: {
    width: 200,
    height: 200,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    marginTop: 20,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
});
