import { RootState } from 'redux/types';

export const getIsSubmitting = (store: RootState) => store.signUp.isSubmitting;
export const getSignUpError = (store: RootState) => store.signUp.signUpError;
