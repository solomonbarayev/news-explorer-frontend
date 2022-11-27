import mainApi from '../utils/MainApi';
import newsApi from '../utils/NewsApi';
// import { useAuth } from './AuthContext';
import { useAuth } from '../contexts/AuthContext';
const { createContext, useContext, useEffect, useState } = require('react');

const ArticlesContext = createContext();

//temporary data

// make a provider
const ArticlesContextProvider = ({ children }) => {
  const { token, loggedIn } = useAuth();
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [articleIndex, setArticleIndex] = useState(3);
  const [articlesToShow, setArticlesToShow] = useState(
    articles.slice[(0, articleIndex)]
  );
  const [savedArticles, setSavedArticles] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    if (!loggedIn) {
      return;
    }
    mainApi.getSavedArticles(token).then((res) => {
      setSavedArticles(res);
    });
  }, []);

  useEffect(() => {
    setArticlesToShow(articles.slice(0, articleIndex));
  }, [articles, articleIndex]);

  function resetArticles() {
    setArticleIndex(3);
    setArticles([]);
  }

  const handleArticleSearch = async (keyword) => {
    setIsLoading(true);
    resetArticles();
    try {
      const res = await newsApi.getNews(keyword);
      res.articles.length === 0 ? setIsEmpty(true) : setIsEmpty(false);
      setArticles(res.articles);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const checkIfSaved = (article) =>
    savedArticles.find((a) => a.link === article.url);

  const handleArticleSave = (article) => {
    const savedArticle = checkIfSaved(article);

    if (!savedArticle) {
      const articleToSave = {
        keyword: keyword.toLowerCase(),
        title: article.title,
        text: article.description,
        date: article.publishedAt,
        source: article.source.name,
        link: article.url,
        image: article.urlToImage,
      };
      mainApi
        .saveArticle(articleToSave, token)
        .then((res) => {
          setSavedArticles([...savedArticles, res]);
        })
        .catch((err) => console.log(err));
    } else {
      handleArticleDelete(savedArticle);
    }
  };

  // const handleArticleSave = async (article) => {
  //   const savedArticle = checkIfSaved(article);
  //   if (!savedArticle) {
  //     const articleToSave = {
  //       keyword,
  //       title: article.title,
  //       text: article.description,
  //       date: article.publishedAt,
  //       source: article.source.name,
  //       link: article.url,
  //       image: article.urlToImage,
  //     };
  //     try {
  //       const res = await mainApi.saveArticle(articleToSave, token);
  //       setSavedArticles([...savedArticles, res]);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   } else {
  //     handleArticleDelete(savedArticle);
  //   }
  // };

  const handleArticleDelete = (article) => {
    mainApi
      .deleteArticle(article._id, token)
      .then((res) => {
        const newSavedArticles = savedArticles.filter(
          (savedArticle) => savedArticle._id !== article._id
        );
        setSavedArticles(newSavedArticles);
      })
      .catch((err) => console.log(err));
  };

  // const handleArticleDelete = async (article) => {
  //   try {
  //     const res = mainApi.deleteArticle(article._id, token);
  //     const newSavedArticles = savedArticles.filter(
  //       (savedArticle) => savedArticle._id !== article._id
  //     );
  //     setSavedArticles(newSavedArticles);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <ArticlesContext.Provider
      value={{
        articles,
        setArticles,
        articlesToShow,
        articleIndex,
        setArticleIndex,
        savedArticles,
        setSavedArticles,
        handleArticleSave,
        handleArticleDelete,
        keyword,
        setKeyword,
        isLoading,
        setIsLoading,
        isEmpty,
        setIsEmpty,
        handleArticleSearch,
      }}>
      {children}
    </ArticlesContext.Provider>
  );
};

export default ArticlesContextProvider;

export const useArticles = () => {
  const context = useContext(ArticlesContext);
  return context;
};
