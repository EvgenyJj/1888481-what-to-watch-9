import {AppRoute, AuthorizationStatus} from '../../const';
import {Link, useNavigate} from 'react-router-dom';
import {logoutAction} from '../../store/api-actions';
import {MouseEvent} from 'react';
import {redirectToRoute} from '../../store/action';
import {useAppSelector, useAppDispatch} from '../../hooks';

function User(): JSX.Element {
  const {authorizationStatus, user} = useAppSelector(({USER}) => USER);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const clickLogOutHandle = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    dispatch(logoutAction());
    dispatch(redirectToRoute(AppRoute.Main));
  };

  const signInProfile = (
    <ul className="user-block">
      <li className="user-block__item">
        <div className="user-block__avatar" role="button" onClick={() => navigate(AppRoute.MyList)}>
          <img src={user?.avatarUrl} alt="User avatar" width="63" height="63" />
        </div>
      </li>
      <li className="user-block__item">
        <Link
          className="user-block__link"
          to="/"
          onClick={clickLogOutHandle}
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
