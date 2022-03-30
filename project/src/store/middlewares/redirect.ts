import {Middleware} from 'redux';
import {reducer} from '../reducer';
import browserHistory from '../../services/browser-history';

type Reducer = ReturnType<typeof reducer>;

export const redirect: Middleware<unknown, Reducer>=
  (_store) =>
    (next) =>
      (action) => {
        if (action.type === 'game/redirectToRoute') {
          browserHistory.push(action.payload);
        }

        return next(action);
      };
