import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

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

export interface CartState {
  totalPrice: number;
  items: CartItem[];
}

const initialState: CartState = {
  totalPrice: 0,
  items: [],
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

      state.totalPrice = state.items.reduce((sum, obj) => sum + obj.price * obj.count, 0);
    },
    plusItem: (state, action: PayloadAction<number>) => {
      const findItem = state.items.find(obj => obj.id === action.payload);

      if (findItem) {
        ++findItem.count;
      }

      state.totalPrice = state.items.reduce((sum, obj) => sum + obj.price * obj.count, 0);
    },
    minusItem: (state, action: PayloadAction<number>) => {
      const findItem = state.items.find(obj => obj.id === action.payload);

      if (findItem) {
        --findItem.count;
      }

      state.totalPrice = state.items.reduce((sum, obj) => sum + obj.price * obj.count, 0);
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(obj => obj.id !== action.payload);

      state.totalPrice = state.items.reduce((sum, obj) => sum + obj.price * obj.count, 0);
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addItem, plusItem, minusItem, removeItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
