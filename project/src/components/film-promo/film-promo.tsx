import {MouseEvent} from 'react';
import {selectPromoFilms} from '../../store/films-data/select';
import {loadFavouritePromoAction} from '../../store/api-actions';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {useNavigate} from 'react-router-dom';
import Loading from '../loading/loading';
import Logo from '../logo/logo';
import User from '../user/user';
import {AuthorizationStatus} from '../../const';
import {selectAuthorizationStatus} from '../../store/user-data/select';

function FilmPromo(): JSX.Element {
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);
  const promoFilm = useAppSelector(selectPromoFilms);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  if (promoFilm === null) {
    return <Loading />;
  }

  const promoId = promoFilm.id;
  const isFavorite = promoFilm.isFavorite;

  const handlePlayClick = (evt: MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    navigate(`/player/${promoFilm.id}`);
  };

  const handleAddClick= (evt: MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    dispatch(loadFavouritePromoAction({promoId, isFavorite}));
  };


  return (
    <section className="film-card">
      <div className="film-card__bg">
        <img src={promoFilm.backgroundImage} alt={promoFilm.name} />
      </div>

      <h1 className="visually-hidden">WTW</h1>
      <header className="page-header film-card__head">
        <Logo />
        <User />
      </header>
      <div className="film-card__wrap">
        <div className="film-card__info">
          <div className="film-card__poster">
            <img src={promoFilm.posterImage} alt={`${promoFilm.name} poster`} width="218" height="327" />
          </div>

          <div className="film-card__desc">
            <h2 className="film-card__title">{promoFilm.name}</h2>
            <p className="film-card__meta">
              <span className="film-card__genre">{promoFilm.genre}</span>
              <span className="film-card__year">{promoFilm.released}</span>
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FilmPromo;
