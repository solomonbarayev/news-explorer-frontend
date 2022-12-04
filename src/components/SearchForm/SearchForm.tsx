import React from 'react';
import './SearchForm.css';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { searchArticles } from '../../features/articles/articlesActions';
import { setStateKeyword } from '../../features/articles/articlesSlice';

const SearchForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [error, setError] = React.useState('');
  const { keyword } = useSelector((state: RootState) => state.articles);

  const handleChange = (e) => {
    dispatch(setStateKeyword(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (keyword.length === 0) {
      setError('Please enter a keyword');
      return;
    }
    setError('');
    localStorage.setItem('keyword', keyword);
    dispatch(searchArticles(keyword));
  };

  //use effect to fetch last searched keyword on reload
  React.useEffect(() => {
    const keywordHistory: string | null = localStorage.getItem('keyword');
    if (keywordHistory) {
      dispatch(setStateKeyword(keywordHistory));
      dispatch(searchArticles(keywordHistory));
    }
  }, []);

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <div className="search-form__container">
        <div className="search-form__input-container">
          <input
            className="search-form__input"
            type="text"
            placeholder="Enter topic"
            onChange={handleChange}
            value={keyword || ''}
          />
          <span className="search-form__error">{error}</span>
        </div>
        <button className="search-form__button" type="submit">
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
