import {api, store} from '../store';
import {APIRoute} from '../const';
import {createAsyncThunk } from '@reduxjs/toolkit';
import {Film} from '../types/film';
import {loadFilms, filterFilms} from './action';

const fetchFilmAction = createAsyncThunk(
  'data/fetchFilms',
  async () => {
    const {data} = await api.get<Film[]>(APIRoute.Films);
    store.dispatch(loadFilms(data));
    store.dispatch(filterFilms());
  },
);

export default fetchFilmAction();
