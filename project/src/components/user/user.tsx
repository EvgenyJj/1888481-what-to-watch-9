import {AppRoute, AuthorizationStatus, ViewLink} from '../../const';
import {Link} from 'react-router-dom';
import {logoutAction, fetchFavoriteFilmAction} from '../../store/api-actions';
import {useAppSelector, useAppDispatch} from '../../hooks';
import {selectViewLink} from '../../store/action';

function User(): JSX.Element {
  const {authorizationStatus, user} = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const signInProfile = (
    <ul className="user-block">
      <li className="user-block__item">
        <div className="user-block__avatar">
          <Link
            to={AppRoute.MyList}
            onClick={() => {
              dispatch(selectViewLink(ViewLink.List));
              dispatch(fetchFavoriteFilmAction());
            }}
          >
            <img src={user?.avatarUrl} alt="User avatar" width="63" height="63" />
          </Link>
        </div>
      </li>
      <li className="user-block__item">
        <Link
          className="user-block__link"
          to="/"
          onClick={(evt) => {
            evt.preventDefault();
            dispatch(logoutAction());
          }}
        >
            Sign out
        </Link>
      </li>
    </ul>
  );

  const signOutProfile = (
    <div className="user-block">
      <Link to={AppRoute.SignIn} className="user-block__link">Sign in</Link>
    </div>
  );

  return authorizationStatus === AuthorizationStatus.Auth ? signInProfile : signOutProfile;
}

export default User;
