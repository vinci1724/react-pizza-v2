import type { PayloadAction } from '@reduxjs/toolkit';
import type { Pizza } from '../../types';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export type Status = 'idle' | 'loading' | 'success' | 'error';

export interface PizzaState {
  items: Pizza[];
  status: Status;
}

export interface FetchPizzasParams {
  currentPage: number;
  category: string;
  sortBy: string;
  order: string;
  search: string;
}

// Это асинхронный action
export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (params: FetchPizzasParams) => {
  const { currentPage, category, sortBy, order, search } = params;
  const response = await axios.get(`https://6ab5177f24ee9d3caa1c2b61.mockapi.io/items?page=${currentPage}&limit=4&${category}sortBy=${sortBy}&order=${order}${search}`);
  return response.data;
});

const initialState: PizzaState = {
  items: [],
  status: 'idle',
};

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<Pizza[]>) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = 'loading';
        state.items = [];
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = 'success';
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = 'error';
        state.items = [];
      });
  },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
