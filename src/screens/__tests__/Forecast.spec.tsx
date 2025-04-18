import React from 'react';
import {render, screen, waitFor} from '@testing-library/react-native';
import {Forecast} from '../Forecast';
import {mockUseDispatch, mockUseSelector} from '../../../jest.setup.ts';
import {SimpleForecast} from '../../services/weather.ts';

jest.mock('../../stores/slices/weatherSlice', () => ({
  getForecastByLatLng: jest.fn(),
}));

describe('Forecast Component', () => {
  beforeEach(() => {
    mockUseSelector.mockClear();
    mockUseDispatch.mockClear();
  });

  it('renders loading spinner when loadingForecast is true', () => {
    mockUseSelector.mockReturnValueOnce([]); //Forecast
    mockUseSelector.mockReturnValueOnce(true); //Loading
    mockUseSelector.mockReturnValueOnce(undefined); //Error
    mockUseSelector.mockReturnValueOnce(undefined); //Selected City

    render(<Forecast />);

    expect(screen.getByTestId('loading-spinner')).toBeTruthy();
  });

  it('renders forecast data when available', async () => {
    const mockForecast = [
      {
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
      },
    ] as SimpleForecast[];

    mockUseSelector.mockReturnValueOnce(mockForecast); //Forecast
    mockUseSelector.mockReturnValueOnce(false); //Loading
    mockUseSelector.mockReturnValueOnce(undefined); //Error
    mockUseSelector.mockReturnValueOnce(undefined); //Selected City

    render(<Forecast />);

    await waitFor(() => {
      expect(screen.getByText('2023-10-01')).toBeTruthy();
      expect(screen.getByTestId('condition').children[2]).toBe('Cloudy');
      expect(screen.getByTestId('temperatures').children[1]).toBe('10°');
      expect(screen.getByTestId('temperatures').children[4]).toBe('20°');
    });
  });

  it('renders error message when errorForecast is present', () => {
    mockUseSelector.mockReturnValueOnce(undefined); //Forecast
    mockUseSelector.mockReturnValueOnce(false); //Loading
    mockUseSelector.mockReturnValueOnce('Failed to fetch forecast'); //Error
    mockUseSelector.mockReturnValueOnce(undefined); //Selected City

    render(<Forecast />);

    //@ts-expect-error mocked AnimatedText causes the element to contain a text outside a Text component
    expect(screen.getByTestId('error-message').children[0].children[1]).toBe(
      'Failed to fetch forecast',
    );
  });
});
