import React, {useEffect} from 'react';
import {StyleSheet, FlatList} from 'react-native';
import {View as AnimatedView} from 'react-native-animatable';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTheme} from '../ui-components/theme.ts';
import {Text} from '../ui-components/Text.tsx';
import {useAppDispatch, useAppSelector} from '../utils/hooks/redux.ts';
import {getForecast} from '../stores/slices/weatherSlice.ts';
import {mapIcon} from '../services/weather.ts';
import FeatherIcon from '@react-native-vector-icons/feather';

export const Forecast = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const forecast = useAppSelector(state => state.weather.forecast);

  useEffect(() => {
    dispatch(getForecast('Amsterdam'));
  }, [dispatch]);

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
      <Text style={styles.city}>{forecast?.[0]?.city ?? '-'}</Text>
      <FlatList
        data={forecast}
        renderItem={({item, index}) => (
          <AnimatedView
            animation="fadeInUp"
            delay={index * 150}
            style={[
              styles.card,
              {backgroundColor: theme.secondaryBackgroundColor},
            ]}>
            <Text style={styles.date}>{item.date}</Text>
            <Text style={styles.condition}>
              {mapIcon(item.icon ?? '')} {item.description}
            </Text>
            <Text style={styles.temp}>
              <FeatherIcon name="thermometer" color={theme.text.primaryColor} />
              {Number(item.minTemperature).toFixed(1)}&deg;C /{' '}
              {Number(item.maxTemperature).toFixed(1)}&deg;C
            </Text>
            <Text style={styles.byHour}>Hourly forecast</Text>
            <FlatList
              horizontal
              contentContainerStyle={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-evenly',
              }}
              data={item.byTime}
              keyExtractor={item => item.time}
              renderItem={({item, index}) => (
                <AnimatedView
                  animation="fadeInUp"
                  delay={index * 150}
                  style={{
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}>
                  <Text style={styles.temp}>{item.time}</Text>
                  <Text style={styles.temp}>{mapIcon(item.icon ?? '')}</Text>
                  <Text style={styles.temp}>
                    {Number(item.temperature).toFixed(1)}&deg;
                  </Text>
                </AnimatedView>
              )}
            />
          </AnimatedView>
        )}
        keyExtractor={item => item.date}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 20},
  city: {fontSize: 26, marginBottom: 8},
  card: {
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  date: {fontWeight: 'bold', fontSize: 16},
  condition: {fontSize: 16, marginTop: 4},
  temp: {fontSize: 14, marginTop: 2},
  byHour: {fontSize: 12, marginVertical: 8},
});
