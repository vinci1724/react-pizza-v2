import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

// Тип состояния этого среза, попадает в стор как state.filter
export interface FilterState {
  category: number;
}

// Начальное состояние: активная категория — 0 («Все»)
const initialState: FilterState = {
  category: 0,
};

export const filterSlice = createSlice({
  name: 'filter', // префикс для типов действий: 'filter/changeCategory'
  initialState,
  // reducers — логика изменения state. RTK по каждому ключу сам создаёт action creator
  reducers: {
    // Immer позволяет мутировать state напрямую — вернётся новый неизменяемый объект
    changeCategory: (state, action: PayloadAction<number>) => {
      state.category = action.payload;
    },
  },
});

// Автосгенерированные action creators для dispatch из компонентов
export const { changeCategory } = filterSlice.actions;

// Редьюсер среза — подключается в configureStore
export default filterSlice.reducer;
