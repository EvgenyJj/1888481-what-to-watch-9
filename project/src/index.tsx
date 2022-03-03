import App from './components/app/app';
import React from 'react';
import ReactDOM from 'react-dom';
import {films} from './mocks/films';

ReactDOM.render(
  <React.StrictMode>
    <App
      films={films}
    />
  </React.StrictMode>,
  document.getElementById('root'));
