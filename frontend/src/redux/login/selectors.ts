import { RootState } from 'redux/types';

export const getUserToken = (store: RootState) => store.login.token;
export const getLoginError = (store: RootState) => store.login.loginError;
