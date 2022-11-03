import React from 'react';
import SearchForm from '../SearchForm/SearchForm';

function HomeHeader() {
  return (
    <div className="header__content">
      <h1 className="header__title">What's going on in the world?</h1>
      <p className="header__subtitle">
        Find the latest news on any topic and save them in your personal
        account.
      </p>

      <SearchForm />
    </div>
  );
}

export default HomeHeader;
