import {createSlice} from '@reduxjs/toolkit';

interface State {
  searches: string[];
}

const initialState: State = {
  searches: [],
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    addSearch: (state, action) => {
      state.searches.push(action.payload);
    },
  },
});

export const {addSearch} = searchSlice.actions;
export default searchSlice.reducer;
