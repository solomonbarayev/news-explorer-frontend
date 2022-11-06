import React from 'react';
import './NewsCardList.css';
import NewsCard from '../NewsCard/NewsCard';
import { useArticles } from '../../contexts/ArticlesContext';

const NewsCardList = () => {
  const { data } = useArticles();

  return (
    <ul className="news-card-list">
      {data.map((card) => (
        <li key={card._id} className="news-card-list__list-item">
          <NewsCard card={card} />
        </li>
      ))}
    </ul>
  );
};

export default NewsCardList;
