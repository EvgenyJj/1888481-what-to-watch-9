import {useAppSelector} from '../../hooks';
import FilmPromo from '../../components/film-promo/film-promo';
import Loading from '../../components/loading/loading';
import Logo from '../../components/logo/logo';
import User from '../../components/user/user';
import Catalog from '../../components/catalog/catalog';

function MainPage(): JSX.Element {

  const {films} = useAppSelector(({FILMS}) => FILMS);
  const {isLoading} = useAppSelector(({APP}) => APP);

  if (isLoading) {
    return (
      <Loading />
    );
  }

  return (
    <>
      <FilmPromo film={films[5]}>
        <header className="page-header film-card__head">
          <Logo />
          <User />
        </header>
      </FilmPromo>

      <div className="page-content">
        <Catalog />

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

export default MainPage;
