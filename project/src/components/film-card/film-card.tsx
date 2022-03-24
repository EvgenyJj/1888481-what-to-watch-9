import VideoPlayer from '../video-player/video-player';
import {Film} from '../../types/film';
import {Link} from 'react-router-dom';

type FilmCardProps = {
  film: Film,
  isActive: boolean
  onHover: (id: number | null) => void,
}

function FilmCard({film, isActive, onHover}: FilmCardProps): JSX.Element {
  const {id, name} = film;
  return (
    <article className="small-film-card catalog__films-card"
      onMouseOver={() => onHover(id)}
      onMouseOut={() => onHover(null)}
    >
      <div className="small-film-card__image">
        <VideoPlayer
          isMuted
          isPlaying={isActive}
          poster={film.previewImage}
          src={film.videoLink}
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
