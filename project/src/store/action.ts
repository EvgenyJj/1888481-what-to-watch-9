import {AuthorizationStatus, AppRoute} from '../const';
import {createAction} from '@reduxjs/toolkit';
import {Film} from '../types/film';
import {User} from '../types/user';

export const loadFilms = createAction<Film[]>('films/load');

export const changeGenre = createAction<string>('films/changeGenre');

export const filterFilms = createAction('films/filter');

export const requireAuthStatus = createAction<AuthorizationStatus>('user/changeAuthStatus');

export const loadUserInfo = createAction<User>('user/loadInfo');

export const redirectToRoute = createAction<AppRoute>('app/redirectToRoute');

export const showMore = createAction('showMore');

export const resetShowedCardCount = createAction('resetShowedCardCount');
