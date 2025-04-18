import {Text} from './Text';
import FeatherIcon from '@react-native-vector-icons/feather';
import {View as AnimatedView} from 'react-native-animatable';
import {
  formatHumidity,
  formatTemperature,
  formatWindSpeed,
} from '../utils/formats';
import {StyleSheet, View} from 'react-native';
import {useTheme} from './theme';
import {useAppSelector} from '../utils/redux';
import {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import {useEffect} from 'react';
import {mapCountryEmoji, mapIcon} from '../utils/mappers';

export function WeatherContent() {
  const rotation = useSharedValue(0);
  const theme = useTheme();
  const selectedCity = useAppSelector(state => state.search.selectedCity);
  const weather = useAppSelector(state => state.weather?.current);
  const isCurrentLocation = useAppSelector(
    state => state.search.isCurrentLocation,
  );
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{rotate: `${rotation.value}deg`}],
  }));

  useEffect(() => {
    rotation.value = withRepeat(withTiming(360, {duration: 6000}), -1);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimatedView animation="fadeInDown" delay={200} style={styles.content}>
      <View style={styles.cityContainer}>
        {isCurrentLocation && (
          <FeatherIcon
            name="map-pin"
            color={theme.text.primaryColor}
            size={styles.city.fontSize}
            style={styles.pin}
          />
        )}
        <Text style={styles.city} testID="city-name">
          {selectedCity?.name}{' '}
          {selectedCity?.country
            ? `(${mapCountryEmoji(selectedCity.country)})`
            : ''}
        </Text>
      </View>
      <AnimatedView style={[styles.iconWrapper, animatedStyle]}>
        <Text style={styles.icon}>
          {mapIcon(weather?.weather?.[0]?.icon ?? '')}
        </Text>
      </AnimatedView>
      <Text style={styles.temp} testID="temperature">
        {formatTemperature(weather?.main?.temp)}C
      </Text>
      <Text style={styles.condition} testID="condition">
        {weather?.weather?.[0]?.main} - {weather?.weather?.[0]?.description}
      </Text>

      <View style={styles.details}>
        <Text style={styles.detail} testID="feels-like">
          <FeatherIcon name="thermometer" color={theme.text.primaryColor} />
          Feels like: {formatTemperature(weather?.main?.feels_like)}C
        </Text>
        <Text style={styles.detail} testID="humidity">
          <FeatherIcon name="droplet" color={theme.text.primaryColor} />
          Humidity: {formatHumidity(weather?.main?.humidity)}
        </Text>
        <Text style={styles.detail} testID="wind">
          <FeatherIcon name="wind" color={theme.text.primaryColor} />
          Wind: {formatWindSpeed(weather?.wind?.speed)}
        </Text>
      </View>
    </AnimatedView>
  );
}

const styles = StyleSheet.create({
  content: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  cityContainer: {flexDirection: 'row', justifyContent: 'center'},
  city: {fontSize: 26, marginBottom: 8},
  icon: {fontSize: 90},
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
  pin: {marginRight: 8},
});
