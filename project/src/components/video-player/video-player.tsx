import {TIMER_DELAY} from '../../const';
import {useEffect, useRef} from 'react';

type VideoPlayerProps = {
  isMuted?: boolean;
  isPlaying: boolean;
  poster: string;
  src: string;
}

function VideoPlayer({isMuted, isPlaying, poster, src}: VideoPlayerProps): JSX.Element {

  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current === null) {
      return;
    }

    const currentCardFilm = videoRef.current;

    let timer: ReturnType<typeof setTimeout>;

    if(isPlaying) {
      timer = setTimeout( () => {
        currentCardFilm.play();
      }, TIMER_DELAY);
    }

    return () => {
      clearTimeout(timer);
      currentCardFilm.load();
    };
  }, [isPlaying]);

  return (
    <video
      className="player__video"
      muted={isMuted}
      poster={poster}
      ref={videoRef}
      src={src}
    />
  );
}

export default VideoPlayer;
