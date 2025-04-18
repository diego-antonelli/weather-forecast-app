import {
  fetchCurrentWeatherByLatLng,
  getCityFromCoords,
  fetchForecastByLatLng,
} from '../weather';
import {OPEN_WEATHER_MAP_KEY} from '../../utils/constants';

global.fetch = jest.fn();

describe('Weather Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchCurrentWeatherByLatLng', () => {
    it('fetches current weather successfully', async () => {
      const mockResponse = {weather: [{description: 'Clear sky'}]};
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockResponse),
      });

      const result = await fetchCurrentWeatherByLatLng(40.7128, -74.006);
      expect(fetch).toHaveBeenCalledWith(
        `https://api.openweathermap.org/data/2.5/weather?lat=40.7128&lon=-74.006&appid=${OPEN_WEATHER_MAP_KEY}&units=metric&lang=en`,
      );
      expect(result).toEqual(mockResponse);
    });

    it('throws an error when the API call fails', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
      });

      await expect(fetchCurrentWeatherByLatLng(0, 0)).rejects.toThrow(
        'Weather not found',
      );
    });
  });

  describe('getCityFromCoords', () => {
    it('fetches city details from coordinates', async () => {
      const mockResponse = {
        name: 'New York',
        sys: {country: 'US'},
      };
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockResponse),
      });

      const result = await getCityFromCoords(40.7128, -74.006);
      expect(fetch).toHaveBeenCalledWith(
        `https://api.openweathermap.org/data/2.5/weather?lat=40.7128&lon=-74.006&appid=${OPEN_WEATHER_MAP_KEY}`,
      );
      expect(result).toEqual({
        name: 'New York',
        latitude: 40.7128,
        longitude: -74.006,
        country: 'US',
        population: 0,
        region: '',
        is_capital: false,
      });
    });
  });

  describe('fetchForecastByLatLng', () => {
    it('fetches forecast data successfully', async () => {
      const mockResponse = {list: []};
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockResponse),
      });

      const result = await fetchForecastByLatLng('New York', 40.7128, -74.006);
      expect(fetch).toHaveBeenCalledWith(
        `https://api.openweathermap.org/data/2.5/forecast?lat=40.7128&lon=-74.006&appid=${OPEN_WEATHER_MAP_KEY}&units=metric&lang=en`,
      );
      expect(result).toEqual([]);
    });

    it('throws an error when the API call fails', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
      });

      await expect(fetchForecastByLatLng('InvalidCity', 0, 0)).rejects.toThrow(
        'Forecast not found',
      );
    });
  });
});
