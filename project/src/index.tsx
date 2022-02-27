import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';

const Setting = {
  genre: 'Drama',
  releaseDate: 2014,
  title: 'The Grand Budapest Hotel',
};

ReactDOM.render(
  <React.StrictMode>
    <App
      movieSettings = {Setting}
    />
  </React.StrictMode>,
  document.getElementById('root'));
