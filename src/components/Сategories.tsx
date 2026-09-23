import { useState } from 'react';

const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

const Сategories = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const onClickCategory = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="categories">
      <ul>
        {
          categories.map((value, i) => (
            <li
              key={i}
              onClick={() => onClickCategory(i)}
              className={activeIndex === i ? 'active' : ''}
            >
              {value}
            </li>
          ))
        }
      </ul>
    </div>
  );
};

export default Сategories;
