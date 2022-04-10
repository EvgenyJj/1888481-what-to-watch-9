import {AppRoute} from '../../const';
import {FormEvent, useState} from 'react';
import {loginAction} from '../../store/api-actions';
import {toast} from 'react-toastify';
import {useAppDispatch} from '../../hooks';
import {useNavigate} from 'react-router-dom';
import Footer from '../../components/footer/footer';
import Logo from '../../components/logo/logo';
import User from '../../components/user/user';

function SignIn(): JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const submitHandle = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (email.trim() === '' || password.trim() === '') {
      toast.error('Email and password cannot be empty');
      return;
    }

    dispatch(loginAction({email, password}));
    navigate(AppRoute.Main);
  };


  return(
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo />
        <User />
      </header>

      <div className="sign-in user-page__content">
        <form
          action="#"
          className="sign-in__form"
          onSubmit={submitHandle}
        >
          <div className="sign-in__fields">
            <div className="sign-in__field">
              <input
                className="sign-in__input"
                type="email"
                placeholder="Email address"
                name="user-email"
                id="user-email"
                value={email}
                onChange={({target}) => setEmail(target.value)}
                required
              />
              <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
            </div>
            <div className="sign-in__field">
              <input
                className="sign-in__input"
                type="password"
                placeholder="Password"
                name="user-password"
                id="user-password"
                value={password}
                onChange={({target}) => setPassword(target.value)}
                required
              />
              <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
            </div>
          </div>
          <div className="sign-in__submit">
            <button className="sign-in__btn" type="submit">Sign in</button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
}

export default SignIn;
