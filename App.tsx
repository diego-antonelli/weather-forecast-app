import React, {useEffect} from 'react';
import {Platform} from 'react-native';

import {check, PERMISSIONS, request} from 'react-native-permissions';
import {showMessage} from './src/utils/toast.ts';
import {AppNavigator} from './src/navigation';

function App(): React.JSX.Element {
  // const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    const permission = Platform.select({
      ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      macos: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    });
    check(permission!).then(result => {
      if (result === 'blocked' || result === 'denied') {
        request(permission!).then(resultRequest => {
          if (resultRequest === 'blocked' || resultRequest === 'denied') {
            showMessage(
              'WeatherForecast uses your location in order to help your app experience, please enable it.',
            );
          }
        });
      }
    });
  }, []);

  return <AppNavigator />;
}

export default App;
