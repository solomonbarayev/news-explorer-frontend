// import mainApi from '../../utils/MainApi'
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Article, UnformattedArticle } from '../../models/Article';
import { RootState } from '../../store';
import newsApi from '../../utils/NewsApi';
import mainApi from '../../utils/MainApi';

export const searchArticles = createAsyncThunk(
  'articles/searchArticles',
  async (keyword: string, { rejectWithValue }) => {
    try {
      const res = await newsApi.getNews(keyword);
      return { res, keyword };
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const saveArticle = createAsyncThunk(
  'articles/saveArticle',
  (article: UnformattedArticle, thunkAPI) => {
    const { getState } = thunkAPI;
    const { user } = getState() as RootState;
    const token = user.token;

    //check if user is logged in
    if (!token) {
      return thunkAPI.rejectWithValue('You must be logged in to save articles');
    }

    //check if article is already saved
    const { articles } = getState() as RootState;
    const { keyword, savedArticles } = articles;
    const isSaved = savedArticles.find((a) => a.link === article.url);

    //format article
    const formattedArticle: Article = {
      keyword,
      _id: article._id,
      title: article.title,
      text: article.description,
      date: article.publishedAt,
      source: article.source.name,
      link: article.url,
      image: article.urlToImage,
    };

    if (!isSaved) {
      try {
        const res = mainApi.saveArticle(formattedArticle, token);
        return res;
      } catch (err) {
        return thunkAPI.rejectWithValue(err);
      }
    }
  }
);

export const deleteArticle = createAsyncThunk(
  'articles/deleteArticle',
  async (articleId: string | UnformattedArticle, thunkAPI) => {
    const { getState } = thunkAPI;
    const { user } = getState() as RootState;
    const token = user.token;

    //check if user is logged in
    if (!token) {
      return thunkAPI.rejectWithValue(
        'You must be logged in to delete articles'
      );
    }

    try {
      const res = await mainApi.deleteArticle(articleId, token);
      console.log(res);
      return res;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const getSavedArticles = createAsyncThunk(
  'articles/getSavedArticles',
  async (_, thunkAPI) => {
    const { getState } = thunkAPI;
    const { user } = getState() as RootState;
    const token = user.token;

    //check if user is logged in
    if (!token) {
      return thunkAPI.rejectWithValue(
        'You must be logged in to get saved articles'
      );
    }

    try {
      const res = await mainApi.getSavedArticles(token);
      return res;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
