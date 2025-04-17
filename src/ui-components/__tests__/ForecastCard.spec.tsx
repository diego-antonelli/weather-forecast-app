import React from 'react';
import {render} from '@testing-library/react-native';
import {ForecastCard} from '../ForecastCard';
import {useTheme} from '../theme';
import {SimpleForecast} from '../../services/weather';

jest.mock('../theme', () => ({
  useTheme: jest.fn(),
}));

jest.mock('react-native-animatable', () => ({
  View: jest.fn(({children}) => children),
}));

jest.mock('react-native-permissions', () => {
  return {
    __esModule: true,
    check: jest.fn(() => Promise.resolve('granted')),
    request: jest.fn(() => Promise.resolve('granted')),
    openSettings: jest.fn(() => Promise.resolve()),
    PERMISSIONS: {
      ANDROID: {
        CAMERA: 'android.permission.CAMERA',
      },
      IOS: {
        CAMERA: 'ios.permission.CAMERA',
      },
    },
    RESULTS: {
      GRANTED: 'granted',
      DENIED: 'denied',
      BLOCKED: 'blocked',
      UNAVAILABLE: 'unavailable',
    },
  };
});

jest.mock('@react-native-vector-icons/feather', () => {
  return {
    __esModule: true,
    default: () => 'MockedFeatherIcon',
  };
});

describe('ForecastCard Component', () => {
  const mockTheme = {
    secondaryBackgroundColor: '#f0f0f0',
    text: {primaryColor: '#000'},
  };

  beforeEach(() => {
    (useTheme as jest.Mock).mockReturnValue(mockTheme);
  });

  it('renders the forecast card with basic details', () => {
    const mockItem: SimpleForecast = {
      city: 'Test City',
      date: '2023-10-01',
      description: 'Sunny',
      icon: 'sun',
      minTemperature: 15,
      maxTemperature: 25,
      byTime: [],
    } as SimpleForecast;

    const {getByTestId} = render(<ForecastCard item={mockItem} index={0} />);

    expect(getByTestId('date')).toBeTruthy();
    expect(getByTestId('date').children[0]).toBe('2023-10-01');
    expect(getByTestId('condition')).toBeTruthy();
    expect(getByTestId('condition').children[0]).toContain('☀️');
    expect(getByTestId('condition').children[2]).toContain('Sunny');
    expect(getByTestId('temperatures')).toBeTruthy();
    expect(getByTestId('temperatures').children[1]).toContain('15');
  });

  it('renders the hourly forecast when byTime data is provided', () => {
    const mockItem: SimpleForecast = {
      city: 'Test City',
      date: '2023-10-01',
      description: 'Cloudy',
      icon: 'cloud',
      minTemperature: 10,
      maxTemperature: 20,
      byTime: [
        {time: '10:00', icon: 'cloud', temperature: 12},
        {time: '11:00', icon: 'cloud', temperature: 14},
      ],
    } as SimpleForecast;

    const {getByText, getAllByTestId} = render(
      <ForecastCard item={mockItem} index={0} />,
    );

    expect(getByText('Hourly forecast')).toBeTruthy();
    expect(getAllByTestId('hourly-time')[0]).toBeTruthy();
    expect(getAllByTestId('hourly-time')[0].children[0]).toBe('10:00');
    expect(getAllByTestId('hourly-temperature')[0]).toBeTruthy();
    expect(getAllByTestId('hourly-temperature')[0].children[0]).toBe('12°');
    expect(getAllByTestId('hourly-time')[1]).toBeTruthy();
    expect(getAllByTestId('hourly-time')[1].children[0]).toBe('11:00');
    expect(getAllByTestId('hourly-temperature')[1]).toBeTruthy();
    expect(getAllByTestId('hourly-temperature')[1].children[0]).toBe('14°');
  });
});
