import {
  lazy,
  // useState,
  Suspense,
} from 'react';
import { Route, Routes } from 'react-router';

import MainLayout from './layouts/MainLayout';
// import Header from './components/Header';
// import { SearchContext } from './context/SearchContext';
// import Cart from './pages/Cart';
import FullPizza from './pages/FullPizza';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import './scss/app.scss';

const Cart = lazy(() => import('./pages/Cart'));

const App = () => {
  // const [searchValue, setSearchValue] = useState('');

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route
          path="cart"
          element={(
            <Suspense fallback={<div>Загрузка...</div>}>
              <Cart />
            </Suspense>
          )}
        />
        <Route path="pizza/:id" element={<FullPizza />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
