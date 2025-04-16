import {AppRegistry, LogBox, StatusBar, useColorScheme} from 'react-native';
import {Provider} from 'react-redux';
import App from './App';
import {name as appName} from './app.json';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {store} from './src/stores';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NotifierWrapper} from 'react-native-notifier';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
  /VirtualizedLists/,
  /NativeEventEmitter/,
]);

export default function WrappedApp() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <GestureHandlerRootView>
      <Provider store={store}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor="transparent"
          translucent={true}
        />
        <SafeAreaProvider>
          <NotifierWrapper useRNScreensOverlay>
            <App />
          </NotifierWrapper>
        </SafeAreaProvider>
      </Provider>
    </GestureHandlerRootView>
  );
}

AppRegistry.registerComponent(appName, () => WrappedApp);
