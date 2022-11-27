import React from 'react';
import './SearchForm.css';
import { useArticles } from '../../contexts/ArticlesContext';

const SearchForm = () => {
  const { keyword, setKeyword, handleArticleSearch } = useArticles();

  const handleChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('keyword', keyword);
    handleArticleSearch(keyword);
  };

  //use effect to fetch last searched keyword on reload
  React.useEffect(() => {
    const keywordHistory = localStorage.getItem('keyword');
    if (keywordHistory) {
      setKeyword(keywordHistory);
      handleArticleSearch(keywordHistory);
    }
  }, []);

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <div className="search-form__container">
        <input
          className="search-form__input"
          type="text"
          placeholder="Enter topic"
          onChange={handleChange}
          value={keyword || ''}
        />
        <button className="search-form__button" type="submit">
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
