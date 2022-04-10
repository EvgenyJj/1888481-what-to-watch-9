import {TIMER_DELAY} from '../../const';
import {useEffect, useRef} from 'react';

type FilmPreviewProps = {
  isMuted?: boolean,
  isPlaying: boolean,
  poster: string,
  src: string,
};

function FilmPreview({isMuted, isPlaying, poster, src}: FilmPreviewProps): JSX.Element {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const currentElement = videoRef.current;

    if (currentElement === null) {
      return;
    }

    let timer: ReturnType<typeof setTimeout>;

    if (isPlaying) {
      timer = setTimeout(async () => {
        await currentElement.play();
      }, TIMER_DELAY);
    }

    return () => {
      clearTimeout(timer);
      currentElement.load();
    };
  }, [isPlaying]);

  return (
    <video
      className="player__video"
      muted={isMuted}
      poster={poster}
      ref={videoRef}
      src={src}
      height="175"
    />
  );
}

export default FilmPreview;
