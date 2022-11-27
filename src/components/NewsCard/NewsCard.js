import React from 'react';
import './NewsCard.css';
import { useIsHome } from '../../contexts/IsHomeContext';
import { useAuth } from '../../contexts/AuthContext';
import { usePopup } from '../../contexts/PopupsContext';
import { useArticles } from '../../contexts/ArticlesContext';

const NewsCard = ({ card }) => {
  const [showToolTip, setShowToolTip] = React.useState(false);
  const [isSaved, setIsSaved] = React.useState(false);
  const [formattedCard, setFormattedCard] = React.useState({});

  const [defaultImage] = React.useState(
    'https://images.unsplash.com/photo-1508921340878-ba53e1f016ec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80'
  );

  const { isHome } = useIsHome();
  const { loggedIn } = useAuth();
  const { openPopup } = usePopup();
  const {
    articlesToShow,
    handleArticleSave,
    savedArticles,
    handleArticleDelete,
    articles,
  } = useArticles();

  const handleMouseEnter = () => {
    !loggedIn && setShowToolTip(true);
  };
  const handleMouseLeave = () => {
    setShowToolTip(false);
  };

  const handleSaveClick = () => {
    handleArticleSave(card);
    setIsSaved(true);
  };

  const handleButtonClick = (e) => {
    e.preventDefault();
    e.nativeEvent.stopImmediatePropagation();
    isHome && !loggedIn && openPopup('signin');
    !isHome && handleArticleDelete(card);
    isHome && loggedIn && handleSaveClick();
  };

  const checkIfSaved = () => {
    const articleIsSaved = savedArticles.find((article) => {
      return article.link === card.url;
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
      setFormattedCard({
        title: card.title,
        text: card.description,
        date: card.publishedAt,
        source: card.source.name,
        link: card.url,
        image: card.urlToImage,
        saved: isSaved,
      });
    } else {
      setFormattedCard(card);
    }
  }, [card]);

  const formatDate = (date) => {
    const newDate = new Date(date);
    const options = {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    };
    return newDate.toLocaleDateString('en-US', options);
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
