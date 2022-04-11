import {Film} from '../../types/film';
import {Link, useNavigate} from 'react-router-dom';
import FilmPreview from '../film-preview/film-preview';

type FilmCardProps = {
  film: Film,
  isActive: boolean
  onHover: (id: number | null) => void,
}

function FilmCard({film, isActive, onHover}: FilmCardProps): JSX.Element {
  const {id, name} = film;
  const navigate = useNavigate();

  return (
    <article className="small-film-card catalog__films-card"
      onMouseOver={() => onHover(id)}
      onMouseOut={() => onHover(null)}
    >
      <div
        className="small-film-card__image"
        role="button"
        onClick={() => navigate(`/films/${id}`)}
      >
        <FilmPreview
          isMuted
          isPlaying={isActive}
          poster={film.previewImage}
          src={film.previewVideoLink}
        />
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
