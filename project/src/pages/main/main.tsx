import FilmPromo from '../../components/film-promo/film-promo';
import Catalog from '../../components/catalog/catalog';
import Footer from '../../components/footer/footer';

function MainPage(): JSX.Element {

  return (
    <>
      <FilmPromo />
      <div className="page-content">
        <Catalog />
        <Footer />
      </div>
    </>
  );
}

export default MainPage;
