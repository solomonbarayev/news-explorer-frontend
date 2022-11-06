import React from 'react';
import SearchResults from '../SearchResults/SearchResults';
import AboutAuthor from '../AboutAuthor/AboutAuthor';
// import Preloader from '../Preloader/Preloader';
// import NotFound from '../NotFound/NotFound';

const Main = () => {
  return (
    <>
      <main className="main">
        {/* <Preloader /> */}
        {/* <NotFound /> */}
        <SearchResults />
        <AboutAuthor />
      </main>
    </>
  );
};

export default Main;
