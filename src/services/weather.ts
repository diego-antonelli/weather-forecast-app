import {OPEN_WEATHER_MAP_KEY} from '../utils/constants';
import {City} from './city';
import {mapForecastsToSimpleForecasts} from '../utils/mappers';

const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export type Forecast = {
  dt_txt: string; //2023-10-01 12:00:00
  coord: {
    lon: number;
    lat: number;
  };
  weather: [
    {
      id: number;
      main: string; //Rain
      description: string; //Light rain
      icon: string; //10d
    },
  ];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  rain: {
    '1h': number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string; //IT
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string; //Province of Turin
  cod: number;
};

export type SimpleForecast = {
  city: string;
  date: string; //2023-10-01
  minTemperature: number; //15
  maxTemperature: number; //15
  icon: string; //10d
  description: string; //Light rain
  byTime: Array<{
    time: string;
    temperature: number;
    icon: string;
  }>;
};

export const fetchCurrentWeather = async (city: string) => {
  const res = await fetch(
    `${BASE_URL}/weather?q=${city}&appid=${OPEN_WEATHER_MAP_KEY}&units=metric&lang=en`,
  );
  if (!res.ok) {
    throw new Error('Weather not found');
  }
  return res.json();
};

export const fetchCurrentWeatherByLatLng = async (lat: number, lng: number) => {
  const res = await fetch(
    `${BASE_URL}/weather?lat=${lat}&lon=${lng}&appid=${OPEN_WEATHER_MAP_KEY}&units=metric&lang=en`,
  );
  if (!res.ok) {
    throw new Error('Weather not found');
  }
  return res.json();
};

export const getCityFromCoords = async (
  lat: number,
  lon: number,
): Promise<City> => {
  const res = await fetch(
    `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${OPEN_WEATHER_MAP_KEY}`,
  );
  const data = await res.json();
  return {
    name: data.name,
    latitude: lat,
    longitude: lon,
    country: data.sys.country,
    population: 0, // Population not available in OpenWeatherMap
    region: '', // Region not available in OpenWeatherMap
    is_capital: false, // Capital status not available in OpenWeatherMap
  };
};

export const fetchForecast = async (
  city: string,
): Promise<SimpleForecast[]> => {
  const res = await fetch(
    `${BASE_URL}/forecast?q=${city}&appid=${OPEN_WEATHER_MAP_KEY}&units=metric&lang=en`,
  );
  if (!res.ok) {
    throw new Error('Forecast not found');
  }
  const data = await res.json();
  return mapForecastsToSimpleForecasts(city, data.list);
};

export const fetchForecastByLatLng = async (
  city: string,
  lat: number,
  lng: number,
) => {
  const res = await fetch(
    `${BASE_URL}/forecast?lat=${lat}&lon=${lng}&appid=${OPEN_WEATHER_MAP_KEY}&units=metric&lang=en`,
  );
  if (!res.ok) {
    throw new Error('Forecast not found');
  }
  const data = await res.json();
  return mapForecastsToSimpleForecasts(city, data.list);
};
