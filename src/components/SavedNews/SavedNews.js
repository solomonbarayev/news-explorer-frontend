import React from 'react';
import './SavedNews.css';
import Header from '../Header/Header';
import NewsCardList from '../NewsCardList/NewsCardList';

const SavedNews = () => {
  return (
    <section className="saved-news">
      <div className="section saved-news__container">
        <NewsCardList />
      </div>
    </section>
  );
};

export default SavedNews;
