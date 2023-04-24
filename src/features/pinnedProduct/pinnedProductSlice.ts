import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: number = 0;

const pinnedProductSlice = createSlice({
  name: 'pinnedProduct',
  initialState,
  reducers: {
    pinned: (state, action: PayloadAction<number>) => {
      if (action.payload === state) {
        return initialState;
      }
      return action.payload
    },
  }
})

export default pinnedProductSlice.reducer;
export const { pinned } = pinnedProductSlice.actions;