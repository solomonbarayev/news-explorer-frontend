import React from 'react';
import SearchResults from '../SearchResults/SearchResults';
import AboutAuthor from '../AboutAuthor/AboutAuthor';
import Preloader from '../Preloader/Preloader';
import NotFound from '../NotFound/NotFound';
import { useArticles } from '../../contexts/ArticlesContext';

const Main = () => {
  const { articles, isLoading, isEmpty } = useArticles();
  return (
    <>
      <main className="main">
        {isLoading && <Preloader />}
        {isEmpty && <NotFound />}
        {articles.length > 0 && <SearchResults />}
        <AboutAuthor />
      </main>
    </>
  );
};

export default Main;
