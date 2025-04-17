import React, {useEffect} from 'react';
import {StyleSheet, FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTheme} from '../ui-components/theme.ts';
import {Text} from '../ui-components/Text.tsx';
import {useAppDispatch, useAppSelector} from '../utils/hooks/redux.ts';
import {
  getForecast,
  getForecastByLatLng,
} from '../stores/slices/weatherSlice.ts';
import {setCurrentLocation} from '../stores/slices/searchSlice.ts';
import {ForecastCard} from '../ui-components/ForecastCard.tsx';

export const Forecast = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const forecast = useAppSelector(state => state.weather.forecast);
  const selectedCity = useAppSelector(state => state.search.selectedCity);

  useEffect(() => {
    dispatch(getForecast('Amsterdam'));
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (selectedCity) {
      dispatch(
        getForecastByLatLng({
          name: `${selectedCity.name} (${selectedCity.country})`,
          lat: selectedCity.latitude,
          lng: selectedCity.longitude,
        }),
      );
      // dispatch(setCurrentLocation(false));
    }
  }, [dispatch, selectedCity]);

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
      <Text style={styles.city}>{forecast?.[0]?.city ?? '-'}</Text>
      <FlatList
        data={forecast}
        renderItem={({item, index}) => (
          <ForecastCard item={item} index={index} />
        )}
        keyExtractor={item => item.date}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 20},
  city: {fontSize: 26, marginBottom: 8},
});
