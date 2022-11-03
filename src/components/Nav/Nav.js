import React from 'react';
import './Nav.css';
import logoutIcon from '../../images/logout_icon_black.svg';
import { NavLink } from 'react-router-dom';
import blackLogo from '../../images/NewsExplorer_logo_black.svg';
import whiteLogo from '../../images/NewsExplorer_logo_white.svg';
import blackBurgerIcon from '../../images/menu_icon_black.svg';
import whiteBurgerIcon from '../../images/menu_icon_white.svg';
import closeIcon from '../../images/close_icon.svg';
import { usePopup } from '../../contexts/PopupsContext';
import { useAuth } from '../../contexts/AuthContext';

const Nav = ({ isHome }) => {
  const { openPopup } = usePopup();
  const { loggedIn, user, handleLogout } = useAuth();

  const handleNavButtonClick = () => {
    !loggedIn ? openPopup('signin') : handleLogout();
  };

  return (
    <nav className="section nav">
      <div className="nav__logo">
        <img src={isHome ? whiteLogo : blackLogo} alt="logo" />
      </div>
      <div className="nav__menu">
        <ul className="nav__menu-list">
          <li className="nav__menu-item">
            <NavLink
              exact={true}
              to="/"
              className={isHome ? 'nav__link' : 'nav__link nav__link_bg-light'}
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
            {loggedIn ? user.firstName : 'Sign in'}
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
        className="nav__hamburger"
        style={{
          backgroundImage: `url(${isHome ? whiteBurgerIcon : blackBurgerIcon})`,
        }}></button>
    </nav>
  );
};

export default Nav;
