import React from 'react';
import './SearchResults.css';
import NewsCardList from '../NewsCardList/NewsCardList';

import data from '../../data';

const SearchResults = () => {
  return (
    <section className="search-results">
      <div className="section search-results__container">
        <h2 className="search-results__title">Search results</h2>
        <NewsCardList cards={data} />
        <button className="search-results__button">Show more</button>
      </div>
    </section>
  );
};

export default SearchResults;
