import React from 'react';
import './NewsCardList.css';
import NewsCard from '../NewsCard/NewsCard';
import { useArticles } from '../../contexts/ArticlesContext';
import { useIsHome } from '../../contexts/IsHomeContext';

const NewsCardList = () => {
  const { savedArticles } = useArticles();
  const { isHome } = useIsHome();

  const { articlesToShow } = useArticles();

  return (
    <ul className="news-card-list">
      {isHome
        ? articlesToShow.map((card, i) => (
            <li key={i} className="news-card-list__list-item">
              <NewsCard card={card} />
            </li>
          ))
        : savedArticles.map((card, i) => (
            <li key={i} className="news-card-list__list-item">
              <NewsCard card={card} />
            </li>
          ))}
    </ul>
  );
};

export default NewsCardList;
