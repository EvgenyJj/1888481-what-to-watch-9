export enum AppRoute {
  Main = '/',
  SignIn = '/login',
  MyList = '/mylist',
  Film = '/films/:id',
  AddReview = '/films/:id/review',
  Player = '/player/:id'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN'
}

export const TIMER_DELAY = 1000;
export const SECONDS_PER_HOUR = 3600;
export const MINS_PER_HOUR = 60;
export const REVIEWS_COL_COUNT = 2;
export const MAX_SIMILAR_COUNT = 4;
export const MAX_CARD_SHOW_COUNT = 8;
export const FILM_SCORE = 10;
export const REVIEW_LENGTH_MIN = 50;
export const REVIEW_LENGTH_MAX = 400;

export const ALL_GENRES = 'All genres';

export enum APIRoute {
  Films = '/films',
  Login = '/login',
  Logout = '/logout',
  Comments = '/comments',
  Similar = '/similar',
  Promo = '/promo',
  Favorite = '/favorite'
}

export enum HttpCode {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404
}

export enum RatingName {
  Bad = 'Bad',
  Normal = 'Normal',
  Good = 'Good',
  VeryGood = 'Very Good',
  Awesome = 'Awesome'
}

export enum  ItemTabs {
  Overview = 'Overview',
  Details = 'Details',
  Reviews = 'Reviews'
}

export enum NameSpace {
  User = 'USER',
  Films = 'FILMS',
  App = 'APP'
}
