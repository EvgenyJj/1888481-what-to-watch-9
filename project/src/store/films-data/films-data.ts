import {createSlice} from '@reduxjs/toolkit';
import {FilmsData} from '../../types/state';
import {NameSpace, ALL_GENRES} from '../../const';

const initialState: FilmsData = {
  currentFilm: null,
  favoriteFilms: [],
  films: [],
  filteredFilms: [],
  genre: ALL_GENRES,
  promoFilm: null,
  reviews: [],
  similarFilms: [],
};

export const filmsData = createSlice({
  name: NameSpace.Films,
  initialState,
  reducers: {
    loadFilms: (state, action) => {
      state.films = action.payload;
    },
    loadCurrentFilm: (state, action) => {
      state.currentFilm = action.payload;
    },
    loadSimilarFilms: (state, action) => {
      state.similarFilms = action.payload;
    },
    loadPromoFilm: (state, action) => {
      state.promoFilm = action.payload;
    },
    loadFavoriteFilms: (state, action) => {
      state.favoriteFilms= action.payload;
    },
    filterFilms: (state) => {
      state.genre === ALL_GENRES
        ? state.filteredFilms = state.films
        : state.filteredFilms = state.films.filter(({genre}) => genre === state.genre);
    },
    changeGenre: (state, action) => {
      state.genre = action.payload;
    },
    loadReviews: (state, action) => {
      state.reviews = action.payload;
    },
    changeFilm: (state, action) => {
      const index = state.films.findIndex(({id}) => id === action.payload.id);
      state.films[index] = action.payload;
    },
  },
});

export const {
  loadFilms,
  loadCurrentFilm,
  loadSimilarFilms,
  loadPromoFilm,
  loadFavoriteFilms,
  filterFilms,
  changeGenre,
  loadReviews,
  changeFilm,
} = filmsData.actions;
