export enum AppRoute {
  Main = '/',
  SignIn = '/login',
  MyList = '/mylist',
  Film = '/films/:id',
  AddReview = '/films/:id/review',
  Player = '/player/:id',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const TIMER_DELAY = 1000;

export const ALL_GENRES = 'All genres';

export const APIRoute  = {
  Favorite: () => '/favorite',
  Films: '/films',
  Login: '/login',
  Logout: 'logout',
};

export enum HTTP_CODE {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
}

export enum ViewLink {
  List = 'List',
}
