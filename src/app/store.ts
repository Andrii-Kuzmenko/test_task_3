import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import productsReduser from '../features/products/productsSlice';
import pinnedProductReduser from '../features/pinnedProduct/pinnedProductSlice';
import searchQueryReduser from '../features/searchQuery/searchQuerySlice';

export const store = configureStore({
  reducer: {
    products: productsReduser,
    pinnedProduct: pinnedProductReduser,
    searchQuery: searchQueryReduser,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
