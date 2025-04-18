import {Text} from '../ui-components/Text';
import {View, StyleSheet, Animated} from 'react-native';
import {View as AnimatedView} from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import {useCallback, useEffect, useMemo} from 'react';
import {useTheme} from '../ui-components/theme';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useAppDispatch, useAppSelector} from '../utils/redux';
import {getWeatherByLatLng} from '../stores/slices/weatherSlice';
import Geolocation from 'react-native-geolocation-service';
import {ClickableContainer} from '../ui-components/ClickableContainer';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../types';
import {Routes} from '../utils/constants';
import {Spinner} from '../ui-components/Spinner';
import {showMessage} from '../utils/toast';
import {
  findCityByLatLng,
  setCurrentLocation,
} from '../stores/slices/searchSlice';
import {WeatherContent} from '../ui-components/WeatherContent';
import {Error} from '../ui-components/Error';

export const Home = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const theme = useTheme();

  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(state => state.weather.loadingWeather);
  const errorWeather = useAppSelector(state => state.weather.error);
  const errorSearch = useAppSelector(state => state.search.error);
  const selectedCity = useAppSelector(state => state.search.selectedCity);

  useEffect(() => {
    if (selectedCity) {
      dispatch(
        getWeatherByLatLng({
          lat: selectedCity.latitude,
          lng: selectedCity.longitude,
        }),
      );
    }
  }, [dispatch, selectedCity]);

  const onPressCurrentLocation = useCallback(() => {
    showMessage('Obtaining your current location...');
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        dispatch(findCityByLatLng({lat: latitude, lng: longitude}));
        dispatch(setCurrentLocation(true));
        showMessage('Location updated!');
      },
      error => {
        showMessage(
          'Error while obtaining your current location. Please try again',
        );
        console.error('Location errorWeather:', error);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }, [dispatch]);

  const content = useMemo(
    () =>
      errorWeather || errorSearch ? (
        <Error error={(errorWeather ?? errorSearch)!} />
      ) : isLoading ? (
        <View style={styles.content}>
          <Spinner />
        </View>
      ) : (
        <WeatherContent />
      ),
    [errorWeather, errorSearch, isLoading],
  );

  return (
    <LinearGradient colors={theme.gradient} style={styles.container}>
      <SafeAreaView style={styles.container}>
        <Animated.ScrollView contentContainerStyle={styles.content}>
          {content}
          {/* TODO: This card could be shown up to the user click on the current location and hide using a store to remove the attention of the user */}
          <AnimatedView
            animation="zoomIn"
            style={[styles.card, {backgroundColor: theme.backgroundColor}]}>
            <Text style={styles.title}>Welcome</Text>
            <Text style={styles.message}>
              How would you like to set your location?
            </Text>
            <ClickableContainer
              style={[styles.button, {backgroundColor: theme.buttonBackground}]}
              onPress={onPressCurrentLocation}>
              <Text
                style={[styles.buttonText, {color: theme.text.buttonLabel}]}>
                Use Current Location
              </Text>
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
  card: {
    padding: 25,
    borderRadius: 12,
    width: '85%',
  },
  title: {fontSize: 22, fontWeight: 'bold', marginBottom: 10},
  message: {fontSize: 16, marginBottom: 20},
  button: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  buttonText: {fontWeight: 'bold', textAlign: 'center'},
  secondary: {textAlign: 'center', marginTop: 10},
});
