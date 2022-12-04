import React, { useEffect, MouseEvent, useCallback } from 'react';
import './MobileMenu.css';
import { NavLink } from 'react-router-dom';
import logo from '../../images/NewsExplorer_logo_white.svg';
import logOutIcon from '../../images/logout_icon_white.svg';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { handleLogoutRX } from '../../features/user/userSlice';
import { closeAllPopups, openPopup } from '../../features/popups/popupsSlice';

const MobileMenu = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { loggedIn, user } = useSelector((state: RootState) => state.user);

  const { mobile } = useSelector((state: RootState) => state.popups);

  const handleAuthButtonClick = () => {
    if (loggedIn) {
      dispatch(handleLogoutRX());
      dispatch(closeAllPopups());
    } else {
      dispatch(closeAllPopups());
      dispatch(openPopup('signin'));
    }
  };

  const stopOverlayClickPropagation = (evt: MouseEvent) => {
    evt.stopPropagation();
  };

  const escapeKeyclose = useCallback(
    (evt: KeyboardEvent) => {
      if (evt.key === 'Escape' && mobile) {
        closeAllPopups();
      }
    },
    [mobile, closeAllPopups]
  );

  useEffect(() => {
    document.addEventListener('keydown', escapeKeyclose);
    return () => {
      document.removeEventListener('keydown', escapeKeyclose);
    };
  }, [escapeKeyclose]);

  return (
    <div
      className={`${mobile ? 'mobile-menu mobile-menu_opened' : 'mobile-menu'}`}
      onClick={() => dispatch(closeAllPopups())}>
      <div
        className="mobile-menu__container"
        onClick={stopOverlayClickPropagation}>
        <div className="mobile-menu__top-bar">
          <div className="mobile-menu__logo-container">
            <img src={logo} alt="logo" className="mobile-menu__logo" />
          </div>
          <button
            type="button"
            className="mobile-menu__close-button"
            aria-label="close button"
            onClick={() => dispatch(closeAllPopups())}></button>
        </div>
        <nav className="mobile-menu__nav">
          <ul className="mobile-menu__nav-list">
            <li className="mobile-menu__list-item">
              <NavLink
                exact={true}
                to="/"
                className="mobile-menu__link"
                activeClassName="mobile-menu__link_active"
                onClick={() => dispatch(closeAllPopups())}>
                Home
              </NavLink>
            </li>
            {loggedIn && (
              <li className="mobile-menu__list-item">
                <NavLink
                  to="/saved-news"
                  className="mobile-menu__link"
                  activeClassName="mobile-menu__link_active"
                  onClick={() => dispatch(closeAllPopups())}>
                  Saved articles
                </NavLink>
              </li>
            )}
          </ul>

          <button
            className="mobile-menu__button"
            onClick={handleAuthButtonClick}>
            <span className="mobile-menu__button-text">
              {loggedIn ? (user ? user.name : 'Sign in') : 'Sign in'}
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
