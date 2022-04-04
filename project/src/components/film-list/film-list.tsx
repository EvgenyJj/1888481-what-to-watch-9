import FilmCard from '../film-card/film-card';
import {Film} from '../../types/film';
import {useState} from 'react';

type FilmListProps = {
  films: Film[],
}

function FilmList({films}: FilmListProps): JSX.Element {
  const [activeId, setActiveId] = useState<number | null>(null);

  return (
    <>
      <h2 className="catalog__title">More like this</h2>
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
    </>
  );
}

export default FilmList;
