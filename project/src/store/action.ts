import {AuthorizationStatus, AppRoute} from '../const';
import {createAction} from '@reduxjs/toolkit';
import {Film} from '../types/film';
import {Review} from '../types/review';
import {User} from '../types/user';

export const loadFilms = createAction<Film[]>('films/load');

export const changeGenre = createAction<string>('films/changeGenre');

export const filterFilms = createAction('films/filter');

export const requireAuthStatus = createAction<AuthorizationStatus>('user/requireAuthStatus');

export const loadUserInfo = createAction<User | null>('user/loadInfo');

export const redirectToRoute = createAction<AppRoute>('app/redirectToRoute');

export const loadReviews = createAction<Review[]>('films/loadReviews');

export const postReview = createAction<Review[]>('films/postReview');

export const changeLoadingStatus = createAction<boolean>('user/changeLoadingStatus');

export const loadSimilarFilms = createAction<Film[]>('films/loadSimilarFilms');

export const loadCurrentFilm = createAction<Film | undefined>('films/loadCurrentFilm');
