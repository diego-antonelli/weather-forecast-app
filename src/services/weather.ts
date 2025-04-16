import {OPEN_WEATHER_MAP_KEY} from '../utils/constants.ts';

const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export type Prediction =
  | 'sunny'
  | 'rainy'
  | 'cloudy'
  | 'partially-cloudy'
  | 'snow';

export interface SimpleForecast {
  prediction: Prediction;
  temperature: number;
}

export type Forecast = {
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

export const fetchCurrentWeather = async (city: string) => {
  const res = await fetch(
    `${BASE_URL}/weather?q=${city}&appid=${OPEN_WEATHER_MAP_KEY}&units=metric&lang=en`,
  );
  if (!res.ok) {
    throw new Error('Weather not found');
  }
  return res.json();
};

export const fetchForecast = async (city: string) => {
  const res = await fetch(
    `${BASE_URL}/forecast?q=${city}&appid=${OPEN_WEATHER_MAP_KEY}&units=metric&lang=en`,
  );
  if (!res.ok) {
    throw new Error('Forecast not found');
  }
  const data = await res.json();
  // every 24 hours
  return data.list.filter((_: any, i: number) => i % 8 === 0);
};

export const fetchForecastLatLng = async (city: string) => {
  const res = await fetch(
    `${BASE_URL}/forecast?q=${city}&appid=${OPEN_WEATHER_MAP_KEY}&units=metric&lang=en`,
  );
  if (!res.ok) {
    throw new Error('Forecast not found');
  }
  const data = await res.json();
  // every 24 hours
  return data.list.filter((_: any, i: number) => i % 8 === 0);
};

export function mapIcon(icon: string) {
  switch (icon) {
    case '01d': //Sunny
    case '01n': //Sunny (night)
      return '☀️';
    case '02d': //Few clouds
    case '02n': //Few clouds (night)
      return '⛅';
    case '03d': //Scattered Clouds
    case '03n': //Scattered Clouds (Night)
    case '04d': //Broken clouds
    case '04n': //Broken clouds (Night)
    case '50d': //Mist
    case '50n': //Mist (Night)
      return '☁️';
    case '09d': //Showers
    case '09n': //Showers (Night)
    case '10d': //Rain
    case '10n': //Rain (Night)
    case '11d': //Thunderstorm
    case '11n': //Thunderstorm (Night)
      return '🌧';
    case '13d': //Snow
    case '13n': //Snow (Night)
      return '❄️';
    default:
      return '☀️';
  }
}
