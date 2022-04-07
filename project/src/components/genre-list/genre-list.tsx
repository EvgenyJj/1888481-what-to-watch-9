import {changeGenre} from '../../store/action';
import {MouseEvent} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';

type GenreListProps = {
  genres: string[],
  onChange: () => void
};

function GenreList({genres, onChange}: GenreListProps): JSX.Element {
  const currentGenre = useAppSelector(({genre}) => genre);
  const dispatch = useAppDispatch();

  const genreClickHandler = (evt: MouseEvent<HTMLAnchorElement>, genre: string) => {
    evt.preventDefault();
    dispatch(changeGenre(genre));
    onChange();
  };

  return (
    <ul className="catalog__genres-list">
      {genres.map((genre) => (
        <li className={`catalog__genres-item${genre === currentGenre ? ' catalog__genres-item--active' : ''}`} key={genre}>
          <a href="#" className="catalog__genres-link" onClick={(evt: MouseEvent<HTMLAnchorElement>) => genreClickHandler(evt, genre)}>{genre}</a>
        </li>
      ))}
    </ul>
  );
}

export default GenreList;
