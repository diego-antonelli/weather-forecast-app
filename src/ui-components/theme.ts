import {TextStyle} from 'react-native';
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
  backdropColor: hexToRgba(colors.black, '0.4'),
  backgroundColor: '#FFF',
  buttonBackground: colors.black,
  alphaButtonBackground: hexToRgba(colors.black, '0.05'),
  primaryColor: primaryColor,
  alphaPrimaryColor: hexToRgba(primaryColor, '0.1'),
  text: {
    buttonLabel: '#FFFFFF',
    primaryColor: colors.white,
    alphaPrimaryColor: colors.black,
  },
  placeholderColor: 'rgba(0,0,0,0.1)',
};

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
