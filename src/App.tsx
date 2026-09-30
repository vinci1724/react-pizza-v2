// import { useState } from 'react';
import { Route, Routes } from 'react-router';

import Header from './components/Header';
// import { SearchContext } from './context/SearchContext';
import Cart from './pages/Cart';
import FullPizza from './pages/FullPizza';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import './scss/app.scss';

const App = () => {
  // const [searchValue, setSearchValue] = useState('');

  return (
    <div className="wrapper">
      {/* <SearchContext value={{ searchValue, setSearchValue }}> */}
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/pizza/:id" element={<FullPizza />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      {/* </SearchContext> */}
    </div>
  );
};

export default App;
