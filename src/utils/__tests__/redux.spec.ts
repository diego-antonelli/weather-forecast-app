import {useAppDispatch, useAppSelector} from '../redux';
import {useDispatch, useSelector} from 'react-redux';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('@reduxjs/toolkit', () => ({
  createSelector: {
    withTypes: jest.fn(() => jest.fn()),
  },
}));

describe('redux hooks and utilities', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('useAppDispatch should return the typed dispatch function', () => {
    const mockDispatch = jest.fn();
    (useDispatch as any).mockReturnValue(mockDispatch);

    const dispatch = useAppDispatch();
    expect(dispatch).toBe(mockDispatch);
    expect(useDispatch).toHaveBeenCalledTimes(1);
  });

  it('useAppSelector should return the typed selector function', () => {
    const mockSelector = jest.fn();
    (useSelector as any).mockReturnValue(mockSelector);

    const selector = useAppSelector((state: any) => state.someValue);
    expect(selector).toBe(mockSelector);
    expect(useSelector).toHaveBeenCalledWith(expect.any(Function));
  });
});
