import { RootState } from 'redux/types';

export const getLastUpdateOfWhatsNew = (store: RootState) => store.content.lastUpdateOfWhatsNew;
