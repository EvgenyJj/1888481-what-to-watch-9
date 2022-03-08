import VideoPlayer from '../video-player/video-player';
import {Film} from '../../types/film';
import {Link} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {TIMER_DELAY} from '../../const';

type FilmCardProps = {
  film: Film,
}

function FilmCard({film}: FilmCardProps): JSX.Element {
  const {id, name} = film;
  const [isHovering, setIsHovering] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect (() => {
    if (!isHovering) {
      setIsPlaying(false);
      return;
    }
    const timer = setTimeout (() => setIsPlaying(true), TIMER_DELAY);
    return () => {
      clearInterval(timer);
    };
  }, [isHovering]);

  return (
    <article
      className="small-film-card catalog__films-card"
      onMouseOver={() => setIsHovering(true)}
      onMouseOut={() => setIsHovering(false)}
    >
      <div className="small-film-card__image">
        <VideoPlayer
          autoPlay={isPlaying}
          video={film}
          showButtonControls={false}
          muted
        />
      </div>
      <h3 className="small-film-card__title">
        <Link
          className="small-film-card__link"
          to={`/films/${id}`}
        >
          {name}
        </Link>
      </h3>
    </article>
  );
}

export default FilmCard;
