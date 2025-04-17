import React from 'react';
import {render} from '@testing-library/react-native';
import {WeatherContent} from '../WeatherContent';
import {useAppSelector} from '../../utils/redux';
import {useTheme} from '../theme';

jest.mock('../../utils/redux', () => ({
  useAppSelector: jest.fn(),
}));

jest.mock('../theme', () => ({
  useTheme: jest.fn(),
}));

jest.mock('react-native-animatable', () => ({
  View: jest.fn(({children}) => children),
}));

jest.mock('react-native-reanimated', () => ({
  useSharedValue: jest.fn(() => ({value: 0})),
  useAnimatedStyle: jest.fn(() => ({})),
  withRepeat: jest.fn(),
  withTiming: jest.fn(),
}));

jest.mock('@react-native-vector-icons/feather', () => {
  return {
    __esModule: true,
    default: () => 'MockedFeatherIcon',
  };
});

describe('WeatherContent Component', () => {
  const mockTheme = {
    text: {primaryColor: '#000'},
  };

  beforeEach(() => {
    (useTheme as jest.Mock).mockReturnValue(mockTheme);
  });

  it('renders city name and country correctly', () => {
    (useAppSelector as jest.Mock).mockImplementation(selector =>
      selector({
        search: {
          selectedCity: {name: 'New York', country: 'USA'},
          isCurrentLocation: false,
        },
        weather: {
          current: {
            main: {temp: 25},
            weather: [{main: 'Clear', description: 'clear sky'}],
          },
        },
      }),
    );

    const {getByText} = render(<WeatherContent />);

    expect(getByText('New York (USA)')).toBeTruthy();
    expect(getByText('25°C')).toBeTruthy();
    expect(getByText('Clear - clear sky')).toBeTruthy();
  });

  it('renders current location icon when isCurrentLocation is true', () => {
    (useAppSelector as jest.Mock).mockImplementation(selector =>
      selector({
        search: {
          selectedCity: {name: 'Paris', country: 'France'},
          isCurrentLocation: true,
        },
        weather: {
          current: {
            main: {temp: 18},
            weather: [{main: 'Cloudy', description: 'overcast clouds'}],
          },
        },
      }),
    );

    const {getByText} = render(<WeatherContent />);

    expect(getByText('Paris (France)')).toBeTruthy();
    expect(getByText('Cloudy - overcast clouds')).toBeTruthy();
  });

  it('renders weather details correctly', () => {
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

    const {getByText, getByTestId} = render(<WeatherContent />);

    expect(getByText('Tokyo (Japan)')).toBeTruthy();
    expect(getByText('30°C')).toBeTruthy();
    expect(getByText('Rain - light rain')).toBeTruthy();
    expect(getByTestId('feels-like')).toBeTruthy();
    expect(getByTestId('feels-like').children[1]).toBe('Feels like: ');
    expect(getByTestId('feels-like').children[2]).toBe('32°');
    expect(getByTestId('humidity')).toBeTruthy();
    expect(getByTestId('humidity').children[1]).toBe('Humidity: ');
    expect(getByTestId('humidity').children[2]).toBe('70%');
    expect(getByTestId('wind')).toBeTruthy();
    expect(getByTestId('wind').children[1]).toBe('Wind: ');
    expect(getByTestId('wind').children[2]).toBe('5 km/h');
  });
});
