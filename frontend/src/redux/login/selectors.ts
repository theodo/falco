import { RootState } from 'redux/types';

export const getIsAuthenticated = (store: RootState) => store.login.isAuthenticated;
export const getIsSubmitting = (store: RootState) => store.login.isSubmitting;
export const getLoginError = (store: RootState) => store.login.loginError;
