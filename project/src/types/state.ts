import {Film} from './film';
import {store} from '../store';

export type State = {
  films: Film[],
  filteredFilms: Film[],
  genre: string,
  isDataLoaded: boolean,
}

export type AppDispatch = typeof store.dispatch;
