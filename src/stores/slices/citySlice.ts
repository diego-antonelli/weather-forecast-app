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
  reducers: {
    clearSuggestions(state) {
      state.suggestions = [];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getCitySuggestions.pending, state => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(getCitySuggestions.fulfilled, (state, action) => {
        state.suggestions = action.payload;
        state.loading = false;
        state.error = undefined;
      })
      .addCase(getCitySuggestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Unknown error';
      });
  },
});

export const {clearSuggestions} = citySlice.actions;

export default citySlice.reducer;
