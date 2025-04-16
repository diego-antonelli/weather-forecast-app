import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {colors, fonts, theme} from '../ui-components/theme.ts';
import {ClickableContainer} from '../ui-components/ClickableContainer.tsx';
import {Routes} from '../utils/constants.ts';
import {Home} from '../screens/Home.tsx';
import {Text} from '../ui-components/Text.tsx';
import React, {ReactNode, useCallback} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StyleSheet} from 'react-native';
import Icon from '@react-native-vector-icons/fontisto';
import FeatherIcon from '@react-native-vector-icons/feather';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const getOptions = (props: any) => ({
  headerShown: false,
  headerBackTitleVisible: false,
  headerBackVisible: false,
  headerShadowVisible: false,
  headerTitleStyle: fonts.mediumTitle as any,
  headerLeft: ({canGoBack}: any) =>
    canGoBack && (
      <ClickableContainer onPress={props.navigation.goBack}>
        <Icon name="arrow-left" color={colors.black} size={24} />
      </ClickableContainer>
    ),
});

function HomeStack() {
  return (
    <Stack.Navigator initialRouteName={Routes.Home} screenOptions={getOptions}>
      <Stack.Screen name={Routes.Home} component={Home} />
    </Stack.Navigator>
  );
}

function TabStack() {
  const renderTabLabel = useCallback(
    ({
      focused,
      color,
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
          {color},
        ])}>
        {children}
      </Text>
    ),
    [],
  );

  const renderTabIcon = useCallback(
    (tabParams: any) =>
      ({focused}: {focused: boolean}) => {
        console.log(tabParams.route.name);
        switch (tabParams.route.name) {
          case Routes.HomeTab:
            return <FeatherIcon size={22} color={colors.black} name="sun" />;
          default:
            return <Icon size={22} color={colors.black} name="amazon" />;
        }
      },
    [],
  );

  return (
    <Tab.Navigator
      detachInactiveScreens
      screenOptions={tabParams => ({
        headerShown: false,
        headerShadowVisible: false,
        headerTitleStyle: fonts.mediumTitle as any,
        tabBarIcon: renderTabIcon(tabParams),
        tabBarLabel: renderTabLabel,
        tabBarShowLabel: true,
        tabBarLabelStyle: styles.tabLabel,
        tabBarLabelPosition: 'below-icon',
        tabBarActiveTintColor: colors.black,
        tabBarInactiveTintColor: colors.black,
        tabBarStyle: {
          paddingTop: 4,
        },
      })}>
      <Tab.Screen
        name={Routes.HomeTab}
        component={HomeStack}
        options={{title: 'Home'}}
      />
    </Tab.Navigator>
  );
}

export function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={Routes.HomeTab}>
        <Stack.Group screenOptions={getOptions}>
          <Stack.Screen name={Routes.HomeTab} component={TabStack} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabLabel: {
    ...fonts.mediumBodySmall,
    fontSize: 12,
  },
  focusedTabLabel: {fontWeight: '600'},
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    marginTop: -4,
    marginRight: -16,
    backgroundColor: theme.primaryColor,
    width: 16,
    height: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeContainer: {position: 'relative'},
  badgeLabel: {
    color: colors.white,
    fontSize: 10,
    maxWidth: 12,
  },
});
