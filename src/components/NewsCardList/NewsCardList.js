import React from 'react';
import './NewsCardList.css';
import NewsCard from '../NewsCard/NewsCard';
import { useArticles } from '../../contexts/ArticlesContext';

const NewsCardList = () => {
  const { data } = useArticles();

  return (
    <ul className="newsCardList">
      {data.map((card) => (
        <li key={card._id}>
          <NewsCard card={card} />
        </li>
      ))}
    </ul>
  );
};

export default NewsCardList;
