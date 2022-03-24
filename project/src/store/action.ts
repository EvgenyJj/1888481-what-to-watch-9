import {createAction} from '@reduxjs/toolkit';

export const changeGenre = createAction<string>('films/changeGenre');

export const filterFilms = createAction('films/filter');
