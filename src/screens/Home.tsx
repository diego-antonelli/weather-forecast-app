import {Text} from '../ui-components/Text.tsx';
import {WeatherForecast} from '../ui-components/WeatherForecast.tsx';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors} from '../ui-components/theme.ts';
import FeatherIcon from '@react-native-vector-icons/feather';
import React from 'react';

export function Home() {
  return (
    <SafeAreaView>
      <Text>Teste</Text>
      {/*<WeatherForecast city="Rotterdam" />*/}
      <FeatherIcon size={22} color={colors.black} name="sun" />
    </SafeAreaView>
  );
}
