import {api, store} from '../store';
import {APIRoute, AuthorizationStatus, AppRoute} from '../const';
import {createAsyncThunk } from '@reduxjs/toolkit';
import {dropToken, saveToken} from '../services/token';
import {errorHandle} from '../services/error-handle';
import {Film} from '../types/film';
import {
  loadFilms,
  loadCurrentFilm,
  loadSimilarFilms,
  loadPromoFilm,
  loadFavoriteFilms,
  loadReviews} from './films-data/films-data';
import {redirectToRoute} from './action';
import {requireAuthStatus, loadUserInfo} from './user-data/user-data';
import {UsersReviewData} from '../types/review';
import {UserData, AuthData} from '../types/user';

export const fetchFilmAction = createAsyncThunk(
  'data/fetchFilms',
  async () => {
    try {
      const {data} = await api.get<Film[]>(APIRoute.Films);
      store.dispatch(loadFilms(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const checkAuthAction = createAsyncThunk(
  'user/checkAuth',
  async () => {
    try {
      const {data: {token, ...user}} = await api.get(APIRoute.Login);
      store.dispatch(requireAuthStatus(AuthorizationStatus.Auth));
      store.dispatch(loadUserInfo(user));
    } catch(error) {
      errorHandle(error);
    }
  },
);

export const loginAction = createAsyncThunk(
  'user/login',
  async ({email, password}: AuthData) => {
    try {
      const {data: {token, ...user}} = await api.post<UserData>(APIRoute.Login, {email, password});
      saveToken(token);
      store.dispatch(requireAuthStatus(AuthorizationStatus.Auth));
      store.dispatch(loadUserInfo(user));
      store.dispatch(redirectToRoute(AppRoute.Main));
    } catch (error) {
      errorHandle(error);
      store.dispatch(requireAuthStatus(AuthorizationStatus.NoAuth));
    }
  },
);

export const logoutAction = createAsyncThunk(
  'user/logout',
  async () => {
    try {
      await api.delete(APIRoute.Logout);
      dropToken();
      store.dispatch(requireAuthStatus(AuthorizationStatus.NoAuth));
      store.dispatch(loadUserInfo(null));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const fetchReviewsAction = createAsyncThunk(
  'data/fetchReviews',
  async (id: number) => {
    try {
      const {data} = await api.get<Film[]>(`${APIRoute.Comments}/${id}`);
      store.dispatch(loadReviews(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const postReviewAction = createAsyncThunk(
  'data/postReview',
  async ({id, comment, rating}: UsersReviewData) => {
    try {
      const {data} = await api.post<UsersReviewData[]>(`${APIRoute.Comments}/${id}`, {comment, rating});
      store.dispatch(loadReviews(data));
      store.dispatch(redirectToRoute(`${APIRoute.Films}/${id}`));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const fetchSimilarFilmsAction = createAsyncThunk(
  'data/fetchSimilarFilms',
  async (id: number) => {
    try {
      const {data} = await api.get<Film[]>(`${APIRoute.Films}/${id}${APIRoute.Similar}`);
      store.dispatch(loadSimilarFilms(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const fetchCurrentFilmAction = createAsyncThunk(
  'data/fetchCurrentFilm',
  async (id: number) => {
    try {
      const {data} = await api.get<Film>(`${APIRoute.Films}/${id}`);
      store.dispatch(loadCurrentFilm(data));
    } catch (error) {
      errorHandle(error);
      store.dispatch(loadCurrentFilm(undefined));
    }
  },
);

export const fetchPromoFilmAction = createAsyncThunk(
  'data/fetchPromoFilm',
  async () => {
    try {
      const {data} = await api.get<Film>(APIRoute.Promo);
      store.dispatch(loadPromoFilm(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const fetchFavoriteFilmsAction = createAsyncThunk(
  'data/fetchFavoriteFilms',
  async () => {
    try {
      const {data} = await api.get<Film[]>(APIRoute.Favorite);
      store.dispatch(loadFavoriteFilms(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const loadFavouritePromoAction = createAsyncThunk(
  'data/setFavouritePromo',
  async ({promoId, isFavorite}: {promoId: number, isFavorite: boolean}) => {
    try {
      const {data} = await api.post<Film>(`${APIRoute.Favorite}/${promoId}/${isFavorite ? 0 : 1}`);
      store.dispatch(loadPromoFilm(data));
    } catch (error) {
      store.dispatch(redirectToRoute(AppRoute.SignIn));
    }
  },
);

export const loadFavouriteCurrentAction = createAsyncThunk(
  'data/setFavouriteCurrent',
  async ({currentFilmId, isFavorite}: {currentFilmId: number, isFavorite: boolean}) => {
    try {
      const {data} = await api.post<Film>(`${APIRoute.Favorite}/${currentFilmId}/${isFavorite ? 0 : 1}`);
      store.dispatch(loadCurrentFilm(data));
    } catch (error) {
      store.dispatch(redirectToRoute(AppRoute.SignIn));
    }
  },
);
