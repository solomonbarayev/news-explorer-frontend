import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Article, UnformattedArticle } from '../../models/Article';
import {
  deleteArticle,
  getSavedArticles,
  saveArticle,
  searchArticles,
} from './articlesActions';

interface ArticlesState {
  articles: UnformattedArticle[];
  articlesToShow: UnformattedArticle[];
  articleIndex: number;
  savedArticles: Article[];
  keyword: string;
  isLoading: boolean;
  error: string | null;
}

const initialState: ArticlesState = {
  articles: [],
  articlesToShow: [],
  articleIndex: 3,
  savedArticles: [],
  keyword: '',
  isLoading: false,
  error: null,
};

export const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    setStateKeyword: (state, action: PayloadAction<string>) => {
      state.keyword = action.payload;
    },
    showMoreArticles: (state) => {
      console.log('show more articles');
      state.articleIndex += 3;
      state.articlesToShow = state.articles.slice(0, state.articleIndex);
    },
  },
  extraReducers: (builder) => {
    //searchArticles
    builder
      .addCase(searchArticles.pending, (state: ArticlesState) => {
        state.isLoading = true;
      })
      .addCase(searchArticles.fulfilled, (state: ArticlesState, action) => {
        const articles = action.payload.res.articles;
        const keyword = action.payload.keyword;
        state.isLoading = false;
        state.articles = articles;
        state.articlesToShow = articles.slice(0, state.articleIndex);
        state.keyword = keyword;
      })
      .addCase(searchArticles.rejected, (state: ArticlesState, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    //saveArticle
    builder
      .addCase(saveArticle.fulfilled, (state: ArticlesState, action) => {
        state.savedArticles.push(action.payload);
      })
      .addCase(saveArticle.rejected, (state: ArticlesState, action) => {
        state.error = action.payload as string;
      });

    //deleteArticle
    builder
      .addCase(deleteArticle.fulfilled, (state: ArticlesState, action) => {
        const articleToDelete = action.payload;
        state.savedArticles = state.savedArticles.filter(
          (a) => a._id !== articleToDelete._id
        );
      })
      .addCase(deleteArticle.rejected, (state: ArticlesState, action) => {
        state.error = action.payload as string;
      });

    //loadSavedArticles
    builder
      .addCase(getSavedArticles.pending, (state: ArticlesState) => {
        state.isLoading = true;
      })
      .addCase(getSavedArticles.fulfilled, (state: ArticlesState, action) => {
        state.isLoading = false;
        state.savedArticles = action.payload;
      })
      .addCase(getSavedArticles.rejected, (state: ArticlesState, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default articlesSlice.reducer;

export const { setStateKeyword, showMoreArticles } = articlesSlice.actions;
