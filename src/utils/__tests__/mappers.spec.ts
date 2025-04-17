import {mapForecastsToSimpleForecasts, mapIcon} from '../index';
import {Forecast} from '../../../services/weather.ts';

jest.mock('date-fns/format', () => ({
  __esModule: true,
  format: jest
    .fn()
    .mockImplementation((date: Date, formatString: string) => formatString),
}));

describe('mapForecastsToSimpleForecasts', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should map forecasts to simple forecasts correctly', () => {
    const mockCity = 'Test City';
    const mockForecasts: Forecast[] = [
      {
        dt_txt: '2023-10-01T12:00:00',
        main: {temp_min: 10, temp_max: 20, temp: 15},
        weather: [{icon: '01d', main: 'Clear'}],
      } as Forecast,
      {
        dt_txt: '2023-10-01T18:00:00',
        main: {temp_min: 8, temp_max: 22, temp: 18},
        weather: [{icon: '01d', main: 'Clear'}],
      } as Forecast,
    ];

    const result = mapForecastsToSimpleForecasts(mockCity, mockForecasts);

    expect(result).toEqual([
      {
        city: 'Test City',
        date: 'dd/MM - EE',
        minTemperature: 8,
        maxTemperature: 22,
        icon: '01d',
        description: 'Clear',
        byTime: [
          {time: 'HH:mm', icon: '01d', temperature: 15},
          {time: 'HH:mm', icon: '01d', temperature: 18},
        ],
      },
    ]);
  });
});

describe('mapIcon', () => {
  it('should return the correct emoji for known icons', () => {
    expect(mapIcon('01d')).toBe('☀️');
    expect(mapIcon('02d')).toBe('⛅');
    expect(mapIcon('13d')).toBe('❄️');
  });

  it('should return the default emoji for unknown icons', () => {
    expect(mapIcon('unknown')).toBe('☀️');
  });
});
