import React from 'react';
import {render} from '@testing-library/react-native';
import {Error} from '../Error';
import {useTheme} from '../theme';

jest.mock('../theme', () => ({
  useTheme: jest.fn(),
}));

jest.mock('react-native-animatable', () => {
  return {
    __esModule: true,
    Text: jest.requireActual('react-native').Text,
    View: jest.requireActual('react-native').View,
  };
});

describe('Error Component', () => {
  it('renders the error message', () => {
    (useTheme as jest.Mock).mockReturnValue({
      text: {error: 'red'},
    });

    const {getByText} = render(<Error error="Test error message" />);
    const errorMessage = getByText('An error occurred: Test error message');
    expect(errorMessage).toBeTruthy();
  });

  it('applies the correct error text color from the theme', () => {
    (useTheme as jest.Mock).mockReturnValue({
      text: {error: 'red'},
    });

    const {getByText} = render(<Error error="Test error message" />);
    const errorMessage = getByText('An error occurred: Test error message');
    expect(errorMessage.props.style).toEqual(
      expect.objectContaining({color: 'red'}),
    );
  });
});
