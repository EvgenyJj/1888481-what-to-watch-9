import {useEffect, useRef} from 'react';

type PreviewVideoPlayerProps = {
  isMuted?: boolean,
  isPlaying: boolean,
  setIsLoaded: () => void,
  setVideoDuration: (value: number) => void,
  setWatchedTime: (value: number) => void,
  src: string,
}

function PreviewVideoPlayer({
  isMuted,
  isPlaying,
  setIsLoaded,
  setVideoDuration,
  setWatchedTime,
  src}: PreviewVideoPlayerProps): JSX.Element {

  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current === null) {
      return;
    }

    if (isPlaying) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }

    setVideoDuration(videoRef.current.duration);
  });

  const handleTimeChange = () => {
    if (videoRef.current === null) {
      return;
    }
    setWatchedTime(videoRef.current.currentTime);
  };

  return (
    <video
      className="player__video"
      muted={isMuted}
      ref={videoRef}
      src={src}
      onTimeUpdate={handleTimeChange}
      onCanPlay={setIsLoaded}
    />
  );
}

export default PreviewVideoPlayer;
