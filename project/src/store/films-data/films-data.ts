import {createSlice} from '@reduxjs/toolkit';
import {FilmsData} from '../../types/state';
import {NameSpace} from '../../const';

const initialState: FilmsData = {
  currentFilm: null,
  favoriteFilms: [],
  films: [],
  promoFilm: null,
  reviews: [],
  similarFilms: [],
  isDataLoaded: false,
};

export const filmsData = createSlice({
  name: NameSpace.Films,
  initialState,
  reducers: {
    loadFilms: (state, action) => {
      state.films = action.payload;
      state.isDataLoaded = true;
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
    clearCurrentFilm: (state) => {
      state.currentFilm = null;
    },
    loadReviews: (state, action) => {
      state.reviews = action.payload;
    },
  },
});


export const {
  loadFilms,
  loadCurrentFilm,
  loadSimilarFilms,
  loadPromoFilm,
  loadFavoriteFilms,
  clearCurrentFilm,
  loadReviews} = filmsData.actions;
