import React from 'react';
import './SavedNewsHeader.css';
import { useArticles } from '../../contexts/ArticlesContext';

const SavedNewsHeader = () => {
  const { savedArticles } = useArticles();

  const [uniqueKeywordsByPopularity, setUniqueKeywordsByPopularity] =
    React.useState<string[]>([]);

  function findKeywordsByPopularity(keywords) {
    return keywords.reduce((acc, keyword) => {
      acc[keyword] ? (acc[keyword] += 1) : (acc[keyword] = 1);
      console.log(acc);
      return acc;
    }, {});
  }

  const findUniqueKeywords = () => {
    const keywords = savedArticles.map((article) => article.keyword);
    const keywordsByPopularity = findKeywordsByPopularity(keywords);

    //sort keywords by popularity
    const sortedKeywords = Object.entries(keywordsByPopularity).sort(
      (a, b) => (b[1] as number) - (a[1] as number)
    );

    //get unique keywords
    const presortedUniqueKeywords: string[] = sortedKeywords.map(
      (keyword) => keyword[0]
    );

    setUniqueKeywordsByPopularity(presortedUniqueKeywords);
  };

  React.useEffect(() => {
    findUniqueKeywords();
  }, [savedArticles]);

  return (
    <div className="section news-header">
      <h1 className="news-header__title">Saved articles</h1>
      <p className="news-header__subtitle">
        You have {savedArticles.length} saved articles
      </p>
      {savedArticles.length >= 1 && (
        <p className="news-header__keywords">
          By keywords:{' '}
          <span className="news-header__keywords_bold">
            {uniqueKeywordsByPopularity.length <= 2
              ? uniqueKeywordsByPopularity.join(', ')
              : uniqueKeywordsByPopularity.slice(0, 2).join(', ') +
                ' and ' +
                (uniqueKeywordsByPopularity.length - 2) +
                ' more'}
          </span>
        </p>
      )}
    </div>
  );
};

export default SavedNewsHeader;
