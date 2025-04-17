import {API_NINJAS_KEY} from '../utils/constants';

export type City = {
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  population: number;
  region: string;
  is_capital: boolean;
};

export const fetchCitySuggestions = async (query: string) => {
  const res = await fetch(`https://api.api-ninjas.com/v1/city?name=${query}`, {
    headers: {'X-Api-Key': API_NINJAS_KEY},
  });
  if (!res.ok) {
    throw new Error('City suggestions failed');
  }
  const data: City[] = await res.json();
  return data;
};
