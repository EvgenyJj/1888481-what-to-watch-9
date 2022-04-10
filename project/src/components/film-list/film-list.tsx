import {Film} from '../../types/film';
import {useState} from 'react';
import FilmCard from '../film-card/film-card';

type FilmListProps = {
  films: Film[],
}

function FilmList({films}: FilmListProps): JSX.Element {
  const [activeId, setActiveId] = useState<number | null>(null);

  return (
    <div className="catalog__films-list">
      {films.map((film) => (
        <FilmCard
          key={film.id}
          film={film}
          isActive={film.id === activeId}
          onHover={setActiveId}
        />
      ))}
    </div>
  );
}

export default FilmList;
