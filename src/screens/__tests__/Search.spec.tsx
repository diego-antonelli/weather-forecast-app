import React from 'react';
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react-native';
import SearchScreen from '../Search';
import {mockUseDispatch, mockUseSelector} from '../../../jest.setup.ts';
import {Routes} from '../../utils/constants';
import {useAppSelector} from '../../utils/redux.ts';

jest.mock('lodash.debounce', () => jest.fn(fn => fn));

jest.mock('../../stores/slices/citySlice', () => ({
  getCitySuggestions: jest.fn(),
  clearSuggestions: jest.fn(),
}));

jest.mock('../../stores/slices/searchSlice', () => ({
  addSearch: jest.fn(),
  selectCity: jest.fn(),
  setCurrentLocation: jest.fn(),
}));

describe('SearchScreen Component', () => {
  const mockNavigation = require('@react-navigation/native').useNavigation();
  const {
    getCitySuggestions,
    clearSuggestions,
  } = require('../../stores/slices/citySlice');
  const {
    addSearch,
    selectCity,
    setCurrentLocation,
  } = require('../../stores/slices/searchSlice');

  beforeEach(() => {
    mockUseSelector.mockClear();
    mockUseDispatch.mockClear();
    mockUseDispatch.mockReturnValue(jest.fn());
    mockNavigation.navigate.mockClear();
    getCitySuggestions.mockClear();
    clearSuggestions.mockClear();
    addSearch.mockClear();
    selectCity.mockClear();
    setCurrentLocation.mockClear();
  });

  it('renders the search input and suggestions', () => {
    (useAppSelector as jest.Mock).mockImplementation(selector =>
      selector({
        search: {
          searches: [],
        },
        city: {
          suggestions: [],
          loading: false,
          error: undefined,
        },
      }),
    );

    render(<SearchScreen />);

    expect(screen.getByRole('searchbox')).toBeTruthy();
  });

  it('dispatches getCitySuggestions when typing in the search box', async () => {
    (useAppSelector as jest.Mock).mockImplementation(selector =>
      selector({
        search: {
          searches: [],
        },
        city: {
          suggestions: [],
          loading: false,
          error: undefined,
        },
      }),
    );

    const mockDispatch = jest.fn();
    mockUseDispatch.mockReturnValue(mockDispatch);

    render(<SearchScreen />);

    const input = screen.getByRole('searchbox');
    fireEvent.changeText(input, 'Lon');

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(getCitySuggestions('Lon'));
    });
  });

  it('clears suggestions when the input is cleared', () => {
    (useAppSelector as jest.Mock).mockImplementation(selector =>
      selector({
        search: {
          searches: [],
        },
        city: {
          suggestions: [],
          loading: false,
          error: undefined,
        },
      }),
    );

    const mockDispatch = jest.fn();
    mockUseDispatch.mockReturnValue(mockDispatch);

    render(<SearchScreen />);

    const input = screen.getByRole('searchbox');
    fireEvent.changeText(input, 'Lon');
    fireEvent.changeText(input, '');

    expect(mockDispatch).toHaveBeenCalledWith(clearSuggestions());
  });

  it('renders a list of cities and handles city selection', () => {
    const mockedCity = {
      name: 'London',
      latitude: 51.5072,
      longitude: -0.1275,
      country: 'GB',
    };
    (useAppSelector as jest.Mock).mockImplementation(selector =>
      selector({
        search: {
          searches: [],
        },
        city: {
          suggestions: [mockedCity],
          loading: false,
          error: undefined,
        },
      }),
    );
    const mockDispatch = jest.fn();
    mockUseDispatch.mockReturnValue(mockDispatch);

    render(<SearchScreen />);

    const cityItem = screen.getByTestId('search-city-0');
    expect(cityItem.children[0]).toBe('London');
    fireEvent.press(cityItem);

    expect(mockDispatch).toHaveBeenCalledWith(selectCity(mockedCity));
    expect(mockDispatch).toHaveBeenCalledWith(addSearch(mockedCity));
    expect(mockDispatch).toHaveBeenCalledWith(setCurrentLocation(false));
    expect(mockNavigation.navigate).toHaveBeenCalledWith(Routes.Home);
  });

  it('renders an error message when there is an error', () => {
    (useAppSelector as jest.Mock).mockImplementation(selector =>
      selector({
        search: {
          searches: [],
        },
        city: {
          suggestions: [],
          loading: false,
          error: 'Failed to fetch cities',
        },
      }),
    );

    render(<SearchScreen />);

    expect(screen.getByTestId('error-message')).toBeTruthy();
    //@ts-expect-error mocked AnimatedText causes the element to contain a text outside a Text component
    expect(screen.getByTestId('error-message').children[1].children[1]).toBe(
      'Failed to fetch cities',
    );
  });

  it('renders a spinner when loading', () => {
    (useAppSelector as jest.Mock).mockImplementation(selector =>
      selector({
        search: {
          searches: [],
        },
        city: {
          suggestions: [],
          loading: true,
          error: undefined,
        },
      }),
    );

    render(<SearchScreen />);

    expect(screen.getByTestId('loading-spinner')).toBeTruthy();
  });
});
