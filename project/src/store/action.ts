import {createAction} from '@reduxjs/toolkit';
import {Film} from '../types/film';

export const loadFilms = createAction<Film[]>('films/load');

export const changeGenre = createAction<string>('films/changeGenre');

export const filterFilms = createAction('films/filter');
