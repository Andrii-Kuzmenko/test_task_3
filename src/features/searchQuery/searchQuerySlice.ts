import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: string = '';

const searchQuerySlice = createSlice({
  name: 'searchQuery',
  initialState,
  reducers: {
    searchQuery: (state, action: PayloadAction<string>) => {
      return action.payload
    },
  }
})

export default searchQuerySlice.reducer;
export const { searchQuery } = searchQuerySlice.actions;