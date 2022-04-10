import {fetchCurrentFilmAction} from '../../store/api-actions';
import {Link, useParams} from 'react-router-dom';
import {selectCurrentFilms} from '../../store/films-data/select';
import {useAppSelector, useAppDispatch} from '../../hooks';
import {useEffect} from 'react';
import Loading from '../../components/loading/loading';
import Logo from '../../components/logo/logo';
import PageNotFound from '../../components/page-not-found/page-not-found';
import ReviewForm from '../../components/review-form/review-form';
import User from '../../components/user/user';

function AddReview(): JSX.Element {
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
    return <PageNotFound />;
  }

  if (currentFilm === null || currentFilm.id !== currentFilmId) {
    return <Loading />;
  }

  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={currentFilm.backgroundImage} alt={currentFilm.name} />
        </div>
        <h1 className="visually-hidden">WTW</h1>
        <header className="page-header">
          <Logo />
          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={`/films/${currentFilm.id}`} className="breadcrumbs__link">{currentFilm.name}</Link>
              </li>
              <li className="breadcrumbs__item">
                <Link className="breadcrumbs__link" to="/">Add review</Link>
              </li>
            </ul>
          </nav>
          <User />
        </header>
        <div className="film-card__poster film-card__poster--small">
          <img src={currentFilm.posterImage} alt={currentFilm.name} width="218" height="327" />
        </div>
      </div>
      <div className="add-review">
        <ReviewForm />
      </div>
    </section>
  );
}

export default AddReview;
