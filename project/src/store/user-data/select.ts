import {State} from '../../types/state';

export const selectAuthorizationStatus = (state: State) => state.USER.authorizationStatus;
export const selectUserData = (state: State) => state.USER.user;
