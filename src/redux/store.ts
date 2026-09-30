import type { FilterState } from './slices/filterSlice';
import { configureStore } from '@reduxjs/toolkit';
import qs from 'qs';

import { list } from '../constants/sort';
import cartReducer from './slices/cartSlice';
import filterReducer from './slices/filterSlice';

// Читаем фильтры из query-строки синхронно, до первого рендера,
// чтобы состояние стора сразу совпадало с URL и UI не мигал дефолтами.
const getPreloadedState = (): { filter: FilterState } | undefined => {
  if (!window.location.search) {
    return undefined;
  }

  const params = qs.parse(window.location.search.substring(1));

  return {
    filter: {
      categoryId: Number(params.categoryId) || 0,
      currentPage: Number(params.currentPage) || 1,
      sort: list.find(obj => obj.sortProperty === params.sortBy) ?? list[0],
    },
  };
};

// Глобальный Redux-стор. Ключи в reducer — срезы (slice) приложения;
// здесь ключ `filter` кладёт состояние среза в state.filter
export const store = configureStore({
  reducer: {
    filter: filterReducer,
    cart: cartReducer,
  },
  preloadedState: getPreloadedState(),
});

// Тип всего состояния стора, автоматически выведенный из самого стора.
// Нужен для типизации useSelector, чтобы state был типизирован.
export type RootState = ReturnType<typeof store.getState>;

// Тип функции dispatch, выведенный из стора. Нужен для типизации useDispatch,
// чтобы учитывались middleware (например, redux-thunk).
export type AppDispatch = typeof store.dispatch;
