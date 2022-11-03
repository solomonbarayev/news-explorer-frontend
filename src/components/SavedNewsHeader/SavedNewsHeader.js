import React from 'react';
import './SavedNewsHeader.css';
import { useArticles } from '../../contexts/ArticlesContext';

const SavedNewsHeader = () => {
  const { data } = useArticles();

  //find unique keywords
  const keywords = data.map((card) => card.keyword);
  const uniqueKeywords = [...new Set(keywords)];

  return (
    <div className="news-header">
      <h1 className="news-header__title">Saved articles</h1>
      <p className="news-header__subtitle">
        You have {data.length} saved articles
      </p>
      <p className="news-header__keywords">
        By keywords:{' '}
        <span className="news-header__keywords_bold">
          {uniqueKeywords.length <= 2
            ? uniqueKeywords.join(', ')
            : uniqueKeywords.slice(0, 2).join(', ') +
              ' and ' +
              (uniqueKeywords.length - 2) +
              ' more'}
        </span>
      </p>
    </div>
  );
};

export default SavedNewsHeader;
