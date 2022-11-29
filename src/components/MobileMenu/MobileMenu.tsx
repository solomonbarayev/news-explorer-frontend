import React, { useEffect, MouseEvent } from 'react';
import './MobileMenu.css';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { usePopup } from '../../contexts/PopupsContext';
import { useUser } from '../../contexts/UserContext';
import logo from '../../images/NewsExplorer_logo_white.svg';
import logOutIcon from '../../images/logout_icon_white.svg';

const MobileMenu = () => {
  const { loggedIn, handleLogout } = useAuth();
  const { currentUser } = useUser();
  const { closeAllPopups, popupsState, openPopup } = usePopup();
  const { mobile } = popupsState;

  const handleAuthButtonClick = () => {
    if (loggedIn) {
      handleLogout();
      closeAllPopups();
    } else {
      openPopup('signin');
    }
  };

  useEffect(() => {
    if (!mobile) return;

    function handleEscClose(evt: KeyboardEvent) {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    }

    function handleOverlayClickClose(
      evt: React.MouseEvent<Element, MouseEvent>
    ) {
      if (
        (evt.target as HTMLElement).classList.contains('mobile-menu_opened')
      ) {
        closeAllPopups();
      }
    }

    // change this to not touch the dom directly
    // from here
    document.addEventListener('keydown', handleEscClose);
    document.addEventListener('click', handleOverlayClickClose);

    return () => {
      document.removeEventListener('keydown', handleEscClose);
      document.removeEventListener('click', handleOverlayClickClose);
    };
    // to here
  }, [mobile, closeAllPopups]);

  return (
    <div
      className={`${
        mobile ? 'mobile-menu mobile-menu_opened' : 'mobile-menu'
      }`}>
      <div className="mobile-menu__container">
        <div className="mobile-menu__top-bar">
          <div className="mobile-menu__logo-container">
            <img src={logo} alt="logo" className="mobile-menu__logo" />
          </div>
          <button
            type="button"
            className="mobile-menu__close-button"
            aria-label="close button"
            onClick={closeAllPopups}></button>
        </div>
        <nav className="mobile-menu__nav">
          <ul className="mobile-menu__nav-list">
            <li className="mobile-menu__list-item">
              <NavLink
                exact={true}
                to="/"
                className="mobile-menu__link"
                activeClassName="mobile-menu__link_active">
                Home
              </NavLink>
            </li>
            {loggedIn && (
              <li className="mobile-menu__list-item">
                <NavLink
                  to="/saved-news"
                  className="mobile-menu__link"
                  activeClassName="mobile-menu__link_active">
                  Saved articles
                </NavLink>
              </li>
            )}
          </ul>

          <button
            className="mobile-menu__button"
            onClick={handleAuthButtonClick}>
            <span className="mobile-menu__button-text">
              {loggedIn
                ? currentUser
                  ? currentUser.name
                  : 'Sign in'
                : 'Sign in'}
            </span>
            {loggedIn && (
              <img
                className="mobile-menu__icon"
                src={logOutIcon}
                alt="logout"
              />
            )}
          </button>
        </nav>
      </div>
    </div>
  );
};

export default MobileMenu;
