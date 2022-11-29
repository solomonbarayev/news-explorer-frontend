import mainApi from '../utils/MainApi';
import newsApi from '../utils/NewsApi';
import { useAuth } from './AuthContext';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Article, UnformattedArticle } from '../models/Article';

interface ArticlesContextValue {
  articles: UnformattedArticle[];
  setArticles: React.Dispatch<React.SetStateAction<UnformattedArticle[]>>;
  articlesToShow: UnformattedArticle[];
  setArticlesToShow: React.Dispatch<React.SetStateAction<UnformattedArticle[]>>;
  articleIndex: number;
  setArticleIndex: React.Dispatch<React.SetStateAction<number>>;
  savedArticles: Article[];
  setSavedArticles: React.Dispatch<React.SetStateAction<Article[]>>;
  handleArticleSave: (article: UnformattedArticle) => void;
  handleArticleDelete: (article: Article) => void;
  keyword: string;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isEmpty: boolean;
  setIsEmpty: React.Dispatch<React.SetStateAction<boolean>>;
  handleArticleSearch: (keyword: string) => void;
}

const ArticlesContext = createContext<ArticlesContextValue | undefined>(
  undefined
);

// make a provider
const ArticlesContextProvider = ({ children }) => {
  const { token, loggedIn } = useAuth();
  const [articles, setArticles] = useState<UnformattedArticle[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [articleIndex, setArticleIndex] = useState<number>(3);
  const [articlesToShow, setArticlesToShow] = useState<UnformattedArticle[]>(
    articles.slice(0, articleIndex)
  );
  const [savedArticles, setSavedArticles] = useState<Article[]>([]);
  const [keyword, setKeyword] = useState<string>('');
  const [isEmpty, setIsEmpty] = useState<boolean>(false);

  useEffect(() => {
    if (!loggedIn) {
      setSavedArticles([]);
      return;
    }
    mainApi.getSavedArticles(token).then((res) => {
      setSavedArticles(res);
    });
  }, [loggedIn, token]);

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

  const handleArticleDelete = (article) => {
    mainApi
      .deleteArticle(article._id, token)
      .then(() => {
        const newSavedArticles = savedArticles.filter(
          (savedArticle) => savedArticle._id !== article._id
        );
        setSavedArticles(newSavedArticles);
      })
      .catch((err) => console.log(err));
  };

  return (
    <ArticlesContext.Provider
      value={{
        articles,
        setArticles,
        articlesToShow,
        setArticlesToShow,
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

  if (context === undefined) {
    throw new Error(
      'useArticles must be used within a ArticlesContextProvider'
    );
  }

  return context;
};
