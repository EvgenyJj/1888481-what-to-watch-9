import {Film} from './film';
import {store} from '../store';
import {AuthorizationStatus} from '../const';
import {User} from './user';

export type State = {
  authorizationStatus: AuthorizationStatus,
  films: Film[],
  filteredFilms: Film[],
  genre: string,
  isDataLoaded: boolean,
  showedCardsCount: number,
  user: User | null
};

export type AppDispatch = typeof store.dispatch;
