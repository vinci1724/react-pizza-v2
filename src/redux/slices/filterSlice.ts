import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export type SortProperty
  = | 'rating'
    | '-rating'
    | 'price'
    | '-price'
    | 'title'
    | '-title';

export interface SortItem {
  name: string;
  sortProperty: SortProperty;
}

// Тип состояния этого среза, попадает в стор как state.filter
export interface FilterState {
  searchValue: string;
  categoryId: number;
  currentPage: number;
  sort: SortItem;
}

// Начальное состояние: активная категория — 0 («Все»)
const initialState: FilterState = {
  searchValue: '',
  categoryId: 0,
  currentPage: 1,
  sort: {
    name: 'популярности (DESC)',
    sortProperty: 'rating',
  },
};

export const filterSlice = createSlice({
  name: 'filter', // префикс для типов действий: 'filter/changeCategory'
  initialState,
  // reducers — логика изменения state. RTK по каждому ключу сам создаёт action creator
  reducers: {
    // Immer позволяет мутировать state напрямую — вернётся новый неизменяемый объект
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    setCategoryId: (state, action: PayloadAction<number>) => {
      state.categoryId = action.payload;
    },
    setSort: (state, action: PayloadAction<SortItem>) => {
      state.sort = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setFilters: (state, action: PayloadAction<FilterState>) => {
      state.categoryId = Number(action.payload.categoryId);
      state.currentPage = Number(action.payload.currentPage);
      state.sort = action.payload.sort;
    },
  },
});

// Автосгенерированные action creators для dispatch из компонентов
export const { setSearchValue, setCategoryId, setSort, setCurrentPage, setFilters } = filterSlice.actions;

// Редьюсер среза — подключается в configureStore
export default filterSlice.reducer;
