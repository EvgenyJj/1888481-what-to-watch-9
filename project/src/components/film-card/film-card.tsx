import {Film} from '../../types/film';
import {Link} from 'react-router-dom';

type FilmCardProps = {
  film: Film,
  onHover: (id: number | null) => void,
  isActive: boolean
}

function FilmCard({film, onHover, isActive}: FilmCardProps): JSX.Element {
  const {id, name, previewImage} = film;
  return (
    <article className="small-film-card catalog__films-card"
      onMouseOver={() => onHover(film.id)}
      onMouseOut={() => onHover(null)}
    >
      <div className="small-film-card__image">
        <img src={previewImage} alt={name} width="280" height="175" />
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`/films/${id}`}>
          {name}
        </Link>
      </h3>
    </article>
  );
}

export default FilmCard;
