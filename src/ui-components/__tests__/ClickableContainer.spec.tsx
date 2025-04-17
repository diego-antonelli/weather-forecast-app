import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import {ClickableContainer} from '../ClickableContainer';

describe('ClickableContainer Component', () => {
  it('calls onPress when pressed', () => {
    const mockOnPress = jest.fn();
    const {getByRole} = render(<ClickableContainer onPress={mockOnPress} />);
    const container = getByRole('button');
    fireEvent.press(container);
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('does not call onPress when disabled', () => {
    const mockOnPress = jest.fn();
    const {getByRole} = render(
      <ClickableContainer onPress={mockOnPress} disabled />,
    );
    const container = getByRole('button');
    fireEvent.press(container);
    expect(mockOnPress).not.toHaveBeenCalled();
  });
});
