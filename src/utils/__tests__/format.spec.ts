import {formatTemperature, formatHumidity, formatWindSpeed} from '../formats';

describe('formatTemperature', () => {
  it('should format a valid temperature with a degree symbol', () => {
    expect(formatTemperature(25.6)).toBe('26°');
    expect(formatTemperature(0)).toBe('0°');
    expect(formatTemperature(-5.4)).toBe('-5°');
  });

  it('should default to 0° when temperature is undefined', () => {
    expect(formatTemperature(undefined)).toBe('0°');
  });
});

describe('formatHumidity', () => {
  it('should format a valid humidity with a percentage symbol', () => {
    expect(formatHumidity(45.7)).toBe('46%');
    expect(formatHumidity(0)).toBe('0%');
    expect(formatHumidity(100)).toBe('100%');
  });

  it('should default to 0% when humidity is undefined', () => {
    expect(formatHumidity(undefined)).toBe('0%');
  });
});

describe('formatWindSpeed', () => {
  it('should format a valid wind speed with "km/h"', () => {
    expect(formatWindSpeed(12.3)).toBe('12 km/h');
    expect(formatWindSpeed(0)).toBe('0 km/h');
    expect(formatWindSpeed(100.8)).toBe('101 km/h');
  });

  it('should default to 0 km/h when wind speed is undefined', () => {
    expect(formatWindSpeed(undefined)).toBe('0 km/h');
  });
});
