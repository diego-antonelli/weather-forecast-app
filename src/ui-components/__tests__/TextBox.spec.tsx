import {fireEvent, render} from '@testing-library/react-native';
import {TextBox} from '../TextBox.tsx';
import React from 'react';

jest.mock('@react-native-vector-icons/feather', () => {
  return {
    __esModule: true,
    default: () => 'MockedFeatherIcon',
  };
});

describe('TextBox Component', () => {
  it('renders with the correct placeholder and value', () => {
    const {getByPlaceholderText} = render(
      <TextBox label="Enter text" value="Test Value" onChange={() => {}} />,
    );
    const input = getByPlaceholderText('Enter text');
    expect(input.props.value).toBe('Test Value');
  });

  it('calls onChange when text is changed', () => {
    const mockOnChange = jest.fn();
    const {getByPlaceholderText} = render(
      <TextBox label="Enter text" value="" onChange={mockOnChange} />,
    );
    const input = getByPlaceholderText('Enter text');
    fireEvent.changeText(input, 'New Value');
    expect(mockOnChange).toHaveBeenCalledWith('New Value');
  });

  it('calls onClean when clean button is pressed', () => {
    const mockOnClean = jest.fn();
    const {getByRole} = render(
      <TextBox
        label="Enter text"
        value="Test Value"
        onChange={() => {}}
        onClean={mockOnClean}
      />,
    );
    const cleanButton = getByRole('button');
    fireEvent.press(cleanButton);
    expect(mockOnClean).toHaveBeenCalled();
  });
});
