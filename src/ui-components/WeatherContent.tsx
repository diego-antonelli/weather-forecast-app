import {Text} from './Text.tsx';
import FeatherIcon from '@react-native-vector-icons/feather';
import {View as AnimatedView} from 'react-native-animatable';
import {mapIcon} from '../services/weather.ts';
import {
  formatHumidity,
  formatTemperature,
  formatWindSpeed,
} from '../utils/formats.ts';
import {StyleSheet, View} from 'react-native';
import {useTheme} from './theme.ts';
import {useAppSelector} from '../utils/hooks/redux.ts';
import {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import {useEffect} from 'react';

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
            style={{marginRight: 8}}
          />
        )}
        <Text style={styles.city}>
          {selectedCity?.name} ({selectedCity?.country})
        </Text>
      </View>
      <AnimatedView style={[styles.iconWrapper, animatedStyle]}>
        <Text style={{fontSize: 90}}>
          {mapIcon(weather?.weather?.[0]?.icon ?? '')}
        </Text>
      </AnimatedView>
      <Text style={styles.temp}>{formatTemperature(weather?.main.temp)}C</Text>
      <Text style={styles.condition}>
        {weather?.weather?.[0]?.main} - {weather?.weather?.[0]?.description}
      </Text>

      <View style={styles.details}>
        <Text style={styles.detail}>
          <FeatherIcon name="thermometer" color={theme.text.primaryColor} />
          Feels like: {formatTemperature(weather?.main.feels_like)}C
        </Text>
        <Text style={styles.detail}>
          <FeatherIcon name="droplet" color={theme.text.primaryColor} />
          Humidity: {formatHumidity(weather?.main.humidity)}
        </Text>
        <Text style={styles.detail}>
          <FeatherIcon name="wind" color={theme.text.primaryColor} />
          Wind: {formatWindSpeed(weather?.wind.speed)}
        </Text>
      </View>
    </AnimatedView>
  );
}

const styles = StyleSheet.create({
  content: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  cityContainer: {flexDirection: 'row', justifyContent: 'center'},
  city: {fontSize: 26, marginBottom: 8},
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
});
