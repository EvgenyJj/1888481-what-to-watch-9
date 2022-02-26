import {Fragment} from 'react';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';

function PageNotFound(): JSX.Element {
  return (
    <Fragment>
      <h1>
        404.
        <br />
        <small>Page not found</small>
      </h1>
      <Link to={AppRoute.Main}>Go to main page</Link>
    </Fragment>
  );
}

export default PageNotFound;
