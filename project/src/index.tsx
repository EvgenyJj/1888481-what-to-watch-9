import 'react-toastify/dist/ReactToastify.css';
import {fetchFilmAction, checkAuthAction} from './store/api-actions';
import {Provider} from 'react-redux';
import {store} from './store';
import {ToastContainer} from 'react-toastify';
import App from './components/app/app';
import React from 'react';
import ReactDOM from 'react-dom';

store.dispatch(fetchFilmAction());
store.dispatch(checkAuthAction());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
