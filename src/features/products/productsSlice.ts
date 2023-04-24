import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types/Product';

const initialState: Product[] = [];
const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    add: (products, action: PayloadAction<Product>) => { // object type product
      products.push(action.payload);
    },
    remove: (products, action: PayloadAction<number>) => { // id producta to delete
      return products.filter(product => product.id !== action.payload);
    },
    // search: (query, action: PayloadAction<string>) => {
      
    // },
  }
})

export default productsSlice.reducer;
export const { add, remove } = productsSlice.actions;