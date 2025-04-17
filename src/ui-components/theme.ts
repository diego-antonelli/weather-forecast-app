import {useColorScheme} from 'react-native';

export const theme = {
  gradient: ['#D6EAF8', '#AED6F1', '#85C1E9'],
  backgroundColor: '#D6EAF8',
  textBoxBackground: '#D6EAF8',
  secondaryBackgroundColor: '#85C1E9',
  borderColor: '#85C1E9',
  buttonBackground: '#003366',
  text: {
    error: '#AE0001',
    buttonLabel: '#FFFFFF',
    primaryColor: '#001F3F',
    disabledColor: '#7F7F7F',
    placeholderColor: 'rgba(0,0,0,0.1)',
  },
};

export const themeDark = {
  gradient: ['#001F3F', '#0059b3'],
  backgroundColor: '#001F3F',
  textBoxBackground: '#4c7093',
  secondaryBackgroundColor: '#003366',
  borderColor: '#003366',
  buttonBackground: '#AED6F1',
  text: {
    error: '#ff6f69',
    buttonLabel: '#001F3F',
    primaryColor: '#D6EAF8',
    disabledColor: '#7F7F7F',
    placeholderColor: 'rgba(0,0,0,0.1)',
  },
};

export function useTheme() {
  const isDarkMode = useColorScheme() === 'dark';
  return isDarkMode ? themeDark : theme;
}
