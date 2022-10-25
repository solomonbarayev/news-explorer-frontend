import React from 'react';
import Header from '../Header/Header';
import SearchResults from '../SearchResults/SearchResults';
import AboutAuthor from '../AboutAuthor/AboutAuthor';

const Main = () => {
  return (
    <>
      <main className="main">
        <SearchResults />
        <AboutAuthor />
      </main>
    </>
  );
};

export default Main;
