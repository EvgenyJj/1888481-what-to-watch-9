import {AuthorizationStatus} from '../const';
import {Film} from './film';
import {Review} from './review';
import {store} from '../store';
import {User} from './user';

export type UserData = {
  authorizationStatus: AuthorizationStatus,
  user: User | null
};

export type FilmsData = {
  currentFilm: Film | null | undefined,
  favoriteFilms: Film[],
  films: Film[],
  filteredFilms: Film[],
  genre: string,
  promoFilm: Film | null,
  reviews: Review[],
  similarFilms: Film[]
};

export type AppSettings = {
  isLoading: boolean
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
