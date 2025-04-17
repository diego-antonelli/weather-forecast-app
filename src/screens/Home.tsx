import {Text} from '../ui-components/Text.tsx';
import {View, StyleSheet, TouchableOpacity, Animated} from 'react-native';
import {View as AnimatedView} from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import {useCallback, useEffect, useMemo} from 'react';
import {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import {useTheme} from '../ui-components/theme.ts';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useAppDispatch, useAppSelector} from '../utils/hooks/redux.ts';
import {getWeather, getWeatherByLatLng} from '../stores/slices/weatherSlice.ts';
import {mapIcon} from '../services/weather.ts';
import Geolocation from 'react-native-geolocation-service';
import {ClickableContainer} from '../ui-components/ClickableContainer.tsx';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../types';
import {Routes} from '../utils/constants.ts';
import {Spinner} from '../ui-components/Spinner.tsx';

export const Home = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const rotation = useSharedValue(0);
  const theme = useTheme();

  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(state => state.weather.loading);
  const error = useAppSelector(state => state.weather.error);
  const weather = useAppSelector(state => state.weather?.current);

  useEffect(() => {
    dispatch(getWeather('Amsterdam'));
  }, [dispatch]);

  useEffect(() => {
    rotation.value = withRepeat(withTiming(360, {duration: 6000}), -1);
  }, [rotation]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{rotate: `${rotation.value}deg`}],
  }));

  const onPressCurrentLocation = useCallback(() => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        dispatch(getWeatherByLatLng({lat: latitude, lng: longitude}));
        // Use this lat/lon to call weather API
      },
      error => {
        console.error('Location error:', error);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }, [dispatch]);

  const content = useMemo(
    () =>
      error ? (
        <View style={styles.content}>
          <Text style={{color: theme.text.error}}>
            An error occurred: {error}
          </Text>
        </View>
      ) : isLoading ? (
        <View style={styles.content}>
          <Spinner />
        </View>
      ) : (
        <AnimatedView animation="fadeInDown" delay={200} style={styles.content}>
          <Text style={styles.city}>{weather?.name}</Text>
          <AnimatedView style={[styles.iconWrapper, animatedStyle]}>
            <Text style={{fontSize: 90}}>
              {mapIcon(weather?.weather?.[0]?.icon ?? '')}
            </Text>
          </AnimatedView>
          <Text style={styles.temp}>
            {Number(weather?.main.temp).toFixed(1)} &deg;C
          </Text>
          <Text style={styles.condition}>
            {weather?.weather?.[0]?.main} - {weather?.weather?.[0]?.description}
          </Text>

          <View style={styles.details}>
            <Text style={styles.detail}>
              Feels like: {Number(weather?.main.feels_like).toFixed(1)} &deg;C
            </Text>
            <Text style={styles.detail}>
              Humidity: {Number(weather?.main.humidity).toFixed(0)}%
            </Text>
            <Text style={styles.detail}>
              Wind: {Number(weather?.wind.speed).toFixed(2)} km/h
            </Text>
          </View>
        </AnimatedView>
      ),
    [
      isLoading,
      weather?.name,
      weather?.weather,
      weather?.main.temp,
      weather?.main.feels_like,
      weather?.main.humidity,
      weather?.wind.speed,
      animatedStyle,
    ],
  );

  return (
    <LinearGradient colors={theme.gradient} style={styles.container}>
      <SafeAreaView style={styles.container}>
        <Animated.ScrollView contentContainerStyle={styles.content}>
          {content}
          <AnimatedView
            animation="zoomIn"
            style={[styles.card, {backgroundColor: theme.backgroundColor}]}>
            <Text style={styles.title}>Welcome</Text>
            <Text style={styles.message}>
              How would you like to set your location?
            </Text>
            <ClickableContainer
              style={styles.button}
              onPress={onPressCurrentLocation}>
              <Text style={styles.buttonText}>Use Current Location</Text>
            </ClickableContainer>
            <ClickableContainer
              onPress={() => navigation.navigate(Routes.Search)}>
              <Text style={styles.secondary}>Enter Manually</Text>
            </ClickableContainer>
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
