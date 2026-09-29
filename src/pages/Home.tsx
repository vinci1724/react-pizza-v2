import axios from 'axios';
import { use, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Categories from '../components/Categories';
import Pagination from '../components/Pagination';
import PizzaBlock from '../components/PizzaBlock';
import { Skeleton } from '../components/PizzaBlock/Skeleton';
import Sort from '../components/Sort';
import { SearchContext } from '../context/SearchContext';
import { setCategoryId, setCurrentPage } from '../redux/slices/filterSlice';

const Home = () => {
  const categoryId = useSelector(state => state.filter.categoryId);
  const currentPage = useSelector(state => state.filter.currentPage);
  const sortType = useSelector(state => state.filter.sort.sortProperty);
  const dispatch = useDispatch();

  const onChangeCategory = (id: number) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const { searchValue } = use(SearchContext);

  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // const [categoryId, setCategoryId] = useState(0);
  // const [sortType, setSortType] = useState({
  //   name: 'популярности (DESC)',
  //   sortProperty: 'rating',
  // });
  // const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const category = categoryId > 0 ? `category=${categoryId}&` : '';
      const sortBy = sortType.replace('-', '');
      const order = sortType.includes('-') ? 'asc' : 'desc';
      const search = searchValue ? `&search=${searchValue}` : '';
      // const response = await fetch(`https://6ab5177f24ee9d3caa1c2b61.mockapi.io/items?page=${currentPage}&limit=4&${category}sortBy=${sortBy}&order=${order}${search}`);
      // const data = await response.json();
      const response = await axios.get(`https://6ab5177f24ee9d3caa1c2b61.mockapi.io/items?page=${currentPage}&limit=4&${category}sortBy=${sortBy}&order=${order}${search}`);
      setPizzas(response.data);
      setIsLoading(false);
    };

    getData();
    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);

  const skeletons = [...Array.from({ length: 12 })].map((_, index) => <Skeleton key={index} />);
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
      <div className="content__items">
        {isLoading ? skeletons : items}
      </div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
