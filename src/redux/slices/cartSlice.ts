import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { calcTotalPrice } from '../../utils/calcTotalPrice';
import { getCartFromLS } from '../../utils/getCartFromLS';

export interface CartItem {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  type: string;
  size: number;
  count: number;
}

export type CartItemWithoutCount = Omit<CartItem, 'count'>;

interface CartSliceState {
  totalPrice: number;
  items: CartItem[];
}

const { totalPrice, items } = getCartFromLS();

const initialState: CartSliceState = {
  totalPrice,
  items,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItemWithoutCount>) => {
      const findItem = state.items.find(obj => obj.id === action.payload.id);

      if (findItem) {
        ++findItem.count;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }

      calcTotalPrice(state.items);
    },
    plusItem: (state, action: PayloadAction<number>) => {
      const findItem = state.items.find(obj => obj.id === action.payload);

      if (findItem) {
        ++findItem.count;
      }

      calcTotalPrice(state.items);
    },
    minusItem: (state, action: PayloadAction<number>) => {
      const findItem = state.items.find(obj => obj.id === action.payload);

      if (findItem) {
        --findItem.count;
      }

      calcTotalPrice(state.items);
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(obj => obj.id !== action.payload);

      calcTotalPrice(state.items);
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addItem, plusItem, minusItem, removeItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
