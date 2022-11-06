const { createContext, useContext, useEffect } = require('react');

const ArticlesContext = createContext();

//temporary data
const data = require('../data');

// make a provider
const ArticlesContextProvider = ({ children }) => {
  return (
    <ArticlesContext.Provider value={{ data }}>
      {children}
    </ArticlesContext.Provider>
  );
};

export default ArticlesContextProvider;

//make a custom hook for accessing the context
export const useArticles = () => {
  const { data } = useContext(ArticlesContext).data;

  return { data };
};
