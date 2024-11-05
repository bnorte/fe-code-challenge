import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface Item {
  id: string;
  price: number;
}

const pricesSlice = createSlice({
  name: 'prices',
  initialState: {} as {
    [key: string]: {
      price: number;
      previousPrice: number;
    };
  },
  reducers: {
    updatePrice: (state, action: PayloadAction<Item>) => {
      state[action.payload.id] = {
        price: action.payload.price,
        previousPrice: state[action.payload.id]?.price
      };
    }
  }
});

export default pricesSlice;
