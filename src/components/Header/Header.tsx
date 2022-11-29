// import css
import './Header.css';
import Nav from '../Nav/Nav';

import React from 'react';
// import SearchForm from '../SearchForm/SearchForm';
import HomeHeader from '../HomeHeader/HomeHeader';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';

import { useIsHome } from '../../contexts/IsHomeContext';

const Header = () => {
  const { isHome } = useIsHome();
  return (
    <header className={`${isHome ? 'header' : 'header header_bg-light'}`}>
      <div className="header__container">
        <Nav isHome={isHome} />

        {isHome ? <HomeHeader /> : <SavedNewsHeader />}
      </div>
    </header>
  );
};

export default Header;
