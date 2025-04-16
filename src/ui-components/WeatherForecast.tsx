import {StyleSheet, View} from 'react-native';
import SunnyIcon from '../assets/forecast-sunny.svg';
import RainyIcon from '../assets/forecast-rainy.svg';
import PartiallyCloudyIcon from '../assets/forecast-partially-cloudy.svg';
import SnowIcon from '../assets/forecast-snow.svg';
import CloudyIcon from '../assets/forecast-cloudy.svg';
import {Text} from './Text.tsx';
import {fonts, theme} from './theme.ts';
import {useEffect, useMemo, useRef, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../utils/hooks/redux.ts';
import {getWeather} from '../services/weather.ts';
import {Spinner} from './Spinner.tsx';
import {addForecast} from '../stores/slices/forecastSlice.ts';

export interface WeatherForecastProps {
  city: string;
}
export function WeatherForecast({city}: WeatherForecastProps) {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const date = new Date().toLocaleDateString('nl-NL');
  const forecasts = useAppSelector(state => state.forecasts.forecasts);
  const forecast = useMemo(
    () => forecasts.find(f => f.city === city && f.date === date),
    [city, date, forecasts],
  );
  const firstLoad = useRef(true);
  const Icon = useMemo(() => {
    switch (forecast?.prediction) {
      case 'sunny':
        return SunnyIcon;
      case 'partially-cloudy':
        return PartiallyCloudyIcon;
      case 'cloudy':
        return CloudyIcon;
      case 'rainy':
        return RainyIcon;
      case 'snow':
        return SnowIcon;
      default:
        return SunnyIcon;
    }
  }, [forecast?.prediction]);

  useEffect(() => {
    if (firstLoad.current) {
      if (!forecast) {
        (async function () {
          setLoading(true);
          try {
            if (city) {
              const result = await getWeather({cityName: city});
              if (result) {
                dispatch(
                  addForecast({
                    city,
                    date,
                    temperature: result.temperature,
                    prediction: result.prediction,
                  }),
                );
              }
            }
          } catch (e) {
            console.error(e);
          } finally {
            setLoading(false);
          }
        })();
      }
      firstLoad.current = false;
    }
  }, [city, date, dispatch, forecast]);
  if (loading) {
    return (
      <View style={styles.container}>
        <Spinner style={{marginHorizontal: 32}} />
      </View>
    );
  }
  if (!forecast?.prediction) {
    return null;
  }
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Icon stroke={theme.primaryColor} />
        <Text style={styles.temperature}>
          {Math.round(forecast.temperature)}&deg;C,
        </Text>
        <Text style={styles.prediction}>{forecast.prediction}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.backgroundColor,
    borderRadius: 20,
  },
  innerContainer: {
    flexDirection: 'row',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: theme.alphaPrimaryColor,
  },
  temperature: {
    ...fonts.mediumBodyRegular,
    fontSize: 13,
    marginHorizontal: 4,
    color: theme.primaryColor,
  },
  prediction: {
    ...fonts.mediumBodyRegular,
    fontSize: 13,
    color: theme.primaryColor,
  },
});
