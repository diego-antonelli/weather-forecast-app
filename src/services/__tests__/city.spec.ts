import {fetchCitySuggestions} from '../city';
import {API_NINJAS_KEY} from '../../utils/constants';

global.fetch = jest.fn();

describe('City service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchCitySuggestions', () => {
    it('fetches city suggestions successfully', async () => {
      const mockResponse = [
        {
          name: 'New York',
          latitude: 40.7128,
          longitude: -74.006,
          country: 'US',
          population: 8419600,
          region: 'New York',
          is_capital: false,
        },
      ];
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockResponse),
      });

      const result = await fetchCitySuggestions('New York');
      expect(fetch).toHaveBeenCalledWith(
        'https://api.api-ninjas.com/v1/city?name=New York',
        {headers: {'X-Api-Key': API_NINJAS_KEY}},
      );
      expect(result).toEqual(mockResponse);
    });

    it('throws an error when the API call fails', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
      });

      await expect(fetchCitySuggestions('InvalidCity')).rejects.toThrow(
        'City suggestions failed',
      );
    });
  });
});
