import {Link} from 'react-router-dom';
import {MouseEvent} from 'react';

type GenreListProps = {
  genres: string[],
  currentGenre: string,
  setCurrentGenre: (genre: string) => void;
  setMaxFilmCount: () => void;
};

function GenreList({genres, currentGenre, setCurrentGenre, setMaxFilmCount}: GenreListProps): JSX.Element {

  const genreClickHandle = (evt: MouseEvent<HTMLAnchorElement>, genre: string) => {
    evt.preventDefault();
    setCurrentGenre(genre);
    setMaxFilmCount();
  };

  return (
    <ul className="catalog__genres-list">
      {genres.map((genre) => (
        <li className={`catalog__genres-item${genre === currentGenre ? ' catalog__genres-item--active' : ''}`} key={genre}>
          <Link to="#" className="catalog__genres-link" onClick={(evt) => genreClickHandle(evt, genre)}>{genre}</Link>
        </li>
      ))}
    </ul>
  );
}

export default GenreList;
