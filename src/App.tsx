import pizzas from './assets/pizzas.json';
import Header from './components/Header';
import PizzaBlock from './components/PizzaBlock';
import Sort from './components/Sort';
import Сategories from './components/Сategories';
import './scss/app.scss';

const App = () => {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Сategories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {
              pizzas.map(obj => (
                <PizzaBlock
                  key={obj.id}
                  title={obj.title}
                  price={obj.price}
                  imageUrl={obj.imageUrl}
                  sizes={obj.sizes}
                  types={obj.types}
                />
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
