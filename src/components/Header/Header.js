// import css
import './Header.css';
import Nav from '../Nav/Nav';

import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';

import { useIsHome } from '../../contexts/IsHomeContext';

const Header = () => {
  const { isHome } = useIsHome();
  return (
    <header className={`${isHome ? 'header' : 'header header_bg-light'}`}>
      <div className="section header__container">
        <Nav isHome={isHome} />

        {isHome ? (
          <div className="header__content">
            <h1 className="header__title">What's going on in the world?</h1>
            <p className="header__subtitle">
              Find the latest news on any topic and save them in your personal
              account.
            </p>

            <SearchForm />
          </div>
        ) : (
          <SavedNewsHeader />
        )}
      </div>
    </header>
  );
};

export default Header;
