import { ScriptType } from "./types";

export const modelizeScriptsToById = (scripts: ScriptType[]): Record<string, ScriptType> => {
    return scripts.reduce((scriptsById, script) => {
        return {
            ...scriptsById,
            [script.uuid]: {
                uuid: script.uuid,
                name: script.name,
            },
        };
    }, {});
};
