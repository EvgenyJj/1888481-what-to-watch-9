import AddReview from '../add-review/add-review';
import FilmPage from '../film/film-page';
import MainPage from '../main/main';
import MyList from '../my-list/my-list';
import PageNotFound from '../page-not-found/page-not-found';
import Player from '../player/player';
import PrivateRoute from  '../private-route/private-route';
import SignIn from '../sign-in/sign-in';
import {AppRoute, AuthorizationStatus} from '../../const';
import {Film} from '../../types/film';
import {Route, BrowserRouter, Routes} from 'react-router-dom';

type AppProps = {
  films: Film[],
}

function App({films}: AppProps): JSX.Element {
  const favorite = films.filter(({isFavorite}) => isFavorite);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={
            <MainPage
              films={films}
            />
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
              authorizationStatus={AuthorizationStatus.Auth}
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
    </BrowserRouter>
  );
}

export default App;

