import {AppSettings} from '../../types/state';
import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';

const initialState: AppSettings = {
  isLoading: false,
};

export const appSettings = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {
    changeLoadingStatus: (state, action) => {
      state.isLoading= action.payload;
    },
  },
});

export const {changeLoadingStatus} = appSettings.actions;
