import FilmList from '../../components/film-list/film-list';
import FilmPromo from '../../components/film-promo/film-promo';
import GenreList from '../../components/genre-list/genre-list';
import Logo from '../../components/logo/logo';
import User from '../../components/user/user';
import {ALL_GENRES} from '../../const';
import {filterFilms} from '../../store/action';
import {useAppDispatch, useAppSelector} from '../../hooks';


function MainPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const {films, filteredFilms} = useAppSelector((state) => state);
  const getToUniqueKeys = (
    array: {[key: string]: any}[],
    key: string,
    initialValue = '',
  ): string[] => (
    array
      .map((item) => item[key])
      .reduce((uniqueKeys: string[], current) => {
        if (!uniqueKeys.includes(current)) {
          uniqueKeys.push(current);
        }
        return uniqueKeys;
      }, [initialValue])
  );
  const genres = getToUniqueKeys(films, 'genre', ALL_GENRES);

  return (
    <>
      <FilmPromo film={films[5]}>
        <header className="page-header film-card__head">
          <Logo />
          <User />
        </header>
      </FilmPromo>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenreList genres={genres} onChange={() => dispatch(filterFilms())} />

          <div className="catalog__films-list">
            <FilmList films={filteredFilms} />
          </div>

          <div className="catalog__more">
            <button className="catalog__button" type="button">Show more</button>
          </div>
        </section>

        <footer className="page-footer">
          <Logo />

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </>
  );
}

export default MainPage;
