import 'react-toastify/dist/ReactToastify.css';
import {fetchFilmAction, checkAuthAction, fetchPromoFilmAction} from './store/api-actions';
import {Provider} from 'react-redux';
import {store} from './store';
import {ToastContainer} from 'react-toastify';
import App from './components/app/app';
import browserHistory from './services/browser-history';
import HistoryRouter from './components/history-route/history-route';
import React from 'react';
import ReactDOM from 'react-dom';

store.dispatch(fetchFilmAction());
store.dispatch(checkAuthAction());
store.dispatch(fetchPromoFilmAction());

ReactDOM.render(
  <React.StrictMode>
    <HistoryRouter history={browserHistory}>
      <Provider store={store}>
        <ToastContainer />
        <App />
      </Provider>
    </HistoryRouter>
  </React.StrictMode>,
  document.getElementById('root'));
