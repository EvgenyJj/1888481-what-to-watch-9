import {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {fetchCurrentFilmAction} from '../../store/api-actions';
import {selectCurrentFilms} from '../../store/films-data/select';
import PageNotFound from '../../components/page-not-found/page-not-found';
import Loading from '../../components/loading/loading';
import VideoPlayer from '../../components/video-player/video-player';

function Player(): JSX.Element {
  const dispatch = useAppDispatch();
  const params = useParams();

  const currentFilm = useAppSelector(selectCurrentFilms);
  const currentFilmId = Number(params.id);

  useEffect(() => {
    if(currentFilmId) {
      dispatch(fetchCurrentFilmAction(currentFilmId));
    }
  }, [currentFilmId, dispatch]);

  if (currentFilm === undefined) {
    return (<PageNotFound />);
  }

  if (currentFilm === null || currentFilm.id !== currentFilmId) {
    return <Loading />;
  }

  const {videoLink, name} = currentFilm;

  return(
    <VideoPlayer name={name} src={videoLink} />
  );
}

export default Player;
