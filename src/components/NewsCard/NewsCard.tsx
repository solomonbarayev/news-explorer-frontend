import React from 'react';
import './NewsCard.css';
import { useIsHome } from '../../contexts/IsHomeContext';
import { Article, UnformattedArticle } from '../../models/Article';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import {
  saveArticle,
  deleteArticle,
} from '../../features/articles/articlesActions';
import { openPopup } from '../../features/popups/popupsSlice';

type NewsCardProps = {
  card: UnformattedArticle | Article;
};

const NewsCard = ({ card }: NewsCardProps) => {
  const [showToolTip, setShowToolTip] = React.useState(false);
  const [isSaved, setIsSaved] = React.useState(false);
  const [formattedCard, setFormattedCard] = React.useState<Article>(
    {} as Article
  );

  const dispatch = useDispatch<AppDispatch>();

  const { loggedIn } = useSelector((state: RootState) => state.user);
  const { articlesToShow, savedArticles, articles } = useSelector(
    (state: RootState) => state.articles
  );

  const [defaultImage] = React.useState(
    'https://images.unsplash.com/photo-1508921340878-ba53e1f016ec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80'
  );

  const { isHome } = useIsHome();

  const handleMouseEnter = () => {
    !loggedIn && setShowToolTip(true);
  };
  const handleMouseLeave = () => {
    setShowToolTip(false);
  };

  const handleSaveClick = () => {
    dispatch(saveArticle(card as UnformattedArticle));
    setIsSaved(true);
  };

  const handleDeleteClick = () => {
    if (isHome) {
      let articleToDelete;
      savedArticles.forEach((article) => {
        if (article.title === card.title) {
          articleToDelete = article;
        }
      });
      dispatch(deleteArticle(articleToDelete._id));
    } else {
      //here we are in the saved news page so articles already have _id
      dispatch(deleteArticle(card._id));
    }
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    e.nativeEvent.stopImmediatePropagation();
    isHome && !loggedIn && dispatch(openPopup('signin'));
    !isHome && handleDeleteClick();
    isHome && loggedIn && !isSaved && handleSaveClick();
    isHome && loggedIn && isSaved && handleDeleteClick();
  };

  const checkIfSaved = () => {
    const articleIsSaved = savedArticles.find((article: Article) => {
      return article.link === (card as UnformattedArticle).url;
    });

    articleIsSaved ? setIsSaved(true) : setIsSaved(false);
  };

  React.useEffect(() => {
    if (!isHome) {
      return;
    }
    checkIfSaved();
  }, [savedArticles, articlesToShow, articles, isHome]);

  React.useEffect(() => {
    if (isHome) {
      card = card as UnformattedArticle;
      setFormattedCard({
        _id: card._id,
        title: card.title,
        text: card.description,
        date: card.publishedAt,
        source: card.source.name,
        link: card.url,
        image: card.urlToImage,
      });
    } else {
      setFormattedCard(card as Article);
    }
  }, [card]);

  const formatDate = (date: string) => {
    const newDate = new Date(date);
    const options = {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    };
    return newDate.toLocaleDateString(
      'en-US',
      options as Intl.DateTimeFormatOptions
    );
  };

  return (
    <a
      href={formattedCard.link}
      target="_blank"
      rel="noreferrer"
      className="news-card">
      <article className="news-card_container">
        <div
          className="news-card__image-container"
          style={{
            backgroundImage: ` url(${
              formattedCard.image === undefined
                ? defaultImage
                : formattedCard.image
            })`,
          }}></div>
        <div className="news-card__text-container">
          <p className="news-card__date">{formatDate(formattedCard.date)}</p>
          <h3 className="news-card__title">{formattedCard.title}</h3>
          <p className="news-card__text">{formattedCard.text}</p>
          <p className="news-card__source">{formattedCard.source}</p>
        </div>
        {showToolTip && (
          <button className="news-card__tootltip">
            Sign in to save articles
          </button>
        )}
        <button
          className={`news-card__button ${
            isHome
              ? `news-card__button_type_save ${
                  isSaved ? 'news-card__button_type_save-active' : ''
                }`
              : 'news-card__button_type_trash'
          }`}
          aria-label={isHome ? 'save article' : 'delete article'}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={(e) => handleButtonClick(e)}></button>
        {!isHome && (
          <p className="news-card__keyword">{formattedCard.keyword}</p>
        )}
      </article>
    </a>
  );
};

export default NewsCard;
