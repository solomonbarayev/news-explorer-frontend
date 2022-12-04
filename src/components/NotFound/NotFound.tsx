import './NotFound.css';
import notFound from '../../images/not_found.svg';
import React from 'react';

const NotFound = () => {
  return (
    <section className="not-found">
      <div className="not-found__container section">
        <img src={notFound} alt="Not found" className="not-found__image" />
        <h2 className="not-found__title">Nothing found</h2>
        <p className="not-found__text">
          Sorry, but nothing matched your search terms.
        </p>
      </div>
    </section>
  );
};

export default NotFound;
