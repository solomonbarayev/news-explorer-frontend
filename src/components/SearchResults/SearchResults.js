import React from 'react';
import './SearchResults.css';
import NewsCardList from '../NewsCardList/NewsCardList';
import { useArticles } from '../../contexts/ArticlesContext';

const SearchResults = () => {
  const { articleIndex, setArticleIndex, articlesToShow, articles } =
    useArticles();
  return (
    <section className="search-results">
      <div className="section search-results__container">
        <h2 className="search-results__title">Search results</h2>
        <NewsCardList />

        {!(articlesToShow.length === articles.length) && (
          <button
            className="search-results__button"
            onClick={() => setArticleIndex(articleIndex + 3)}>
            Show more
          </button>
        )}
      </div>
    </section>
  );
};

export default SearchResults;
