import { PageType } from './types';

export const modelizePages = (pages: PageType[]) => {
  return pages.reduce((pagesById, page) => {
    return {
      ...pagesById,
      [page.uuid]: {
        uuid: page.uuid,
        name: page.name,
        url: page.url,
      },
    };
  }, {});
};
