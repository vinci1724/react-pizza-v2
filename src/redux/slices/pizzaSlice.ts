import type { PayloadAction } from '@reduxjs/toolkit';
import type { Pizza } from '../../types';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// type Status = 'idle' | 'loading' | 'success' | 'error';

// не работает из-за erasableSyntaxOnly: true
// enum Status {
//   IDLE = 'idle',
//   LOADING = 'loading',
//   SUCCESS = 'success',
//   ERROR = 'error',
// }

const Status = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
} as const;
type RequestStatus = (typeof Status)[keyof typeof Status];

interface PizzaSliceState {
  items: Pizza[];
  status: RequestStatus;
}

// или type FetchPizzasParams = Record<string, string>;
interface FetchPizzasParams {
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

const initialState: PizzaSliceState = {
  items: [],
  status: Status.IDLE,
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
        state.status = Status.LOADING;
        state.items = [];
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = Status.SUCCESS;
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = Status.ERROR;
        state.items = [];
      });
  },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
