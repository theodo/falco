import { RootState } from 'redux/types';

export const getLastUpdateOfWhatsNew = (store: RootState) => store.content.lastUpdateOfWhatsNew;

export const getLastClickOnWhatsNew = (store: RootState) => store.content.lastClickOnWhatsNew;
