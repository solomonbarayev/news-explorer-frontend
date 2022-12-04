import React from 'react';
import './Nav.css';
import { NavLink } from 'react-router-dom';
import blackLogo from '../../images/NewsExplorer_logo_black.svg';
import whiteLogo from '../../images/NewsExplorer_logo_white.svg';
import blackBurgerIcon from '../../images/menu_icon_black.svg';
import whiteBurgerIcon from '../../images/menu_icon_white.svg';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { AppDispatch } from '../../store';
import { handleLogoutRX } from '../../features/user/userSlice';
import { openPopup } from '../../features/popups/popupsSlice';

const Nav = ({ isHome }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { user, loggedIn } = useSelector((state: RootState) => state.user);

  const handleNavButtonClick = () => {
    if (!loggedIn) {
      dispatch(openPopup('signin'));
    }
    if (loggedIn) {
      dispatch(handleLogoutRX());
    }
  };

  const handleHamburgerClick = () => {
    dispatch(openPopup('mobile'));
  };

  return (
    <nav className={`${isHome ? 'nav' : 'nav nav_bg-light'}`}>
      <div className="section nav__container">
        <div className="nav__logo-container">
          <img
            src={isHome ? whiteLogo : blackLogo}
            alt="logo"
            className="nav__logo"
          />
        </div>
        <div className="nav__menu">
          <ul className="nav__menu-list">
            <li className="nav__menu-item">
              <NavLink
                exact={true}
                to="/"
                className={
                  isHome ? 'nav__link' : 'nav__link nav__link_bg-light'
                }
                activeClassName={` ${
                  isHome
                    ? 'nav__link_active'
                    : 'nav__link_active nav__link_active_bg-light'
                }`}>
                Home
              </NavLink>
            </li>
            {loggedIn && (
              <li className="nav__menu-item">
                <NavLink
                  to="/saved-news"
                  className={
                    isHome ? 'nav__link' : 'nav__link nav__link_bg-light'
                  }
                  activeClassName={` ${
                    isHome
                      ? 'nav__link_active'
                      : 'nav__link_active nav__link_active_bg-light'
                  }`}>
                  Saved articles
                </NavLink>
              </li>
            )}
          </ul>
          <button
            className={`${
              isHome ? 'nav__button' : 'nav__button nav__button_bg-light '
            }`}
            onClick={handleNavButtonClick}>
            <span className="nav__button-text">
              {/* {loggedIn ? currentUser.name : 'Sign in'} */}
              {loggedIn && user ? user.name : 'Sign in'}
            </span>
            {loggedIn && (
              <span
                className={`nav__button-icon ${
                  !isHome && 'nav__button-icon_bg_light'
                }`}></span>
            )}
          </button>
        </div>
        <button
          onClick={handleHamburgerClick}
          className="nav__hamburger"
          style={{
            backgroundImage: `url(${
              isHome ? whiteBurgerIcon : blackBurgerIcon
            })`,
          }}></button>
      </div>
    </nav>
  );
};

export default Nav;
