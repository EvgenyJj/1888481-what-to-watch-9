import {ALL_GENRES} from '../../const';
import {filterFilms, resetShowedCardCount} from '../../store/action';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {useEffect} from 'react';
import FilmList from '../../components/film-list/film-list';
import FilmPromo from '../../components/film-promo/film-promo';
import GenreList from '../../components/genre-list/genre-list';
import Logo from '../../components/logo/logo';
import ShowMore from '../../components/show-more-button/show-more-button';
import User from '../../components/user/user';

function MainPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const cardsCount = useAppSelector((state) => state.films.length);
  const showedCardsCount = useAppSelector((state) => state.showedCardsCount);
  const {films, filteredFilms} = useAppSelector((state) => state);

  useEffect(() => {
    dispatch(resetShowedCardCount());
  }, []);

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
            <ShowMore filmsCount={cardsCount} showedCardsCount={showedCardsCount} />
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
