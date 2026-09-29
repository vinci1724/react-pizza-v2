interface CategoriesProps {
  value: number;
  onChangeCategory: (id: number) => void;
}

const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

const Categories = ({ value, onChangeCategory }: CategoriesProps) => {
  return (
    <div className="categories">
      <ul>
        {
          categories.map((categoryName, i) => (
            <li
              key={categoryName}
              onClick={() => onChangeCategory(i)}
              className={value === i ? 'active' : ''}
            >
              {categoryName}
            </li>
          ))
        }
      </ul>
    </div>
  );
};

export default Categories;
