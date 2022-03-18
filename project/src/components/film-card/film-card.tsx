import VideoPlayer from '../video-player/video-player';
import {Film} from '../../types/film';
import {Link} from 'react-router-dom';
import {useState, useEffect} from 'react';
import {TIMER_DELAY} from '../../const';

type FilmCardProps = {
  film: Film,
}

function FilmCard({film}: FilmCardProps): JSX.Element {
  const {id, name} = film;
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!isHovered) {
      setIsPlaying(false);
      return;
    }

    const timerId = setTimeout(() => setIsPlaying(true), TIMER_DELAY);

    return () => {
      clearInterval(timerId);
    };

  }, [isHovered]);

  return (
    <article className="small-film-card catalog__films-card"
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
    >
      <div className="small-film-card__image">
        <VideoPlayer
          isPlaying={isPlaying}
          video={film}
          onPlayButtonClick={() => setIsPlaying(!isPlaying)}
          isMuted
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
