import {api, store} from '../store';
import {APIRoute, AuthorizationStatus, AppRoute} from '../const';
import {AuthData} from '../types/auth-data';
import {createAsyncThunk } from '@reduxjs/toolkit';
import {dropToken, saveToken} from '../services/token';
import {errorHandle} from '../services/error-handle';
import {Film} from '../types/film';
import {loadFilms, filterFilms, requireAuthStatus, loadUserInfo, redirectToRoute, changeLoadingStatus, loadReviews} from './action';
import {Review} from '../types/review';
import {ReviewData} from '../types/review-data';
import {UserData} from '../types/user-data';

export const fetchFilmAction = createAsyncThunk(
  'data/fetchFilms',
  async () => {
    try {
      store.dispatch(changeLoadingStatus(true));
      const {data} = await api.get<Film[]>(APIRoute.Films);
      store.dispatch(loadFilms(data));
      store.dispatch(filterFilms());
      store.dispatch(changeLoadingStatus(false));
    } catch (error) {
      errorHandle(error);
      store.dispatch(changeLoadingStatus(false));
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
  async ({login: email, password}: AuthData) => {
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
      const {data} = await api.get<Review[]>(`${APIRoute.Comments}/${id}`);
      store.dispatch(loadReviews(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const postReviewAction = createAsyncThunk(
  'data/postReview',
  async ({filmId, ...review}: ReviewData) => {
    try {
      store.dispatch(changeLoadingStatus(true));
      const {data} = await api.post<Review[]>(`${APIRoute.Comments}/${filmId}`, {...review});
      store.dispatch(loadReviews(data));
      store.dispatch(changeLoadingStatus(false));
      store.dispatch(redirectToRoute(`${APIRoute.Films}/${filmId}`));
    } catch (error) {
      errorHandle(error);
      store.dispatch(changeLoadingStatus(false));
    }
  },
);
