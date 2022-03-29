import {ALL_GENRES} from '../const';
import {changeGenre, filterFilms, loadFilms} from './action';
import {createReducer} from '@reduxjs/toolkit';
import {State} from '../types/state';

const initialState: State = {
  films: [],
  filteredFilms: [],
  genre: ALL_GENRES,
  isDataLoaded: false,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadFilms, (state: State, {payload}) => {
      state.films = payload;
      state.isDataLoaded = true;
    })
    .addCase(changeGenre, (state, {payload}) => {
      state.genre = payload;
    })
    .addCase(filterFilms, (state) => {
      state.genre === ALL_GENRES
        ? state.filteredFilms = state.films
        : state.filteredFilms = state.films.filter(({genre}) => genre === state.genre);
    });
});

export {reducer};
