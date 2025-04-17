import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useTheme} from '../ui-components/theme';
import {ClickableContainer} from '../ui-components/ClickableContainer';
import {Routes} from '../utils/constants';
import {Home} from '../screens/Home';
import {Text} from '../ui-components/Text';
import React, {ReactNode, useCallback} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StyleSheet} from 'react-native';
import Icon from '@react-native-vector-icons/fontisto';
import FeatherIcon from '@react-native-vector-icons/feather';
import {SplashScreen} from '../screens/SplashScreen';
import {Forecast} from '../screens/Forecast';
import SearchScreen from '../screens/Search';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const getOptions = (props: any, theme: any) => {
  return {
    headerShown: false,
    headerBackTitleVisible: false,
    headerBackVisible: false,
    headerShadowVisible: false,
    headerTitleStyle: {
      fontSize: 20,
      fontWeight: '500',
    } as any,
    headerLeft: ({canGoBack}: any) =>
      canGoBack && (
        <ClickableContainer onPress={props.navigation.goBack}>
          <Icon name="arrow-left" color={theme.text.primaryColor} size={24} />
        </ClickableContainer>
      ),
  };
};

function TabStack() {
  const theme = useTheme();
  const renderTabLabel = useCallback(
    ({
      focused,
      children,
    }: {
      focused: boolean;
      color: string;
      children: ReactNode;
    }) => (
      <Text
        allowFontScaling={false}
        style={StyleSheet.flatten([
          styles.tabLabel,
          focused ? styles.focusedTabLabel : undefined,
          {color: focused ? theme.buttonBackground : theme.text.primaryColor},
        ])}>
        {children}
      </Text>
    ),
    [theme.buttonBackground, theme.text.primaryColor],
  );

  const renderTabIcon = useCallback(
    (tabParams: any) =>
      ({focused}: {focused: boolean}) => {
        switch (tabParams.route.name) {
          case Routes.Home:
            return (
              <FeatherIcon
                size={focused ? 18 : 22}
                color={
                  focused ? theme.buttonBackground : theme.text.primaryColor
                }
                name="sun"
              />
            );
          case Routes.Forecast:
            return (
              <FeatherIcon
                size={focused ? 18 : 22}
                color={
                  focused ? theme.buttonBackground : theme.text.primaryColor
                }
                name="bar-chart-2"
              />
            );
          case Routes.Search:
            return (
              <FeatherIcon
                size={focused ? 18 : 22}
                color={
                  focused ? theme.buttonBackground : theme.text.primaryColor
                }
                name="search"
              />
            );
          default:
            return (
              <Icon
                size={focused ? 18 : 22}
                color={
                  focused ? theme.buttonBackground : theme.text.primaryColor
                }
                name="question"
              />
            );
        }
      },
    [theme.buttonBackground, theme.text.primaryColor],
  );

  return (
    <Tab.Navigator
      detachInactiveScreens
      screenOptions={tabParams => ({
        headerShown: false,
        headerShadowVisible: false,
        headerTitleStyle: {
          fontSize: 20,
          fontWeight: '500',
        } as any,
        tabBarIcon: renderTabIcon(tabParams),
        tabBarLabel: renderTabLabel,
        tabBarShowLabel: true,
        tabBarLabelStyle: styles.tabLabel,
        tabBarLabelPosition: 'below-icon',
        tabBarActiveTintColor: theme.text.disabledColor,
        tabBarInactiveTintColor: theme.text.disabledColor,
        tabBarStyle: StyleSheet.flatten([
          styles.tabBar,
          {
            backgroundColor: theme.backgroundColor,
            borderTopColor: theme.borderColor,
          },
        ]),
      })}>
      <Tab.Screen
        name={Routes.Home}
        component={Home}
        options={{title: 'Current'}}
      />
      <Tab.Screen
        name={Routes.Forecast}
        component={Forecast}
        options={{title: 'Forecast'}}
      />
      <Tab.Screen
        name={Routes.Search}
        component={SearchScreen}
        options={{title: 'Search'}}
      />
    </Tab.Navigator>
  );
}

export function AppNavigator() {
  const theme = useTheme();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={Routes.Splash}>
        <Stack.Screen
          name={Routes.Splash}
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Group screenOptions={props => getOptions(props, theme)}>
          <Stack.Screen name={Routes.HomeTab} component={TabStack} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    paddingVertical: 10,
    justifyContent: 'space-around',
    borderTopWidth: 0.5,
  },
  tab: {alignItems: 'center', flex: 1},
  iconWrapper: {alignItems: 'center'},
  label: {fontSize: 12, color: '#fff', marginTop: 4},
  tabLabel: {
    fontSize: 12,
    fontWeight: '400',
  },
  focusedTabLabel: {fontWeight: '600'},
});
