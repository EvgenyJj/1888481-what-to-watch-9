import {AppRoute} from '../../const';
import {Route, Routes} from 'react-router-dom';
import {selectIsLoading} from '../../store/films-data/select';
import {useAppSelector} from '../../hooks';
import AddReview from '../../pages/add-review/add-review';
import FilmPage from '../../pages/film/film-page';
import Loading from '../loading/loading';
import MainPage from '../../pages/main/main';
import MyList from '../../pages/my-list/my-list';
import PageNotFound from '../page-not-found/page-not-found';
import Player from '../../pages/player/player';
import PrivateRoute from  '../private-route/private-route';
import SignIn from '../../pages/sign-in/sign-in';

function App(): JSX.Element {
  const isLoading = useAppSelector(selectIsLoading);

  if (!isLoading) {
    return <Loading />;
  }

  return (
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
          <PrivateRoute>
            <MyList />
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
          <PrivateRoute>
            <AddReview />
          </PrivateRoute>
        }
      />
      <Route
        path="*"
        element={<PageNotFound />}
      />
    </Routes>
  );
}

export default App;
