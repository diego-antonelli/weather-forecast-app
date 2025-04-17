import {TextStyle, useColorScheme} from 'react-native';
import hexToRgba from 'hex-to-rgba';

export const colors = {
  white: '#FFF',
  grey: '#7F7F7F',
  blue: '#1771F0',
  darkBlue: '#130A82',
  black: '#191D21',
  orange: '#F5950C',
  cyan: '#0DE0F3',
  red: '#FF1F46',
};

const primaryColor = colors.blue;

export const theme = {
  gradient: ['#D6EAF8', '#AED6F1', '#85C1E9'],
  backgroundColor: '#D6EAF8',
  secondaryBackgroundColor: '#85C1E9',
  borderColor: '#85C1E9',
  buttonBackground: colors.black,
  alphaButtonBackground: hexToRgba(colors.black, '0.05'),
  primaryColor: primaryColor,
  alphaPrimaryColor: hexToRgba(primaryColor, '0.1'),
  text: {
    error: '#AE0001',
    buttonLabel: '#FFFFFF',
    primaryColor: colors.black,
    disabledColor: colors.grey,
  },
  placeholderColor: 'rgba(0,0,0,0.1)',
};

export const themeDark = {
  gradient: ['#001F3F', '#0059b3'],
  backgroundColor: '#001F3F',
  secondaryBackgroundColor: '#003366',
  borderColor: '#003366',
  buttonBackground: colors.black,
  alphaButtonBackground: hexToRgba(colors.black, '0.05'),
  primaryColor: primaryColor,
  alphaPrimaryColor: hexToRgba(primaryColor, '0.1'),
  text: {
    error: '#ff6f69',
    buttonLabel: '#FFFFFF',
    primaryColor: colors.white,
    disabledColor: colors.grey,
  },
  placeholderColor: 'rgba(0,0,0,0.1)',
};

export function useTheme() {
  const isDarkMode = useColorScheme() === 'dark';
  return isDarkMode ? themeDark : theme;
}

export const fonts = {
  //styleName: Medium/Body regular;
  mediumBodyRegular: {
    fontFamily: 'EuclidCircularA-Medium',
    fontSize: 15.5,
    fontWeight: '400',
  } as TextStyle,
  //styleName: Regular/Body regular;
  regularBodyRegular: {
    fontFamily: 'EuclidCircularA-Regular',
    fontSize: 15.5,
    fontWeight: '400',
  } as TextStyle,
  //styleName: Medium/Body Small;
  mediumBodySmall: {
    fontFamily: 'EuclidCircularA-Regular',
    fontSize: 13.5,
    fontWeight: '400',
  } as TextStyle,
  //styleName: Regular/Body Small;
  regularBodySmall: {
    fontFamily: 'EuclidCircularA-Regular',
    fontSize: 13.5,
    fontWeight: '400',
  } as TextStyle,
  mediumTitle: {
    fontFamily: 'EuclidCircularA-Medium',
    fontSize: 20,
    fontWeight: '500',
  } as TextStyle,
  mediumBodyBig: {
    fontFamily: 'EuclidCircularA-Medium',
    fontSize: 17,
    fontWeight: '500',
  } as TextStyle,
  links: {
    fontFamily: 'EuclidCircularA-Regular',
    fontSize: 14,
    fontWeight: '400',
    textDecorationLine: 'underline',
  } as TextStyle,
};
