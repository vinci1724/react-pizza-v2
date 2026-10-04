import type { AppDispatch, RootState } from '../redux/store';
// import type { Pizza } from '../types';

// import axios from 'axios';
import qs from 'qs';
import {
  // useState,
  useCallback,
  // use,
  useEffect,
  useRef,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import Categories from '../components/Categories';
import Pagination from '../components/Pagination';
import PizzaBlock from '../components/PizzaBlock';
import { Skeleton } from '../components/PizzaBlock/Skeleton';
import Sort from '../components/Sort';
// import { SearchContext } from '../context/SearchContext';
import { setCategoryId, setCurrentPage } from '../redux/slices/filterSlice';
import {
  fetchPizzas,
  // setItems,
} from '../redux/slices/pizzaSlice';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const pizzas = useSelector((state: RootState) => state.pizza.items);
  const status = useSelector((state: RootState) => state.pizza.status);
  const searchValue = useSelector((state: RootState) => state.filter.searchValue);
  const categoryId = useSelector((state: RootState) => state.filter.categoryId);
  const currentPage = useSelector((state: RootState) => state.filter.currentPage);
  const sortType = useSelector((state: RootState) => state.filter.sort.sortProperty);
  const isMountedRef = useRef(false);

  // const { searchValue } = use(SearchContext);

  // const [pizzas, setPizzas] = useState<Pizza[]>([]);
  // const [isLoading, setIsLoading] = useState(true);
  // const [categoryId, setCategoryId] = useState(0);
  // const [sortType, setSortType] = useState({
  //   name: 'популярности (DESC)',
  //   sortProperty: 'rating',
  // });
  // const [currentPage, setCurrentPage] = useState(1);

  const onChangeCategory = useCallback((id: number) => {
    dispatch(setCategoryId(id));
  }, []);

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const getPizzas = async () => {
    const category = categoryId > 0 ? `category=${categoryId}&` : '';
    const sortBy = sortType.replace('-', '');
    const order = sortType.includes('-') ? 'asc' : 'desc';
    const search = searchValue ? `&search=${searchValue}` : '';

    // const response = await fetch(`https://6ab5177f24ee9d3caa1c2b61.mockapi.io/items?page=${currentPage}&limit=4&${category}sortBy=${sortBy}&order=${order}${search}`);
    // const data = await response.json();

    // const response = await axios.get(`https://6ab5177f24ee9d3caa1c2b61.mockapi.io/items?page=${currentPage}&limit=4&${category}sortBy=${sortBy}&order=${order}${search}`);
    // dispatch(setItems(response.data));

    dispatch(fetchPizzas({
      currentPage,
      category,
      sortBy,
      order,
      search,
    }));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getPizzas();
  }, [categoryId, sortType, searchValue, currentPage]);

  useEffect(() => {
    if (isMountedRef.current) {
      const queryString = qs.stringify({
        sortBy: sortType,
        categoryId,
        currentPage,
      });

      navigate(`?${queryString}`);
    }

    isMountedRef.current = true;
  }, [categoryId, sortType, currentPage, navigate]);

  const skeletons = [...Array.from({ length: 12 })].map((_, index) => (
    // eslint-disable-next-line react/no-array-index-key -- статичные заглушки без идентичности
    <Skeleton key={index} />));
  const items = pizzas
    // .filter((obj) => {
    //   if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
    //     return true;
    //   }
    //   return false;
    // })
    .map(obj => (
      <PizzaBlock
        key={obj.id}
        id={obj.id}
        title={obj.title}
        price={obj.price}
        imageUrl={obj.imageUrl}
        sizes={obj.sizes}
        types={obj.types}
      />
    ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error'
        ? (
            <div>
              <h2>Произошла ошибка (</h2>
              <p>К сожалению, не удалось получить пиццы. Попробуйте повторить попытку позже.</p>
            </div>
          )
        : (
            <div className="content__items">
              {status === 'loading' ? skeletons : items}
            </div>
          )}
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
