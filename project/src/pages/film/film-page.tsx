import {AuthorizationStatus, MAX_SIMILAR_COUNT} from '../../const';
import {fetchReviewsAction, fetchCurrentFilmAction, fetchSimilarFilmsAction, loadFavouriteCurrentAction} from '../../store/api-actions';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {MouseEvent, useEffect} from 'react';
import {selectAuthorizationStatus} from '../../store/user-data/select';
import {selectReviews, selectCurrentFilms, selectSimilarFilms} from '../../store/films-data/select';
import {useAppDispatch, useAppSelector} from '../../hooks';
import FilmList from '../../components/film-list/film-list';
import FilmTabs from '../../components/film-tabs/film-tabs';
import Footer from '../../components/footer/footer';
import Loading from '../../components/loading/loading';
import Logo from '../../components/logo/logo';
import PageNotFound from '../../components/page-not-found/page-not-found';
import User from '../../components/user/user';

function FilmPage(): JSX.Element {
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const params = useParams();
  const currentFilmId = Number(params.id);
  const currentFilm = useAppSelector(selectCurrentFilms);
  const similarFilms = useAppSelector(selectSimilarFilms);
  const reviewsList = useAppSelector(selectReviews);

  useEffect(() => {
    if (currentFilmId) {
      dispatch(fetchCurrentFilmAction(currentFilmId));
      dispatch(fetchSimilarFilmsAction(currentFilmId));
      dispatch(fetchReviewsAction(currentFilmId));
    }
  }, [currentFilmId, dispatch]);

  if (currentFilm === undefined) {
    return <PageNotFound />;
  }

  if (currentFilm === null || currentFilm.id !== currentFilmId) {
    return <Loading />;
  }

  const isFavorite = currentFilm.isFavorite;

  const handlePlayClick = (evt: MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    navigate(`/player/${currentFilm.id}`);
  };

  const handleAddClick = (evt: MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    dispatch(loadFavouriteCurrentAction({currentFilmId, isFavorite}));
  };

  const filteredSimilarFilms = similarFilms.filter((film) => film.genre === currentFilm.genre && film.id !== currentFilm.id).slice(0, MAX_SIMILAR_COUNT);

  return(
    <>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={currentFilm.backgroundImage} alt={currentFilm.name} />
          </div>
          <h1 className="visually-hidden">WTW</h1>
          <header className="page-header film-card__head">
            <Logo />
            <User />
          </header>
          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{currentFilm.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{currentFilm.genre}</span>
                <span className="film-card__year">{currentFilm.released}</span>
              </p>

              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button" onClick={handlePlayClick}>
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list film-card__button" type="button" onClick={handleAddClick}>
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    {isFavorite && authorizationStatus === AuthorizationStatus.Auth
                      ? <use xlinkHref="#in-list"/>
                      : <use xlinkHref="#add" />}
                  </svg>
                  <span>My list</span>
                </button>
                {authorizationStatus === AuthorizationStatus.Auth &&
                  <Link
                    to={`/films/${currentFilm.id}/review`}
                    className="btn film-card__button"
                  >
                     Add review
                  </Link>}
              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={currentFilm.posterImage} alt={`${currentFilm.name} poster`} width="218" height="327" />
            </div>

            <div className="film-card__desc">
              <FilmTabs film={currentFilm} reviews={reviewsList} />
            </div>
          </div>
        </div>
      </section>
      <div className="page-content">
        <section className="catalog catalog--like-this">
          <div>
            {filteredSimilarFilms.length !== 0 && <h2 className="catalog__title">More like this</h2>}
            <FilmList films={filteredSimilarFilms}/>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
}

export default FilmPage;
