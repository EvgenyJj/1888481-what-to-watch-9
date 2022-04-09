import {ALL_GENRES, MAX_CARD_SHOW_COUNT} from '../../const';
import {filterFilms} from '../../store/films-data/films-data';
import {useAppDispatch, useAppSelector} from '../../hooks';
import FilmList from '../../components/film-list/film-list';
import GenreList from '../../components/genre-list/genre-list';
import ShowMoreButton from '../../components/show-more-button/show-more-button';
import UseShowMoreButton from '../../hooks/use-show-more-button/use-show-more-button';

function Catalog(): JSX.Element {

  const dispatch = useAppDispatch();
  const {films, filteredFilms} = useAppSelector(({FILMS}) => FILMS);
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
    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>

      <GenreList genres={genres} onChange={() => dispatch(filterFilms())} />

      <div className="catalog__films-list">
        <FilmList films={visibleFilms} />
      </div>

      <div className="catalog__more">
        {isButtonShown &&
            <ShowMoreButton onClick={handleShowMoreButtonClick} /> }
      </div>
    </section>
  );
}

export default Catalog;
