import {ALL_GENRES, AuthorizationStatus} from '../const';
import {changeGenre, requireAuthStatus, filterFilms, loadFilms, loadUserInfo} from './action';
import {createReducer} from '@reduxjs/toolkit';
import {State} from '../types/state';

const initialState: State = {
  authorizationStatus: AuthorizationStatus.Unknown,
  films: [],
  filteredFilms: [],
  genre: ALL_GENRES,
  isDataLoaded: false,
  user: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadFilms, (state: State, {payload}) => {
      state.films = payload;
      state.isDataLoaded = true;
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
    });
});

export {reducer};
