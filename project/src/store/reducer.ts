import {ALL_GENRES, AuthorizationStatus, MAX_CARD_SHOW_COUNT} from '../const';
import {changeGenre, requireAuthStatus, filterFilms, loadFilms, loadUserInfo, showMore, resetShowedCardCount} from './action';
import {createReducer} from '@reduxjs/toolkit';
import {State} from '../types/state';

const initialState: State = {
  authorizationStatus: AuthorizationStatus.Unknown,
  films: [],
  filteredFilms: [],
  genre: ALL_GENRES,
  isDataLoaded: false,
  showedCardsCount: MAX_CARD_SHOW_COUNT,
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
    .addCase(showMore, (state) => {
      state.showedCardsCount = state.showedCardsCount + MAX_CARD_SHOW_COUNT;
    })
    .addCase(resetShowedCardCount, (state) => {
      state.showedCardsCount = MAX_CARD_SHOW_COUNT;
    })
    .addCase(requireAuthStatus, (state, action) => {
      state.authorizationStatus = action.payload;
    });
});

export {reducer};
