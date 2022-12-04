import React from 'react';
import SearchResults from '../SearchResults/SearchResults';
import AboutAuthor from '../AboutAuthor/AboutAuthor';
import Preloader from '../Preloader/Preloader';
import NotFound from '../NotFound/NotFound';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const Main = () => {
  // const { articles, isLoading, isEmpty } = useArticles();

  const [isEmpty, setIsEmpty] = React.useState(false);

  const { articles, isLoading } = useSelector(
    (state: RootState) => state.articles
  );

  React.useEffect(() => {
    if (articles.length === 0) {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }
  }, [articles]);

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
