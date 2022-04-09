import {AppRoute, AuthorizationStatus, MAX_SIMILAR_COUNT} from '../../const';
import {fetchSimilarFilmsAction, fetchReviewsAction, fetchCurrentFilmAction} from '../../store/api-actions';
import {useAppSelector} from '../../hooks';
import {useDispatch} from 'react-redux';
import {useEffect} from 'react';
import {useParams, useNavigate, Link} from 'react-router-dom';
import FilmList from '../../components/film-list/film-list';
import FilmTabs from '../../components/film-tabs/film-tabs';
import Loading from '../../components/loading/loading';
import Logo from '../../components/logo/logo';
import PageNotFound from '../../components/page-not-found/page-not-found';
import User from '../../components/user/user';

function FilmPage(): JSX.Element {
  const {currentFilm, similarFilms, reviews} = useAppSelector(({FILMS}) => FILMS);
  const {authorizationStatus} = useAppSelector(({USER}) => USER);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const currentFilmId = Number(params.id);

  useEffect(() => {
    if (currentFilm === null || currentFilm?.id !== currentFilmId) {
      dispatch(fetchCurrentFilmAction(currentFilmId));
      dispatch(fetchSimilarFilmsAction(currentFilmId));
      dispatch(fetchReviewsAction(currentFilmId));
    }
  }, [currentFilm, currentFilmId, dispatch]);

  if (currentFilm === undefined) {
    return <PageNotFound />;
  }

  if (currentFilm === null || currentFilm.id !== currentFilmId) {
    return <Loading />;
  }

  const similarFilmsList = similarFilms.filter((film) => film.genre === currentFilm.genre && film.id !== currentFilm.id).slice(0, MAX_SIMILAR_COUNT);
  const onClickPlay = () => navigate(`/player/${currentFilm.id}`);
  const onClickAdd = () => navigate(AppRoute.MyList);

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
                <button className="btn btn--play film-card__button" type="button" onClick={onClickPlay}>
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list film-card__button" type="button" onClick={onClickAdd}>
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
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
              <FilmTabs film={currentFilm} reviews={reviews} />
            </div>
          </div>
        </div>
      </section>
      <div className="page-content">
        <section className="catalog catalog--like-this">
          <div>
            {similarFilmsList.length !== 0 && <h2 className="catalog__title">More like this</h2>}
            <FilmList films={similarFilmsList}/>
          </div>
        </section>

        <footer className="page-footer">
          <Logo />

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </>
  );
}

export default FilmPage;
