import { useEffect, useState } from 'react';

import Categories from '../components/Categories';
import Pagination from '../components/Pagination';
import PizzaBlock from '../components/PizzaBlock';
import { Skeleton } from '../components/PizzaBlock/Skeleton';
import Sort from '../components/Sort';

const Home = ({ searchValue }) => {
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [sortType, setSortType] = useState({
    name: 'популярности (DESC)',
    sortProperty: 'rating',
  });
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const category = categoryId > 0 ? `category=${categoryId}&` : '';
      const sortBy = sortType.sortProperty.replace('-', '');
      const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
      const search = searchValue ? `&search=${searchValue}` : '';
      const response = await fetch(`https://6ab5177f24ee9d3caa1c2b61.mockapi.io/items?page=${currentPage}&limit=4&${category}sortBy=${sortBy}&order=${order}${search}`);
      const data = await response.json();
      setPizzas(data);
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
        <Categories value={categoryId} onChangeCategory={i => setCategoryId(i)} />
        <Sort value={sortType} onChangeSort={i => setSortType(i)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading ? skeletons : items}
      </div>
      <Pagination onChangePage={pageNumber => setCurrentPage(pageNumber)} />
    </div>
  );
};

export default Home;
