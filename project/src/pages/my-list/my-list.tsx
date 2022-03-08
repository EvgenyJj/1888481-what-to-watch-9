import FilmList from '../../components/film-list/film-list';
import Logo from '../../components/logo/logo';
import User from '../../components/user/user';
import {Film} from '../../types/film';

type MyListProps = {
  favorite: Film[]
}

function MyList({favorite}: MyListProps): JSX.Element {
  return(
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo />

        <h1 className="page-title user-page__title">My list</h1>

        <User />
      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>
        <FilmList
          films={favorite}
        />
      </section>

      <footer className="page-footer">
        <Logo />

        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  );
}

export default MyList;
