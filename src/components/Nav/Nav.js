import React from 'react';
import logoutIcon from '../../images/logout_icon_black.svg';
import { Link } from 'react-router-dom';
import blackLogo from '../../images/NewsExplorer_logo_black.svg';
import whiteLogo from '../../images/NewsExplorer_logo_white.svg';
import blackBurgerIcon from '../../images/menu_icon_black.svg';
import whiteBurgerIcon from '../../images/menu_icon_white.svg';
import closeIcon from '../../images/close_icon.svg';

const Nav = ({ isHome }) => {
  return (
    <div className="section header__nav-container">
      <div className="header__logo">
        <img src={isHome ? whiteLogo : blackLogo} alt="logo" />
      </div>
      <nav className="header__menu">
        {/* when you install router, use Link instead  */}
        <Link
          to="/"
          className={`${
            isHome ? 'header__link' : 'header__link header__link_bg-light'
          }`}
        >
          Home
        </Link>
        <Link
          to="/saved-news"
          className={`${
            isHome ? 'header__link' : 'header__link header__link_bg-light'
          }`}
        >
          Saved articles
        </Link>
        <button
          className={`${
            isHome
              ? 'header__button'
              : 'header__button header__button_bg-light '
          }`}
        >
          <span className="header__button-text">Sign in</span>
          <img src={logoutIcon} alt="logout" className="header__button-icon" />
        </button>
      </nav>
      <button
        className="header__hamburger"
        style={{
          backgroundImage: `url(${isHome ? whiteBurgerIcon : blackBurgerIcon})`,
        }}
      ></button>
    </div>
  );
};

export default Nav;
