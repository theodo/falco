import { ApiScriptType, ScriptType } from "./types";


export const modelizeScript = (apiScript: ApiScriptType): ScriptType => ({
    uuid: apiScript.uuid,
    name: apiScript.name,
    script: apiScript.script,
});

export const modelizeApiScriptsToById = (scripts: ApiScriptType[]): Record<string, ScriptType> => {
    return scripts.reduce((scriptsById, script) => {
        return {
            ...scriptsById,
            [script.uuid]: modelizeScript(script),
        };
    }, {});
};
