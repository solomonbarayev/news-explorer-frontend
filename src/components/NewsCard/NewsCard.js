import React from 'react';
import './NewsCard.css';
import saveIcon from '../../images/save_icon.svg';
import trashIcon from '../../images/trash_icon.svg';
import { useIsHome } from '../../contexts/IsHomeContext';

const NewsCard = ({ card }) => {
  const { isHome } = useIsHome();
  return (
    <article className="news-card">
      <div
        className="news-card__image-container"
        style={{
          backgroundImage: `url(${card.image})`,
        }}
      ></div>
      <div className="news-card__text-container">
        <p className="news-card__date">{card.date}</p>
        <h3 className="news-card__title">{card.title}</h3>
        <p className="news-card__text">
          {card.text.length > 150 ? `${card.text.slice(0, 150)}...` : card.text}
        </p>
        <p className="news-card__source">{card.source}</p>
      </div>
      <button
        className="news-card__button"
        aria-label={isHome ? 'save article' : 'delete article'}
        style={{
          backgroundImage: `${
            isHome ? `url(${saveIcon})` : `url(${trashIcon})`
          }`,
        }}
      ></button>
      {!isHome && <p className="news-card__keyword">{card.keyword}</p>}
    </article>
  );
};

export default NewsCard;
