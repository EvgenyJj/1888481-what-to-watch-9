import PageNotFound from '../../components/page-not-found/page-not-found';
import VideoPlayer from '../../components/video-player/video-player';
import {films} from '../../mocks/films';
import {useParams, useNavigate} from 'react-router-dom';

function Player(): JSX.Element {
  const {id: idParams} = useParams();
  const film = films.find(({id}) => id.toString() === idParams);
  const navigate = useNavigate();
  if (film === undefined) {
    return (<PageNotFound />);
  }

  return(
    <div className="player">
      <VideoPlayer
        isPlaying={false}
        video={film}
        isShowButtonControls
        isMuted
        onExit={() => navigate(-1)}
      />
    </div>
  );
}

export default Player;
