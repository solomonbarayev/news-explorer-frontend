import React from 'react';
import './NewsCard.css';
import { useIsHome } from '../../contexts/IsHomeContext';
import { useAuth } from '../../contexts/AuthContext';
import { usePopup } from '../../contexts/PopupsContext';

const NewsCard = ({ card }) => {
  const [showToolTip, setShowToolTip] = React.useState(false);

  const { isHome } = useIsHome();
  const { loggedIn } = useAuth();
  const { openPopup } = usePopup();

  const handleMouseEnter = () => {
    !loggedIn && setShowToolTip(true);
  };
  const handleMouseLeave = () => {
    setShowToolTip(false);
  };

  const handleButtonClick = () => {
    isHome && !loggedIn && openPopup('signin');
    isHome && loggedIn && console.log('save card');
    !isHome && console.log('delete card');
  };

  return (
    <article className="news-card">
      <div
        className="news-card__image-container"
        style={{
          backgroundImage: `url(${card.image})`,
        }}></div>
      <div className="news-card__text-container">
        <p className="news-card__date">{card.date}</p>
        <h3 className="news-card__title">{card.title}</h3>
        <p className="news-card__text">{card.text}</p>
        <p className="news-card__source">{card.source}</p>
      </div>
      {showToolTip && (
        <button className="news-card__tootltip">
          Sign in to save articles
        </button>
      )}
      <button
        className={`news-card__button ${
          isHome
            ? 'news-card__button_type_save'
            : 'news-card__button_type_trash'
        }`}
        aria-label={isHome ? 'save article' : 'delete article'}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleButtonClick}></button>
      {!isHome && <p className="news-card__keyword">{card.keyword}</p>}
    </article>
  );
};

export default NewsCard;
