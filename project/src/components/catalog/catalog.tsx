import {ALL_GENRES, MAX_CARD_SHOW_COUNT} from '../../const';
import {selectFilms} from '../../store/films-data/select';
import {useAppSelector} from '../../hooks';
import {useState} from 'react';
import FilmList from '../../components/film-list/film-list';
import GenreList from '../../components/genre-list/genre-list';
import ShowMoreButton from '../../components/show-more-button/show-more-button';

function Catalog(): JSX.Element {
  const [currentGenre, setCurrentGenre] = useState(ALL_GENRES);
  const [maxFilmsCount, setMaxFilmsCount] = useState(MAX_CARD_SHOW_COUNT);
  const films = useAppSelector(selectFilms);
  const filteredFilms = currentGenre === ALL_GENRES ? films : films.filter((film) => film.genre === currentGenre);
  const genres = [...new Set([ALL_GENRES, ...Array.from(films, ({genre}) => genre)])];

  return (
    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>

      <GenreList
        genres={genres}
        currentGenre={currentGenre}
        setCurrentGenre={(genre) => setCurrentGenre(genre)}
        setMaxFilmCount={() => setMaxFilmsCount(MAX_CARD_SHOW_COUNT)}
      />
      <FilmList
        films={filteredFilms.slice(0, maxFilmsCount)}
      />
      {filteredFilms.length > maxFilmsCount &&
      <ShowMoreButton
        setMaxFilmCount={() => setMaxFilmsCount(maxFilmsCount + MAX_CARD_SHOW_COUNT)}
      />}
    </section>
  );
}

export default Catalog;
