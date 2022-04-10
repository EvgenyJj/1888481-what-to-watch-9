import {MouseEvent, useEffect, useRef, useState} from 'react';
import {SECONDS_PER_HOUR} from '../../const';
import {useNavigate} from 'react-router-dom';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import PreviewVideoPlayer from './preview-video-player';

type VideoPlayerProps = {
  name: string,
  src: string,
}

const getFormattedDuration = (seconds: number) => {
  dayjs.extend(duration);
  return dayjs.duration(seconds, 'seconds').format(seconds > SECONDS_PER_HOUR ? 'HH:mm:ss' : 'mm:ss');
};

function VideoPlayer({name, src}: VideoPlayerProps): JSX.Element {
  const playerRef = useRef<HTMLDivElement>(null);

  const [isLoaded, setIsLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isFullScreen, setFullScreen] = useState(false);
  const [videoDuration, setVideoDuration] = useState(0);
  const [watchedTime, setWatchedTime] = useState(0);

  const videoPlayerProgress = Math.round((watchedTime / videoDuration) * 100) || 0;
  const secondsLeft = Math.floor(videoDuration - watchedTime);
  const timeLeft = getFormattedDuration(secondsLeft);

  const navigate = useNavigate();

  useEffect(() => {
    if (playerRef.current === null) {
      return;
    }

    if (isFullScreen) {
      playerRef.current.requestFullscreen();
    } else if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  }, [isFullScreen]);

  const handleExitClick = (evt: MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    navigate(-1);
  };

  return(
    <div className="player" ref={playerRef}>
      {isLoaded ? null : <div>Loading...</div>}
      <PreviewVideoPlayer
        src={src}
        isPlaying={isPlaying}
        setIsLoaded={() => setIsLoaded(true)}
        setVideoDuration={setVideoDuration}
        setWatchedTime={setWatchedTime}
      />

      <button
        type="button"
        className="player__exit"
        onClick={handleExitClick}
      >
          Exit
      </button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value={videoPlayerProgress} max="100"></progress>
            <div className="player__toggler" style={{left: `${videoPlayerProgress}%`}}>Toggler</div>
          </div>
          <div className="player__time-value">{`-${timeLeft}`}</div>
        </div>

        <div className="player__controls-row">
          <button
            type="button"
            className="player__play"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            <svg viewBox="0 0 19 19" width="19" height="19">
              {isPlaying ? <use xlinkHref="#pause"/> : <use xlinkHref="#play-s"/>}
            </svg>
            <span>Play</span>
          </button>

          <div className="player__name">{name}</div>

          <button
            type="button"
            className="player__full-screen"
            onClick={() => setFullScreen(!isFullScreen)}
          >
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"></use>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default VideoPlayer;
