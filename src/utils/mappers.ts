import {Forecast, SimpleForecast} from '../../services/weather';
import {format} from 'date-fns/format';

export function mapForecastsToSimpleForecasts(
  city: string,
  forecasts: Forecast[],
) {
  const forecastMap = new Map<string, SimpleForecast>();
  forecasts.forEach((forecast: Forecast) => {
    const date = format(new Date(forecast.dt_txt), 'dd/MM - EE');
    const existingForecast = forecastMap.get(date);
    if (existingForecast) {
      if (existingForecast.minTemperature > forecast.main.temp_min) {
        existingForecast.minTemperature = forecast.main.temp_min;
      }
      if (existingForecast.maxTemperature < forecast.main.temp_max) {
        existingForecast.maxTemperature = forecast.main.temp_max;
      }
      existingForecast.byTime.push({
        time: format(new Date(forecast.dt_txt), 'HH:mm'),
        icon: forecast.weather[0].icon,
        temperature: forecast.main.temp,
      });
    } else {
      forecastMap.set(date, {
        city,
        date: date,
        minTemperature: forecast.main.temp_min,
        maxTemperature: forecast.main.temp_max,
        icon: forecast.weather[0].icon,
        description: forecast.weather[0].main,
        byTime: [
          {
            time: format(new Date(forecast.dt_txt), 'HH:mm'),
            icon: forecast.weather[0].icon,
            temperature: forecast.main.temp,
          },
        ],
      });
    }
  });
  return Array.from(forecastMap.values());
}

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
