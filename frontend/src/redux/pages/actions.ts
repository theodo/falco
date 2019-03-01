import { createStandardAction } from 'typesafe-actions';

import { PageType } from './types';

export const fetchPagesSuccess = createStandardAction('pages/FETCH_PAGES_SUCCESS')<{
  byId: Record<string, PageType>;
}>();

export default {
  fetchPagesSuccess,
};
