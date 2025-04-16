import {createSlice} from '@reduxjs/toolkit';

interface State {
}

const initialState: State = {
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
  },
});

export const {
} = searchSlice.actions;
export default searchSlice.reducer;
