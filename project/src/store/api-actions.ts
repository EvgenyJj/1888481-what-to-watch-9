import {api, store} from '../store';
import {APIRoute, AuthorizationStatus, AppRoute} from '../const';
import {AuthData} from '../types/auth-data';
import {createAsyncThunk } from '@reduxjs/toolkit';
import {dropToken, saveToken} from '../services/token';
import {errorHandle} from '../services/error-handle';
import {Film} from '../types/film';
import {loadFilms, filterFilms, requireAuthStatus, loadUserInfo, redirectToRoute} from './action';
import {UserData} from '../types/user-data';

export const fetchFilmAction = createAsyncThunk(
  'data/fetchFilms',
  async () => {
    try {
      const {data} = await api.get<Film[]>(APIRoute.Films);
      store.dispatch(loadFilms(data));
      store.dispatch(filterFilms());
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
    } catch (error) {
      errorHandle(error);
    }
  },
);
