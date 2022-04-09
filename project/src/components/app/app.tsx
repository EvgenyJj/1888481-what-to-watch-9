import {AppRoute} from '../../const';
import {Route, Routes} from 'react-router-dom';
import {useAppSelector} from '../../hooks';
import AddReview from '../../pages/add-review/add-review';
import browserHistory from '../../services/browser-history';
import FilmPage from '../../pages/film/film-page';
import HistoryRouter from '../history-route/history-route';
import MainPage from '../../pages/main/main';
import MyList from '../../pages/my-list/my-list';
import PageNotFound from '../page-not-found/page-not-found';
import Player from '../../pages/player/player';
import PrivateRoute from  '../private-route/private-route';
import SignIn from '../../pages/sign-in/sign-in';

function App(): JSX.Element {
  const {films} = useAppSelector(({FILMS}) => FILMS);
  const {authorizationStatus} = useAppSelector(({USER}) => USER);
  const favorite = films.filter(({isFavorite}) => isFavorite);

  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={
            <MainPage />
          }
        />
        <Route
          path={AppRoute.SignIn}
          element={<SignIn />}
        />
        <Route
          path={AppRoute.MyList}
          element={
            <PrivateRoute
              authorizationStatus={authorizationStatus}
            >
              <MyList
                favorite={favorite}
              />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Film}
          element={
            <FilmPage />
          }
        />
        <Route
          path={AppRoute.Player}
          element={
            <Player />
          }
        />
        <Route
          path={AppRoute.AddReview}
          element={
            <AddReview />
          }
        />
        <Route
          path="*"
          element={<PageNotFound />}
        />
      </Routes>
    </HistoryRouter>
  );
}

export default App;
