import React from 'react';
import './NewsCardList.css';
import NewsCard from '../NewsCard/NewsCard';
import { useIsHome } from '../../contexts/IsHomeContext';
import { UnformattedArticle, Article } from '../../models/Article';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const NewsCardList = () => {
  const { articlesToShow, savedArticles } = useSelector(
    (state: RootState) => state.articles
  );

  const { isHome } = useIsHome();

  return (
    <ul className="news-card-list">
      {isHome
        ? articlesToShow.map((card: UnformattedArticle, i: number) => (
            <li key={i} className="news-card-list__list-item">
              <NewsCard card={card} />
            </li>
          ))
        : savedArticles.map((card: Article, i: number) => (
            <li key={i} className="news-card-list__list-item">
              <NewsCard card={card} />
            </li>
          ))}
    </ul>
  );
};

export default NewsCardList;
