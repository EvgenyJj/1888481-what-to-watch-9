import {AuthorizationStatus, NameSpace} from '../../const';
import {createSlice} from '@reduxjs/toolkit';
import {UserData} from '../../types/state';

const initialState: UserData = {
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
};

export const userData = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {
    requireAuthStatus: (state, action) => {
      state.authorizationStatus = action.payload;
    },
    loadUserInfo: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const {requireAuthStatus, loadUserInfo} = userData.actions;
