import React, {useEffect} from 'react';
import {StyleSheet, FlatList} from 'react-native';
import {View as AnimatedView} from 'react-native-animatable';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTheme} from '../ui-components/theme.ts';
import {Text} from '../ui-components/Text.tsx';
import {useAppDispatch, useAppSelector} from '../utils/hooks/redux.ts';
import {getForecast} from '../stores/slices/weatherSlice.ts';
import {mapIcon} from '../services/weather.ts';
import {format} from 'date-fns/format';

const forecast = [
  {day: 'Tue', icon: '☀️', high: 73, low: 54, condition: 'Sunny'},
  {day: 'Wed', icon: '⛅', high: 70, low: 52, condition: 'Partly Cloudy'},
  {day: 'Thu', icon: '☁️', high: 65, low: 50, condition: 'Cloudy'},
  {day: 'Fri', icon: '🌬️', high: 68, low: 48, condition: 'Windy'},
  {day: 'Sat', icon: '🌧️', high: 60, low: 47, condition: 'Rain'},
];

export const Forecast = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const selector = useAppSelector(state => state.weather);

  useEffect(() => {
    dispatch(getForecast('Amsterdam'));
  }, [dispatch]);

  console.log(selector);

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
      <FlatList
        data={selector.forecast}
        renderItem={({item, index}) => (
          <AnimatedView
            animation="fadeInUp"
            delay={index * 150}
            style={[
              styles.card,
              {backgroundColor: theme.secondaryBackgroundColor},
            ]}>
            <Text style={styles.date}>
              {format(new Date(item.dt_txt), 'dd/MM - EE')}
            </Text>
            <Text style={styles.condition}>
              {mapIcon(item?.weather?.[0]?.icon ?? '')}{' '}
              {item?.weather?.[0]?.main}
            </Text>
            <Text style={styles.temp}>
              {Number(item.main.temp_min).toFixed(1)}° /{' '}
              {Number(item.main.temp_max).toFixed(1)}°
            </Text>
          </AnimatedView>
        )}
        keyExtractor={item => item.dt_txt}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 20},
  card: {
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  date: {fontWeight: 'bold', fontSize: 16},
  condition: {fontSize: 16, marginTop: 4},
  temp: {fontSize: 14, marginTop: 2},
});
