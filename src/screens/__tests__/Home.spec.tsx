import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react-native';
import {Home} from '../Home';
import {mockUseDispatch, mockUseSelector} from '../../../jest.setup.ts';
import {Routes} from '../../utils/constants';
import {useAppSelector} from '../../utils/redux.ts';

jest.mock('react-native-geolocation-service', () => ({
  getCurrentPosition: jest.fn(),
}));

jest.mock('../../stores/slices/weatherSlice', () => ({
  getWeatherByLatLng: jest.fn(),
}));

jest.mock('../../stores/slices/searchSlice', () => ({
  findCityByLatLng: jest.fn(),
  setCurrentLocation: jest.fn(),
}));

describe('Home Component', () => {
  const mockNavigation = require('@react-navigation/native').useNavigation();
  const mockGeolocation = require('react-native-geolocation-service');

  beforeEach(() => {
    mockUseSelector.mockClear();
    mockUseDispatch.mockClear();
    mockUseDispatch.mockReturnValue(jest.fn());
    mockNavigation.navigate.mockClear();
    mockGeolocation.getCurrentPosition.mockClear();
  });

  it('renders loading spinner when isLoading is true', () => {
    mockUseSelector.mockReturnValueOnce(true); // isLoading
    mockUseSelector.mockReturnValueOnce(null); // errorWeather
    mockUseSelector.mockReturnValueOnce(null); // errorSearch
    mockUseSelector.mockReturnValueOnce(null); // selectedCity

    render(<Home />);

    expect(screen.getByTestId('loading-spinner')).toBeTruthy();
  });

  it('renders error message when errorWeather is present', () => {
    mockUseSelector.mockReturnValueOnce(false); // isLoading
    mockUseSelector.mockReturnValueOnce('Failed to fetch weather'); // errorWeather
    mockUseSelector.mockReturnValueOnce(null); // errorSearch
    mockUseSelector.mockReturnValueOnce(null); // selectedCity

    render(<Home />);

    expect(screen.getByTestId('error-message')).toBeTruthy();
    //@ts-expect-error mocked AnimatedText causes the element to contain a text outside a Text component
    expect(screen.getByTestId('error-message').children[1].children[1]).toBe(
      'Failed to fetch weather',
    );
  });

  it('renders error message when errorSearch is present', () => {
    mockUseSelector.mockReturnValueOnce(false); // isLoading
    mockUseSelector.mockReturnValueOnce(null); // errorWeather
    mockUseSelector.mockReturnValueOnce('Failed to fetch location'); // errorSearch
    mockUseSelector.mockReturnValueOnce(null); // selectedCity

    render(<Home />);

    expect(screen.getByTestId('error-message')).toBeTruthy();
    //@ts-expect-error mocked AnimatedText causes the element to contain a text outside a Text component
    expect(screen.getByTestId('error-message').children[1].children[1]).toBe(
      'Failed to fetch location',
    );
  });

  it('renders WeatherContent when no errors and not loading', () => {
    mockUseSelector.mockReturnValueOnce(false); // isLoading
    mockUseSelector.mockReturnValueOnce(null); // errorWeather
    mockUseSelector.mockReturnValueOnce(null); // errorSearch
    mockUseSelector.mockReturnValueOnce({latitude: 0, longitude: 0}); // selectedCity

    (useAppSelector as jest.Mock).mockImplementation(selector =>
      selector({
        search: {
          selectedCity: {name: 'Tokyo', country: 'Japan'},
          isCurrentLocation: false,
        },
        weather: {
          current: {
            main: {temp: 30, feels_like: 32, humidity: 70},
            wind: {speed: 5},
            weather: [{main: 'Rain', description: 'light rain'}],
          },
        },
      }),
    );

    render(<Home />);

    expect(screen.getByTestId('city-name')).toBeTruthy();
    expect(screen.getByTestId('city-name').children[0]).toBe('Tokyo');
    expect(screen.getByText('30°C')).toBeTruthy();
    expect(screen.getByText('Rain - light rain')).toBeTruthy();
    expect(screen.getByTestId('feels-like')).toBeTruthy();
    expect(screen.getByTestId('feels-like').children[1]).toBe('Feels like: ');
    expect(screen.getByTestId('feels-like').children[2]).toBe('32°');
    expect(screen.getByTestId('humidity')).toBeTruthy();
    expect(screen.getByTestId('humidity').children[1]).toBe('Humidity: ');
    expect(screen.getByTestId('humidity').children[2]).toBe('70%');
    expect(screen.getByTestId('wind')).toBeTruthy();
    expect(screen.getByTestId('wind').children[1]).toBe('Wind: ');
    expect(screen.getByTestId('wind').children[2]).toBe('5 km/h');
  });

  it('navigates to Search screen when "Enter Manually" is pressed', () => {
    mockUseSelector.mockReturnValueOnce(false); // isLoading
    mockUseSelector.mockReturnValueOnce(null); // errorWeather
    mockUseSelector.mockReturnValueOnce(null); // errorSearch
    mockUseSelector.mockReturnValueOnce(null); // selectedCity

    render(<Home />);

    const enterManuallyButton = screen.getByText('Enter Manually');
    fireEvent.press(enterManuallyButton);

    expect(mockNavigation.navigate).toHaveBeenCalledWith(Routes.Search);
  });

  it('handles current location button press', async () => {
    mockUseSelector.mockReturnValueOnce(false); // isLoading
    mockUseSelector.mockReturnValueOnce(null); // errorWeather
    mockUseSelector.mockReturnValueOnce(null); // errorSearch
    mockUseSelector.mockReturnValueOnce(null); // selectedCity

    const mockDispatch = jest.fn();
    mockUseDispatch.mockReturnValue(mockDispatch);

    mockGeolocation.getCurrentPosition.mockImplementation(
      (successCallback: Function) => {
        successCallback({coords: {latitude: 10, longitude: 20}});
      },
    );

    render(<Home />);

    const currentLocationButton = screen.getByText('Use Current Location');
    expect(currentLocationButton).toBeTruthy();
    fireEvent.press(currentLocationButton);

    expect(mockDispatch).toHaveBeenCalled();
  });
});
