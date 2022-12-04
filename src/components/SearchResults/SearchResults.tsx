import React from 'react';
import './SearchResults.css';
import NewsCardList from '../NewsCardList/NewsCardList';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { showMoreArticles } from '../../features/articles/articlesSlice';

const SearchResults = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { articlesToShow, articles } = useSelector(
    (state: RootState) => state.articles
  );

  return (
    <section className="search-results">
      <div className="section search-results__container">
        <h2 className="search-results__title">Search results</h2>
        <NewsCardList />

        {!(articlesToShow.length === articles.length) && (
          <button
            className="search-results__button"
            onClick={() => dispatch(showMoreArticles())}>
            Show more
          </button>
        )}
      </div>
    </section>
  );
};

export default SearchResults;
