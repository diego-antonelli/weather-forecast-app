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

type Forecast = {
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

export async function getWeather({
  cityName,
}: {
  cityName: string;
}): Promise<SimpleForecast | undefined> {
  try {
    console.log('Calling API');
    const request = await fetch(
      BASE_URL +
        `/weather?q=${cityName}&appid=${OPEN_WEATHER_MAP_KEY}&lang=en&units=metric`,
    );
    console.log('Called');
    const forecast: Forecast = await request.json();
    console.log(forecast);
    return {
      prediction: mapPrediction(forecast.weather[0].icon),
      temperature: forecast.main.temp,
    };
  } catch (e) {
    console.error(e);
    return undefined;
  }
}

function mapPrediction(icon: string) {
  switch (icon) {
    case '01d': //Sunny
    case '01n': //Sunny (night)
      return 'sunny';
    case '02d': //Few clouds
    case '02n': //Few clouds (night)
      return 'partially-cloudy';
    case '03d': //Scattered Clouds
    case '03n': //Scattered Clouds (Night)
    case '04d': //Broken clouds
    case '04n': //Broken clouds (Night)
    case '50d': //Mist
    case '50n': //Mist (Night)
      return 'cloudy';
    case '09d': //Showers
    case '09n': //Showers (Night)
    case '10d': //Rain
    case '10n': //Rain (Night)
    case '11d': //Thunderstorm
    case '11n': //Thunderstorm (Night)
      return 'rainy';
    case '13d': //Snow
    case '13n': //Snow (Night)
      return 'snow';
    default:
      return 'sunny';
  }
}
