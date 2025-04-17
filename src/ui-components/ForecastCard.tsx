import {mapIcon, SimpleForecast} from '../services/weather.ts';
import {Text} from './Text.tsx';
import FeatherIcon from '@react-native-vector-icons/feather';
import {formatTemperature} from '../utils/formats.ts';
import {FlatList, StyleSheet} from 'react-native';
import {View as AnimatedView} from 'react-native-animatable';
import React from 'react';
import {useTheme} from './theme.ts';

export function ForecastCard({
  item,
  index,
}: {
  item: SimpleForecast;
  index: number;
}) {
  const theme = useTheme();
  return (
    <AnimatedView
      animation="fadeInUp"
      delay={index * 150}
      style={[styles.card, {backgroundColor: theme.secondaryBackgroundColor}]}>
      <Text style={styles.date}>{item.date}</Text>
      <Text style={styles.condition}>
        {mapIcon(item.icon ?? '')} {item.description}
      </Text>
      <Text style={styles.text}>
        <FeatherIcon name="thermometer" color={theme.text.primaryColor} />
        {formatTemperature(item.minTemperature)}C /{' '}
        {formatTemperature(item.maxTemperature)}C
      </Text>
      {item.byTime && (
        <>
          <Text style={styles.hourlyForecast}>Hourly forecast</Text>
          <FlatList
            removeClippedSubviews
            initialNumToRender={5}
            horizontal
            contentContainerStyle={styles.hourlyForecastContainer}
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
                <Text style={styles.text}>{item.time}</Text>
                <Text style={styles.text}>{mapIcon(item.icon ?? '')}</Text>
                <Text style={styles.text}>
                  {formatTemperature(item.temperature)}
                </Text>
              </AnimatedView>
            )}
          />
        </>
      )}
    </AnimatedView>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  date: {fontWeight: 'bold', fontSize: 16},
  condition: {fontSize: 16, marginTop: 4},
  text: {fontSize: 14, marginTop: 2},
  hourlyForecast: {fontSize: 12, marginTop: 16, marginBottom: 8},
  hourlyForecastContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});
