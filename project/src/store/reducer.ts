import {ALL_GENRES, AuthorizationStatus} from '../const';
import {changeGenre, requireAuthStatus, filterFilms, loadFilms, loadUserInfo, loadReviews, changeLoadingStatus, loadSimilarFilms, loadCurrentFilm} from './action';
import {createReducer} from '@reduxjs/toolkit';
import {State} from '../types/state';

const initialState: State = {
  authorizationStatus: AuthorizationStatus.Unknown,
  films: [],
  filteredFilms: [],
  genre: ALL_GENRES,
  isLoading: false,
  reviews: [],
  similarFilms: [],
  user: null,
  currentFilm: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadFilms, (state: State, {payload}) => {
      state.films = payload;
    })
    .addCase(loadUserInfo, (state: State, {payload}) => {
      state.user = payload;
    })
    .addCase(changeGenre, (state, {payload}) => {
      state.genre = payload;
    })
    .addCase(filterFilms, (state) => {
      state.genre === ALL_GENRES
        ? state.filteredFilms = state.films
        : state.filteredFilms = state.films.filter(({genre}) => genre === state.genre);
    })
    .addCase(requireAuthStatus, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(loadReviews, (state: State, {payload}) => {
      state.reviews = payload;
    })
    .addCase(loadSimilarFilms, (state: State, {payload}) => {
      state.similarFilms = payload;
    })
    .addCase(loadCurrentFilm, (state, action) => {
      state.currentFilm = action.payload;
    })
    .addCase(changeLoadingStatus, (state, action) => {
      state.isLoading = action.payload;
    });
});

export {reducer};
