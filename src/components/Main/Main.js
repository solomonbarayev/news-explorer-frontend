import React from 'react';
import SearchResults from '../SearchResults/SearchResults';
import AboutAuthor from '../AboutAuthor/AboutAuthor';
import Preloader from '../Preloader/Preloader';

const Main = () => {
  return (
    <>
      <main className="main">
        {/* <Preloader /> */}
        <SearchResults />
        <AboutAuthor />
      </main>
    </>
  );
};

export default Main;
