import {Text} from '../ui-components/Text.tsx';
import {View, StyleSheet, TouchableOpacity, Animated} from 'react-native';
import {View as AnimatedView} from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import {useEffect} from 'react';
import {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import {useTheme} from '../ui-components/theme.ts';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useAppDispatch, useAppSelector} from '../utils/hooks/redux.ts';
import {getWeather} from '../stores/slices/weatherSlice.ts';
import {mapIcon} from '../services/weather.ts';

export const Home = () => {
  const rotation = useSharedValue(0);
  const theme = useTheme();

  const dispatch = useAppDispatch();
  const selector = useAppSelector(state => state.weather);

  useEffect(() => {
    dispatch(getWeather('Amsterdam'));
  }, [dispatch]);

  useEffect(() => {
    rotation.value = withRepeat(withTiming(360, {duration: 6000}), -1);
  }, [rotation]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{rotate: `${rotation.value}deg`}],
  }));

  return (
    <LinearGradient colors={theme.gradient} style={styles.container}>
      <SafeAreaView style={styles.container}>
        <Animated.ScrollView contentContainerStyle={styles.content}>
          <AnimatedView
            animation="fadeInDown"
            delay={200}
            style={styles.content}>
            <Text style={styles.city}>{selector.current?.name}</Text>
            <AnimatedView style={[styles.iconWrapper, animatedStyle]}>
              <Text style={{fontSize: 90}}>
                {mapIcon(selector.current?.weather?.[0]?.icon ?? '')}
              </Text>
            </AnimatedView>
            <Text style={styles.temp}>
              {Number(selector.current?.main.temp).toFixed(1)} &deg;C
            </Text>
            <Text style={styles.condition}>
              {selector.current?.weather?.[0]?.description}
            </Text>

            <View style={styles.details}>
              <Text style={styles.detail}>
                Feels like:{' '}
                {Number(selector.current?.main.feels_like).toFixed(1)} &deg;C
              </Text>
              <Text style={styles.detail}>
                Humidity: {Number(selector.current?.main.humidity).toFixed(0)}%
              </Text>
              <Text style={styles.detail}>
                Wind: {Number(selector.current?.wind.speed).toFixed(2)} km/h
              </Text>
            </View>
          </AnimatedView>
          <AnimatedView
            animation="zoomIn"
            style={[styles.card, {backgroundColor: theme.backgroundColor}]}>
            <Text style={styles.title}>Welcome</Text>
            <Text style={styles.message}>
              How would you like to set your location?
            </Text>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Use Current Location</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.secondary}>Enter Manually</Text>
            </TouchableOpacity>
          </AnimatedView>
        </Animated.ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  content: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  city: {fontSize: 26, marginBottom: 8},
  icon: {width: 100, height: 100},
  iconWrapper: {
    marginVertical: 12,
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  temp: {fontSize: 64, fontWeight: '200'},
  condition: {fontSize: 22},
  details: {marginTop: 20, alignItems: 'center'},
  detail: {fontSize: 16},
  card: {
    padding: 25,
    borderRadius: 12,
    width: '85%',
  },
  title: {fontSize: 22, fontWeight: 'bold', marginBottom: 10},
  message: {fontSize: 16, marginBottom: 20},
  button: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  buttonText: {color: '#fff', fontWeight: 'bold', textAlign: 'center'},
  secondary: {textAlign: 'center', marginTop: 10},
});
