import React from 'react';
import './SearchForm.css';

const SearchForm = () => {
  return (
    <form className="search-form">
      <div className="search-form__container">
        <input
          className="search-form__input"
          type="text"
          placeholder="Enter topic"
        />
        <button className="search-form__button" type="submit">
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
