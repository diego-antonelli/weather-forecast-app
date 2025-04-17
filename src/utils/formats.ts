export function formatTemperature(temperature?: number) {
  // Format temperature to a string with a degree symbol
  return `${Math.round(temperature ?? 0).toFixed(0)}°`;
}

export function formatHumidity(humidity?: number) {
  // Format humidity to a string with a percentage symbol
  return `${Math.round(humidity ?? 0).toFixed(0)}%`;
}

export function formatWindSpeed(speed?: number) {
  // Format wind speed to a string with km/h
  return `${Math.round(speed ?? 0).toFixed(0)} km/h`;
}
