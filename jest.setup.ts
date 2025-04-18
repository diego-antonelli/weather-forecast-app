require('react-native-reanimated').setUpTests();

export const mockUseSelector = jest.fn();
export const mockUseDispatch = jest.fn();

jest.mock('react-redux', () => ({
  useSelector: mockUseSelector,
  useDispatch: mockUseDispatch,
}));

jest.mock('react-native-permissions', () => {
  return {
    __esModule: true,
    check: jest.fn(() => Promise.resolve('granted')),
    request: jest.fn(() => Promise.resolve('granted')),
    openSettings: jest.fn(() => Promise.resolve()),
    PERMISSIONS: {
      ANDROID: {
        CAMERA: 'android.permission.CAMERA',
      },
      IOS: {
        CAMERA: 'ios.permission.CAMERA',
      },
    },
    RESULTS: {
      GRANTED: 'granted',
      DENIED: 'denied',
      BLOCKED: 'blocked',
      UNAVAILABLE: 'unavailable',
    },
  };
});

jest.mock('react-native-notifier', () => {
  return {
    Notifier: {
      showNotification: jest.fn(),
      hideNotification: jest.fn(),
    },
  };
});

jest.mock('@react-navigation/native-stack', () => {
  return {
    createNativeStackNavigator: jest.fn(() => ({
      Navigator: jest.fn(({children}) => children),
      Group: jest.fn(({children}) => children),
      Screen: jest.fn(({children}) => children),
    })),
  };
});

jest.mock('@react-navigation/bottom-tabs', () => {
  return {
    createBottomTabNavigator: jest.fn(() => ({
      Navigator: jest.fn(({children}) => children),
      Group: jest.fn(({children}) => children),
      Screen: jest.fn(({children}) => children),
    })),
  };
});

jest.mock('@react-navigation/native', () => {
  return {
    __esModule: true,
    useNavigation: jest.fn(),
    useRoute: jest.fn(),
    NavigationContainer: jest.fn(({children}) => children),
  };
});

jest.mock('react-native-animatable', () => {
  return {
    __esModule: true,
    View: jest.fn(({children}) => children),
    Text: jest.fn(({children}) => children),
  };
});

jest.mock('react-native-linear-gradient', () => {
  return jest.fn(({children}) => children);
});

jest.mock('react-native-geolocation-service', () => ({
  getCurrentPosition: jest.fn((success, error) =>
    success({
      coords: {
        latitude: 37.7749,
        longitude: -122.4194,
        accuracy: 1,
        altitude: null,
        heading: null,
        speed: null,
      },
      timestamp: Date.now(),
    }),
  ),
  watchPosition: jest.fn(),
  clearWatch: jest.fn(),
  stopObserving: jest.fn(),
}));

jest.mock('@react-native-vector-icons/feather', () => {
  return jest.fn(() => null);
});
