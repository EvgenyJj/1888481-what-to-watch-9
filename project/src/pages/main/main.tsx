import {ALL_GENRES, MAX_CARD_SHOW_COUNT} from '../../const';
import {filterFilms} from '../../store/action';
import {useAppDispatch, useAppSelector} from '../../hooks';
import FilmList from '../../components/film-list/film-list';
import FilmPromo from '../../components/film-promo/film-promo';
import GenreList from '../../components/genre-list/genre-list';
import Logo from '../../components/logo/logo';
import ShowMoreButton from '../../components/show-more-button/show-more-button';
import User from '../../components/user/user';
import UseShowMoreButton from '../../hooks/use-show-more-button/use-show-more-button';

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
  const [visibleFilms, isButtonShown, handleShowMoreButtonClick] = UseShowMoreButton(filteredFilms, MAX_CARD_SHOW_COUNT);

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
            <h2 className="catalog__title">More like this</h2>
            <FilmList films={visibleFilms} />
          </div>

          <div className="catalog__more">
            {isButtonShown &&
            <ShowMoreButton onClick={handleShowMoreButtonClick} /> }
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
