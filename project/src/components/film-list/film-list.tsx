import FilmCard from '../film-card/film-card';
import {Film} from '../../types/film';
import {useState} from 'react';

type FilmListProps = {
  films: Film[]
}

function FilmList({films}: FilmListProps): JSX.Element {
  const [activeId, setActiveId] = useState<number | null>(null);

  return (
    <div className="catalog__films-list">
      {
        films.map((film) => (
          <FilmCard
            film={film}
            isActive={film.id === activeId}
            key={film.id}
            onHover={setActiveId}
          />
        ))
      }
    </div>
  );
}

export default FilmList;
