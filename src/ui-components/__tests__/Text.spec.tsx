import {render} from '@testing-library/react-native';
import {Text} from '../Text.tsx';
import React from 'react';

describe('Text Component', () => {
  it('renders with normal variant styles by default', () => {
    const {getByText} = render(<Text>Test Text</Text>);
    const text = getByText('Test Text');
    expect(text.props.style).toEqual(
      expect.arrayContaining([{fontSize: 15.5, fontWeight: '400'}]),
    );
  });

  it('renders with small variant styles when variant is small', () => {
    const {getByText} = render(<Text variant="small">Test Text</Text>);
    const text = getByText('Test Text');
    expect(text.props.style).toEqual(
      expect.arrayContaining([{fontSize: 13.5, fontWeight: '400'}]),
    );
  });

  it('applies ellipsis when ellipsis prop is true', () => {
    const {getByText} = render(<Text ellipsis>Test Text</Text>);
    const text = getByText('Test Text');
    expect(text.props.numberOfLines).toBe(1);
  });

  it('respects allowFontScaling prop', () => {
    const {getByText} = render(<Text allowFontScaling={false}>Test Text</Text>);
    const text = getByText('Test Text');
    expect(text.props.allowFontScaling).toBe(false);
  });
});
