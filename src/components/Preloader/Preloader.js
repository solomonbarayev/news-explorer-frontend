import React from 'react';
import './Preloader.css';

const Preloader = () => {
  return (
    <div className="preloader">
      <i class="preloader__icon"></i>
      <h2 className="preloader__text">Searching for news...</h2>
    </div>
  );
};

export default Preloader;
