import Logo from '../../components/logo/logo';
import PageNotFound from '../../components/page-not-found/page-not-found';
import ReviewForm from '../../components/review-form/review-form';
import User from '../../components/user/user';
import {Link} from 'react-router-dom';
import {films} from '../../mocks/films';
import {useParams} from 'react-router-dom';

function AddReview(): JSX.Element {
  const {id: idParams} = useParams();
  const film = films.find(({id}) => id.toString() === idParams);
  if (film === undefined) {
    return <PageNotFound />;
  }

  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={film.backgroundImage} alt={film.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">
          <Logo />

          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={`/films/${film.id}`} className="breadcrumbs__link">{film.name}</Link>
              </li>
              <li className="breadcrumbs__item">
                <Link className="breadcrumbs__link" to="/">Add review</Link>
              </li>
            </ul>
          </nav>
          <User />
        </header>

        <div className="film-card__poster film-card__poster--small">
          <img src={film.posterImage} alt={film.name} width="218" height="327" />
        </div>
      </div>

      <div className="add-review">
        <ReviewForm />
      </div>

    </section>
  );
}

export default AddReview;
