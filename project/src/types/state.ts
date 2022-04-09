import {Film} from './film';
import {store} from '../store';
import {AuthorizationStatus} from '../const';
import {User} from './user';
import {Review} from './review';

export type State = {
  authorizationStatus: AuthorizationStatus,
  films: Film[],
  filteredFilms: Film[],
  genre: string,
  isLoading: boolean,
  reviews: Review[],
  similarFilms: Film[],
  user: User | null,
  currentFilm: Film | null | undefined,
};

export type AppDispatch = typeof store.dispatch;
