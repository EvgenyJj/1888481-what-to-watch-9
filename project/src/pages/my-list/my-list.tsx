import {fetchFavoriteFilmsAction} from '../../store/api-actions';
import {selectFavoriteFilms} from '../../store/films-data/select';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {useEffect} from 'react';
import FilmList from '../../components/film-list/film-list';
import Footer from '../../components/footer/footer';
import Logo from '../../components/logo/logo';
import User from '../../components/user/user';

function MyList(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFavoriteFilmsAction());
  }, [dispatch]);

  const favoriteFilms = useAppSelector(selectFavoriteFilms);

  return(
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo />
        <h1 className="page-title user-page__title">My list</h1>
        <User />
      </header>
      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>
        <FilmList
          films={favoriteFilms}
        />
      </section>
      <Footer />
    </div>
  );
}

export default MyList;
