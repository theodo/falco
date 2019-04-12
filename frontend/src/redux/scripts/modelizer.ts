import { ScriptType } from './types';

export const modelizeScripts = (scripts: ScriptType[]) => {
  return scripts.reduce((scriptsById, page) => {
    return {
      ...scriptsById,
      [page.uuid]: {
        uuid: page.uuid,
        name: page.name,
      },
    };
  }, {});
};
