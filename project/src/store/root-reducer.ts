import {appSettings} from './app-settings/app-settings';
import {combineReducers} from '@reduxjs/toolkit';
import {filmsData} from './films-data/films-data';
import {NameSpace} from '../const';
import {userData} from './user-data/user-data';

export const rootReducer = combineReducers({
  [NameSpace.App]: appSettings.reducer,
  [NameSpace.Films]: filmsData.reducer,
  [NameSpace.User]: userData.reducer,
});
