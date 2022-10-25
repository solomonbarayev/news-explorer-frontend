import React from 'react';
import './NewsCardList.css';
import NewsCard from '../NewsCard/NewsCard';

const NewsCardList = ({ cards }) => {
  return (
    <ul className="newsCardList">
      {cards.map((card) => (
        <li key={card._id}>
          <NewsCard card={card} />
        </li>
      ))}
    </ul>
  );
};

export default NewsCardList;
