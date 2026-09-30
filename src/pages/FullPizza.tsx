import type { Pizza } from '../types';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const FullPizza = () => {
  const [pizza, setPizza] = useState<Pizza | null>(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchPizza = async () => {
      try {
        const { data } = await axios.get(`https://6ab5177f24ee9d3caa1c2b61.mockapi.io/items/${id}`);
        setPizza(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPizza();
  }, []);

  if (!pizza) {
    return <div className="container">Загрузка...</div>;
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl} />
      <h2>{pizza.title}</h2>
      <h4>
        {pizza.price}
        {' '}
        р
      </h4>
    </div>
  );
};

export default FullPizza;
