import App from './components/app/app';
import React from 'react';
import ReactDOM from 'react-dom';
import fetchFilmAction from './store/api-actions';
import {Provider} from 'react-redux';
import {store} from './store';

store.dispatch(fetchFilmAction);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
