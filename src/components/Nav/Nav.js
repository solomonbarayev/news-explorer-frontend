import React from 'react';
import './Nav.css';
import logoutIcon from '../../images/logout_icon_black.svg';
import { Link } from 'react-router-dom';
import blackLogo from '../../images/NewsExplorer_logo_black.svg';
import whiteLogo from '../../images/NewsExplorer_logo_white.svg';
import blackBurgerIcon from '../../images/menu_icon_black.svg';
import whiteBurgerIcon from '../../images/menu_icon_white.svg';
import closeIcon from '../../images/close_icon.svg';

const Nav = ({ isHome }) => {
  return (
    <nav className="section nav">
      <div className="nav__logo">
        <img src={isHome ? whiteLogo : blackLogo} alt="logo" />
      </div>
      <div className="nav__menu">
        <ul className="nav__menu-list">
          <li className="nav__menu-item">
            <Link
              to="/"
              className={`${
                isHome ? 'nav__link' : 'nav__link nav__link_bg-light'
              }`}
            >
              Home
            </Link>
          </li>
          <li className="nav__menu-item">
            <Link
              to="/saved-news"
              className={`${
                isHome ? 'nav__link' : 'nav__link nav__link_bg-light'
              }`}
            >
              Saved articles
            </Link>
          </li>
        </ul>
        <button
          className={`${
            isHome ? 'nav__button' : 'nav__button nav__button_bg-light '
          }`}
        >
          <span className="nav__button-text">Sign in</span>
          <img src={logoutIcon} alt="logout" className="nav__button-icon" />
        </button>
      </div>
      <button
        className="nav__hamburger"
        style={{
          backgroundImage: `url(${isHome ? whiteBurgerIcon : blackBurgerIcon})`,
        }}
      ></button>
    </nav>
  );
};

export default Nav;
