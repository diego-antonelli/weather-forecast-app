import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {City, fetchCitySuggestions} from '../../services/city';

export const getCitySuggestions = createAsyncThunk(
  'city/getSuggestions',
  async (query: string) => {
    return await fetchCitySuggestions(query);
  },
);

interface State {
  suggestions: City[];
  loading: boolean;
  error?: string;
}

const initialState: State = {
  suggestions: [],
  loading: false,
};

const citySlice = createSlice({
  name: 'city',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getCitySuggestions.pending, state => {
        state.loading = true;
      })
      .addCase(getCitySuggestions.fulfilled, (state, action) => {
        state.suggestions = action.payload;
        state.loading = false;
      })
      .addCase(getCitySuggestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Unknown error';
      });
  },
});

export default citySlice.reducer;
