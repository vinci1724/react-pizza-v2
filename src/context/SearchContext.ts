import type { Dispatch, SetStateAction } from 'react';

import { createContext } from 'react';

// Контракт контекста: какие данные и функции получат потребители
export interface SearchContextValue {
  searchValue: string;
  // Сеттер из useState: принимает значение или функцию (prev) => next
  setSearchValue: Dispatch<SetStateAction<string>>;
}

// createContext<тип> даёт типизированное значение в useContext
// объект внутри — дефолт на случай вызова useContext вне провайдера
export const SearchContext = createContext<SearchContextValue>({
  searchValue: '',
  setSearchValue: () => {},
});
