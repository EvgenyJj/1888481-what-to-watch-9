import {AuthorizationStatus} from '../const';
import {Film} from './film';
import {FilmsReviewData} from './review';
import {store} from '../store';
import {UserData} from './user';

export type UserSetting= {
  authorizationStatus: AuthorizationStatus,
  user: UserData | null
};

export type FilmsData = {
  films: Film[],
  favoriteFilms: Film[],
  similarFilms: Film[],
  promoFilm: Film | null,
  currentFilm: Film | null | undefined,
  reviews: FilmsReviewData[],
  isDataLoaded: boolean,
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
