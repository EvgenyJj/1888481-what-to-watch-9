import {combineReducers} from '@reduxjs/toolkit';
import {filmsData} from './films-data/films-data';
import {NameSpace} from '../const';
import {userData} from './user-data/user-data';

export const rootReducer = combineReducers({
  [NameSpace.Films]: filmsData.reducer,
  [NameSpace.User]: userData.reducer,
});
