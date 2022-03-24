import {ALL_GENRES} from '../const';
import {changeGenre, filterFilms} from './action';
import {createReducer} from '@reduxjs/toolkit';
import {films} from '../mocks/films';

const initialState = {
  genre: ALL_GENRES,
  films: films,
  filteredFilms: films,
};

const reducer = createReducer(initialState, (builder) => {
  builder
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
